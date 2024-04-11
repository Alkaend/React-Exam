import { Form, Link, Outlet, useNavigation, useLoaderData, useSubmit, redirect, NavLink } from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import ContactType from "src/types/Contact";
import { useEffect, useState } from "react";
//@ts-ignore
import store, { useTypedSelector } from "/src/store";
import { addTask } from "/src/redux/slices/tasksSlice";

type loaderProps = {
	request: {
		url: string
	}
}

export async function action(): Promise<Response> {

	const task = {
		id:crypto.randomUUID(),
		name:'',
		description:'',
		status:false
	} ;

	store.dispatch(addTask(task));

	return redirect(`/tasks/${task.id}/edit`);
}

export async function loader({ request }: loaderProps): Promise<{ contacts: ContactType[], q: string }> {
	const url = new URL(request.url);
	const q = url.searchParams.get("q") || "";
	const contacts = await getContacts(q);
	return { contacts, q };
}

const Root = () => {
	const {  q } = useLoaderData() as { contacts: ContactType[], q: string };
	const navigation = useNavigation();
	const [query, setQuery] = useState(q);
	const submit = useSubmit();
	const tasks = useTypedSelector(state => state.tasksReducer);
	console.log(tasks);

	const searching =
		navigation.location &&
		new URLSearchParams(navigation.location.search).has(
			"q"
		);

	useEffect(() => {
		setQuery(q);
	}, [q]);

	return (
		<>
			<div id="sidebar">
				<h1>React Router Tasks</h1>
				<div>
					<Form id="search-form" role="search">
						<div className="filter-buttons">
							<button > All tasks</button>
							<button> Done tasks</button>
							<button> Undone tasks</button>
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
							{tasks.map((task) => (
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
										<Link to={`tasks/${task.id}`}>
											{task.name  ? (
												<>
													{task.name}
												</>
											) : (
												<i>No Name</i>
											)}
											{" "}
											{/* {task.favorite && <span>★</span>} */}
										</Link>
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

										<Form>

											<input type="checkbox" />

										</Form>





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