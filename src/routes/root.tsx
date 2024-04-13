import { Form, Outlet, useNavigation, redirect, NavLink } from "react-router-dom";
import { useState } from "react";
import store, { useTypedSelector, useTypedDispatch } from "../store";
import { addTask, updateTask } from "../redux/slices/tasksSlice";

export async function action(): Promise<Response> {
	const task = {
		id: crypto.randomUUID(),
		name: '',
		description: '',
		status: false
	};

	store.dispatch(addTask(task));

	return redirect(`/tasks/${task.id}/edit`);
}

const Root = () => {
	const navigation = useNavigation();
	const [filtered, setFiltered] = useState('all');
	const tasks = useTypedSelector((state) => state.tasksReducer);
	const dispatch = useTypedDispatch();


	const handleStatusChange = (taskId: string, status: boolean) => {
		dispatch(updateTask({
			id: taskId,
			status: status
		}))
	}

	return (
		<>
			<div id="sidebar">
				<h1>React Router Tasks</h1>
				<div>
					<Form id="search-form" role="search">
						<div className="filter-buttons">
							<button onClick={() => setFiltered('all')}> All tasks</button>
							<button onClick={() => setFiltered('done')}> Done tasks</button>
							<button onClick={() => setFiltered('undone')}> Undone tasks</button>
						</div>

						<div
							className="sr-only"
							aria-live="polite"
						></div>
					</Form>
					<Form method="post">
						<button type="submit">Add Task</button>
					</Form>
				</div>
				<nav>
					{tasks.length ? (
						<ul>
							{tasks
								.filter(task => {
									switch (filtered) {
										case "all":
											return task;
										case "done":
											return task.status;
										case "undone":
											return !task.status;
										default:
											return;
									}
								})
								.map(task => (
									<li key={task.id}>
										<NavLink
											to={`tasks/${task.id}`}
											className={({ isActive, isPending }) =>
												isActive
													? "active"
													: isPending
														? "pending"
														: ""
											}
										>
											{task.name ? (
												<>
													{task.name}
												</>
											) : (
												<i>No Name</i>
											)}
										</NavLink>

										<div className="button-container">
											<Form action={`tasks/${task.id}/edit`}>
												<button type="submit">Edit</button>
											</Form>
											<Form
												method="post"
												action={`tasks/${task.id}/destroy`}
												onSubmit={(event) => {
													if (
														!window.confirm(
															"Please confirm you want to delete this record."
														)
													) {
														event.preventDefault();
													}
												}}
											>
												<button type="submit">Delete</button>
											</Form>

											<input type="checkbox" checked={task.status} onChange={e => handleStatusChange(task.id, e.target.checked)} />
										</div>
									</li>
								))}
						</ul>
					) : (
						<p>
							<i>No contacts</i>
						</p>
					)}
				</nav>
			</div>
			<div id="detail"
				className={
					navigation.state === "loading" ? "loading" : ""
				}
			>
				<Outlet />
			</div>
		</>
	);
}

export default Root;
