import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import ListHeader from 'components/list-header/ListHeader';
import ListBody from 'components/list-body/ListBody';
import Task from 'components/task/Task';
import { DATATRANSFER_ID } from 'utils/constants';
import { create, update, remove } from 'slices/tasksSlice';

const StyledWrapper = styled.div`
  width: 350px;
  height: 700px;
  margin-bottom: 20px;
`;

const Section = ({ status, tasks }) => {
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
    dispatch(update({ id, status }));
  };

  return (
    <StyledWrapper>
      <ListHeader status={status} onClick={() => setIsVisibleNewTask(true)} />
      <ListBody status={status} onDrop={e => handleDrop(e, status)}>
        {isVisibleNewTask && (
          <Task
            status={status}
            isActive
            onChange={e => {
              setNewTaskText(e.target.value);
            }}
            onBlur={() => {
              setNewTaskText('');
              setIsVisibleNewTask(false);
            }}
            onEnter={e => {
              const text = e.target.value;
              setIsVisibleNewTask(false);
              setNewTaskText('');
              if (text) {
                dispatch(create({ text, status }));
              }
            }}
            onEscape={reset}
            text={newTaskText}
          />
        )}
        {tasks.map(task => (
          <Task
            key={task.id}
            status={status}
            isActive={false}
            draggable
            onDragStart={e => e.dataTransfer.setData(DATATRANSFER_ID, task.id)}
            onChange={e => (
              dispatch(update({ id: task.id, text: e.target.value, status: task.status }))
            )}
            onBlur={() => {
              setNewTaskText('');
              setIsVisibleNewTask(false);
            }}
            onEnter={e => {
              if (e.target.value === '') {
                dispatch(remove(task.id));
              } else {
                e.target.blur();
              }
            }}
            onRemove={() => dispatch(remove(task.id))}
            onEscape={reset}
            text={task.text}
          />
        ))}
      </ListBody>
    </StyledWrapper>
  );
};

export default Section;
