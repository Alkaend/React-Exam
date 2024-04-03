import { createSlice } from "@reduxjs/toolkit";
type Task = {
    name: string
}
const INITIAL_STATE: Task[] = []

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: INITIAL_STATE,
    reducers: {
        addTask:(state) => {
            state.push({name: 'fdsg'})
        }
    }
})

export default tasksSlice.reducer;
