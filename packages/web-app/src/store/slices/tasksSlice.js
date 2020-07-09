import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loader } from 'graphql.macro';
import client from '../../apollo';

const tasksGQL = loader('graphql/tasks.gql');
const addTaskGQL = loader('graphql/addTask.gql');
const removeTaskGQL = loader('graphql/removeTask.gql');
const updateTaskGQL = loader('graphql/updateTask.gql');

// new way of creating thunk functions,
export const removeAsync = createAsyncThunk(
  'tasks/removeAsync',
  async id => {
    const { data } = await client.mutate({
      mutation: removeTaskGQL,
      variables: { id },
    });
    return data.removeTask.id;
  },
);

export const updateAsync = createAsyncThunk(
  'tasks/updateAsync',
  async payload => {
    const { data } = await client.mutate({
      mutation: updateTaskGQL,
      variables: payload,
    });
    return data.updateTask;
  },
);

export const getTasksAsync = createAsyncThunk(
  'tasks/getTasksAsync',
  async () => {
    const { data } = await client.query({
      query: tasksGQL,
    });
    return data.tasks;
  },
);

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    create: (state, { payload }) => {
      const { id, status, text, updatedAt } = payload;
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.push({
        id,
        status,
        text,
        updatedAt,
      });
    },
    remove: (state, { payload }) => state.filter(el => el.id !== payload),
    update: (state, { payload }) => {
      const { id, text, status, updatedAt } = payload;
      const task = state.find(el => el.id === id);
      if (task) {
        task.text = text || task.text;
        task.status = status;
        task.updatedAt = updatedAt;
      }
    },
  },
  extraReducers: {
    [removeAsync.fulfilled]: (state, { payload }) => state.filter(el => el.id !== payload),
    [updateAsync.fulfilled]: (state, { payload }) => {
      const { id, text, status, updatedAt } = payload;
      const task = state.find(el => el.id === id);
      if (task) {
        task.text = text || task.text;
        task.status = status;
        task.updatedAt = updatedAt;
      }
    },
    [getTasksAsync.fulfilled]: (state, { payload }) => {
      state = payload;
      return state;
    },
  },
});

export const { create, remove, update } = tasksSlice.actions;

// we can create async functions in standard way
export const createAsync = ({ text, status }) => async dispatch => {
  const { data } = await client.mutate({
    mutation: addTaskGQL,
    variables: { text, status },
  });
  dispatch(create(data.addTask));
};

export default tasksSlice.reducer;
