import { Form, useLoaderData, redirect, useNavigate, ActionFunctionArgs } from "react-router-dom";
import ContactType from "src/types/Contact";

import { updateContact } from "../contacts";

export async function action({ request, params }: ActionFunctionArgs) {
	const formData = await request.formData();

	/* const firstName = formData.get("first");
	const lastName = formData.get("last"); */

	const updates = Object.fromEntries(formData);
	updates.first;
	updates.last;

	await updateContact(params.contactId, updates);

	return redirect(`/contacts/${params.contactId}`);
}

const EditContact = () => {
	const { contact } = useLoaderData() as { contact: ContactType };
	const navigate = useNavigate();

	return (
		<Form method="post" id="contact-form">
			<p>
				<span>Name</span>
				<input
					placeholder=""
					aria-label="First name"
					type="text"
					name="first"
					defaultValue={contact.first}
				/>
			</p>
			<label>
				<span>Description</span>
				<textarea
					name="description"
					defaultValue={contact.notes}
					rows={6}
				/>
			</label>
			<p>
				<button type="submit">Save</button>
				<button type="button"
					onClick={() => {
						navigate(-1);
					}}
				>
					Cancel
				</button>
			</p>
		</Form>
	);
}

export default EditContact;