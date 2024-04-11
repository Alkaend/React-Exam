import { createSlice } from "@reduxjs/toolkit";
import { action } from "src/routes/root";
type Task = {
    name: string,
    id: string,
    description: string,
    status: boolean
}
const INITIAL_STATE: Task[] = [];

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: INITIAL_STATE,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload);
            localStorage.setItem('tasks', JSON.stringify(state));
        },
        updateTask: (state, action) => {
            const taskIndex = state.findIndex(task => task.id === action.payload.id);
            state[taskIndex] = { ...state[taskIndex], ...action.payload }
        },
        deleteTask: (state, action) => {
            const updatedTasks = state.filter(task => task.id !== action.payload);
            return updatedTasks;
        }
    }
});

export const {
    addTask,
    updateTask,
    deleteTask
} = tasksSlice.actions;

export default tasksSlice.reducer;
