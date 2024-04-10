import { createSlice } from "@reduxjs/toolkit";
type Task = {
    name: string,
    id: string,
    description:string,
    status:boolean
}
const INITIAL_STATE: Task[] = [];

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: INITIAL_STATE,
    reducers: {
        addTask:(state, action) => {
            state.push(action.payload);
        },
        updateTask:(state,action) => {
           const taskIndex = state.findIndex(task => task.id === action.payload.id);
           state[taskIndex] = {...state[taskIndex], ...action.payload}
        }
    }
})

export const {
    addTask,
    updateTask
} = tasksSlice.actions

export default tasksSlice.reducer;
