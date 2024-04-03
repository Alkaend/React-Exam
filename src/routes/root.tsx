import { Form, Link, Outlet, useNavigation, useLoaderData, useSubmit, redirect, NavLink } from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import ContactType from "src/types/Contact";
import { useEffect, useState } from "react";
//@ts-ignore
import { useTypedSelector } from "/src/store";

type loaderProps = {
    request: {
        url: string
    }
}

export async function action(): Promise<Response> {

	const contact = await createContact();

	return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({ request  }:loaderProps): Promise<{ contacts: ContactType[], q: string }> {
	const url = new URL(request.url);
	const q = url.searchParams.get("q") || "";
	const contacts = await getContacts(q);
	return { contacts, q };
}

const Root = () => {
	const { contacts, q } = useLoaderData() as { contacts: ContactType[], q: string };
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
				<h1>React Router Contacts</h1>
				<div>
					<Form id="search-form" role="search">
						<input
							id="q"
							className={searching ? "loading" : ""}
							aria-label="Search contacts"
							placeholder="Search"
							type="search"
							name="q"
							defaultValue={q}
							onChange={(event) => {
								const isFirstSearch = q == null;
								submit(event.currentTarget.form, {
									replace: !isFirstSearch,
								});
							}}
						/>
						<div
							id="search-spinner"
							aria-hidden
							hidden={!searching}
						/>
						<div
							className="sr-only"
							aria-live="polite"
						></div>
					</Form>
					<Form method="post">
						<button type="submit">New</button>
					</Form>
				</div>
				<nav>
					{contacts.length ? (
						<ul>
							{contacts.map((contact) => (
								<li key={contact.id}>
									<NavLink
										to={`contacts/${contact.id}`}
										className={({ isActive, isPending }) =>
											isActive
												? "active"
												: isPending
													? "pending"
													: ""
										}
									>
										<Link to={`contacts/${contact.id}`}>
											{contact.first || contact.last ? (
												<>
													{contact.first} {contact.last}
												</>
											) : (
												<i>No Name</i>
											)}
											{" "}
											{contact.favorite && <span>★</span>}
										</Link>
									</NavLink>
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