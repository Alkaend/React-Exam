import { Form, useFetcher, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import {  updateContact } from "../contacts";
import ContactType from "src/types/Contact";
import Nullable from "src/types/Nullable";
import { useTypedSelector } from "/src/store";

export async function loader({ params }: LoaderFunctionArgs): Promise<string|undefined> {
	return params.taskId
}

export async function action({ request, params }: LoaderFunctionArgs) {
	let formData = await request.formData();
	return updateContact(params.contactId, {
		favorite: formData.get("favorite") === "true",
	});
}

const Contact = () => {
	const taskId = useLoaderData() as string;
	const tasks = useTypedSelector(state => state.tasksReducer);
	const task = tasks.find(task => task.id === taskId);

	return (
		<div id="contact">
			

			<div>
				<h1>
					{task?.name  ? (
						<>
							{task?.name} 
						</>
					) : (
						<i>No Name</i>
					)}
					{" "}
					{/* <Favorite contact={contact} /> */}
				</h1>

				{task?.description && (
					<p>
						{task?.description}
					</p>
				)}

				{ <p>{task?.status}</p>}

				

			</div>
		</div>
	);
}



export default Contact;

type FavoriteProps = {
	contact: Nullable<ContactType>
}

const Favorite = ({ contact }: FavoriteProps) => {
	// yes, this is a `let` for later
	const fetcher = useFetcher();
	let favorite = contact?.favorite;
	if (fetcher.formData) {
		favorite = fetcher.formData.get("favorite") === "true";
	}

	return (
		<fetcher.Form method="post">
			<button
				name="favorite"
				value={favorite ? "false" : "true"}
				aria-label={
					favorite
						? "Remove from favorites"
						: "Add to favorites"
				}
			>
				{favorite ? "★" : "☆"}
			</button>
		</fetcher.Form>
	);
}