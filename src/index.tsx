import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import './index.css';
import Root, {
	loader as rootLoader,
	action as rootAction
} from './routes/root';
import ErrorPage from './error-page';
import Contact, {
	loader as contactLoader,
	action as contactAction
} from './routes/task';
import EditContact, {
	action as editAction
} from './routes/edit';
import { action as destroyAction } from './routes/destroy';
import Index from "./routes/index";
import { Provider } from 'react-redux';
import store from './store';

const rootContainer = document.querySelector('#root');

if (rootContainer === null) throw new Error('Can\'t find root container');

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		loader: rootLoader,
		action: rootAction,
		errorElement: <ErrorPage />,
		children: [

			{
				errorElement: <ErrorPage />,
				children: [
					{ index: true, element: <Index /> },
					{
						path: "tasks/:taskId",
						element: <Contact />,
						loader: contactLoader,
						action: contactAction,
					},

				],
			},

			{
				path: "tasks/:taskId",
				element: <Contact />,
				loader: contactLoader,
				action: contactAction,
			},
			{
				index: true,
				element: <Index />,
				loader: contactLoader
			},
			{
				path: "/tasks/:taskId/edit",
				element: <EditContact />,
				loader: contactLoader,
				action: editAction
			},
			{
				path: "tasks/:taskId/destroy",
				action: destroyAction,
				errorElement: <div>Oops! There was an error.</div>,
			},
		],
	},
]);

const root = createRoot(rootContainer);

root.render(
	<StrictMode>
		<Provider store = {store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
)