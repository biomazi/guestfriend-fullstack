import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from 'slices/tasksSlice';
import searchSlice from 'slices/searchSlice';
import { loadState, saveState } from 'utils/storage';

const persistedState = loadState();

const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    search: searchSlice,
  },
  preloadedState: persistedState,
});

// persist store on change of state
store.subscribe(() => saveState({ tasks: store.getState().tasks }));

export default store;
