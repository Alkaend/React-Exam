import { createSlice } from "@reduxjs/toolkit";
type Task = {
    name: string,
    id: string,
    description: string,
    status: boolean
}

const INITIAL_STATE: Task[] = JSON.parse(localStorage.getItem('tasks') ?? '[]');

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

            /*
            Либо
            
            action.payload = {
                id: 'asdsad-opop-wqewe-wew,
                name: 'asdasdas',
                description: 'iuoiyoyio'
            }

            Либо

            action.payload = {
                id: 'asdsad-opop-wqewe-wew,
                status: false
            }
            */

            state[taskIndex] = { ...state[taskIndex], ...action.payload };

            localStorage.setItem('tasks', JSON.stringify(state));
        },
        deleteTask: (state, action) => {
            const taskIndex = state.findIndex(task => task.id === action.payload);

            state.splice(taskIndex, 1);

            localStorage.setItem('tasks', JSON.stringify(state));
        }
    }
});

export const {
    addTask,
    updateTask,
    deleteTask
} = tasksSlice.actions;

export default tasksSlice.reducer;
