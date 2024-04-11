import { ActionFunctionArgs, redirect } from "react-router-dom";
import store from "/src/store";
import { deleteTask } from "/src/redux/slices/tasksSlice";

export async function action({ params }: ActionFunctionArgs) {
  store.dispatch(deleteTask(params.taskId));
  return redirect("/");
}

