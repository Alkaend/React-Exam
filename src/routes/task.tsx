import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { useTypedSelector } from "../store";

export async function loader({ params }: LoaderFunctionArgs): Promise<string | undefined> {
	return params.taskId
}

const Task = () => {
	const taskId = useLoaderData() as string;
	const tasks = useTypedSelector(state => state.tasksReducer);
	const task = tasks.find(task => task.id === taskId);

	return (
		<div id="contact">
			<div>
				<h1>
					{task?.name ? (
						<>
							{task?.name}
						</>
					) : (
						<i>No Name</i>
					)}
				</h1>

				{task?.description && (
					<p>
						{task.description}
					</p>
				)}

				{<p>Status: {task?.status ? '' : 'Not'} Completed</p>}
			</div>
		</div>
	);
}



export default Task;

