import { createSlice, createSelector } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { tasksForSearch } from './searchSlice';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    create: (state, { payload }) => {
      const { status, text } = payload;
      const id = uuid();
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.push({
        id,
        status,
        text,
      });
    },
    remove: (state, { payload }) => state.filter(el => el.id !== payload),
    update: (state, { payload }) => {
      const { id, text, status } = payload;
      const task = state.find(el => el.id === id);
      if (task) {
        task.text = text || task.text;
        task.status = status;
      }
    },
  },
});

export const { create, remove, update } = tasksSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const numberOfTasksByStatus = state => status => (
  state.tasks.filter(task => task.status === status).length
);

export const tasksByStatus = state => status => state.filter(task => task.status === status);

export const filteredTasks = createSelector(
  tasksForSearch,
  tasksByStatus,
);

export default tasksSlice.reducer;
