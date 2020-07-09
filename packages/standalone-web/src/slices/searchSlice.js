import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    search: (state, { payload }) => {
      state = payload;
      return state;
    },
  },
});

export const { search } = searchSlice.actions;

export const tasksForSearch = state => {
  if (!state.search) {
    return state.tasks;
  }
  const filteredTasks = state.tasks.filter(task => (
    task.text.toLowerCase().includes(state.search.toLowerCase())
  ));
  return filteredTasks;
};

export default searchSlice.reducer;
