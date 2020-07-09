import { createSelector } from '@reduxjs/toolkit';
import { tasksForSearch } from 'store/slices/searchSlice';

export const numberOfTasksByStatus = state => status => (
  state.tasks.filter(task => task.status === status).length
);

export const tasksByStatus = state => status => (
  state
    .filter(task => task.status === status)
    .sort((a, b) => new Date(Number(b.updatedAt)) - new Date(Number(a.updatedAt)))
);

export const filteredTasks = createSelector(
  tasksForSearch,
  tasksByStatus,
);
