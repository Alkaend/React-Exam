import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { updateContact } from "../contacts";
import { useTypedSelector } from "/src/store";

export async function loader({ params }: LoaderFunctionArgs): Promise<string | undefined> {
	return params.taskId
}

export async function action({ request, params }: LoaderFunctionArgs) {
	let formData = await request.formData();
	return updateContact(params.contactId, {
		favorite: formData.get("favorite") === "true",
	});
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

