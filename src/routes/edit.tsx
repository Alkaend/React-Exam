import { Form, useLoaderData, redirect, useNavigate, ActionFunctionArgs } from "react-router-dom";
import store, { useTypedSelector } from "../store";
import { updateTask } from "../redux/slices/tasksSlice";

export async function action({ request, params }: ActionFunctionArgs) {
	const formData = await request.formData();


	const updates = Object.fromEntries(formData);


	store.dispatch(updateTask({
		id: params.taskId,
		/*
		updates: {
			name: 'dfghjk',
			description: 'fdghjk'
		}
		*/
		...updates
	}));

	return redirect(`/tasks/${params.taskId}`);
}

const EditContact = () => {
	const taskId = useLoaderData() as string;
	const tasks = useTypedSelector(state => state.tasksReducer);
	const task = tasks.find(task => task.id === taskId);
	const navigate = useNavigate();

	return (
		<Form method="post" id="contact-form">
			<p>
				<span>Name</span>
				<input
					placeholder=""
					aria-label="First name"
					type="text"
					name="name"
					defaultValue={task?.name}
				/>
			</p>
			<label>
				<span>Description</span>
				<textarea
					name="description"
					defaultValue={task?.description}
					rows={6}
				/>
			</label>
			<p>
				<button type="submit">Save</button>
				<button type="button"
					onClick={() => {
						navigate('/');
					}}
				>
					Cancel
				</button>
			</p>
		</Form>
	);
}

export default EditContact;