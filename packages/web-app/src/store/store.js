import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from 'store/slices/tasksSlice';
import searchSlice from 'store/slices/searchSlice';
import { loadState, saveState } from 'utils/storage';

const persistedState = loadState();

const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    search: searchSlice,
  },
  // disable preloadedState to see how server saves data
  preloadedState: persistedState,
});

// persist store on change of state
store.subscribe(() => saveState({ tasks: store.getState().tasks }));

export default store;
