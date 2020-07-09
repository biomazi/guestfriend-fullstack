export const TASK_STATUS = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
};

export const TITLE_TASK_STATUS = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};

export const bgColors = {
  TODO: opacity => `rgba(30, 144, 255, ${opacity})`,
  IN_PROGRESS: opacity => `rgba(220, 20, 60, ${opacity})`,
  DONE: opacity => `rgba(35, 67, 97, ${opacity})`,
};

export const DATATRANSFER_ID = 'task_id';
