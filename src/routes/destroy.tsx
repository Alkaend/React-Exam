import { ActionFunctionArgs, redirect } from "react-router-dom";
import store from "../store";
import { deleteTask } from "../redux/slices/tasksSlice";

export async function action({ params }: ActionFunctionArgs) {
  store.dispatch(deleteTask(params.taskId));

  return redirect("/");
}

