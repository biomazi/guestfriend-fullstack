import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateAsync, createAsync, removeAsync } from 'store/slices/tasksSlice';
import { DATATRANSFER_ID } from 'utils/constants';

const useSectionHandlers = status => {
  const dispatch = useDispatch();
  const [isVisibleNewTask, setIsVisibleNewTask] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');

  const reset = () => {
    setNewTaskText('');
    setIsVisibleNewTask(false);
  };

  const handleDrop = e => {
    e.preventDefault();
    const id = e.dataTransfer.getData(DATATRANSFER_ID);
    dispatch(updateAsync({ id, status }));
  };

  const handleListHeaderClick = () => setIsVisibleNewTask(true);

  const handleNewTaskChange = e => setNewTaskText(e.target.value);

  const handleTaskChange = (e, id, newStatus) => (
    dispatch(updateAsync({ id, text: e.target.value, status: newStatus }))
  );

  const handleBlur = () => {
    setNewTaskText('');
    setIsVisibleNewTask(false);
  };

  const handleNewTaskEnter = e => {
    const text = e.target.value;
    setIsVisibleNewTask(false);
    setNewTaskText('');
    if (text) dispatch(createAsync({ text, status }));
  };

  const handleTaskEnter = (e, id) => {
    if (e.target.value === '') {
      dispatch(removeAsync(id));
    } else {
      e.target.blur();
    }
  };

  const handleTaskRemove = id => dispatch(removeAsync(id));

  const handleDragStart = (e, id) => e.dataTransfer.setData(DATATRANSFER_ID, id);

  return {
    isVisibleNewTask,
    newTaskText,
    reset,
    handleListHeaderClick,
    handleDrop,
    handleNewTaskChange,
    handleBlur,
    handleTaskEnter,
    handleNewTaskEnter,
    handleTaskRemove,
    handleTaskChange,
    handleDragStart,
  };
};

export default useSectionHandlers;
