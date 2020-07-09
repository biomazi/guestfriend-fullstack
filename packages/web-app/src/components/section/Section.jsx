import React from 'react';
import styled from 'styled-components';
import ListHeader from 'components/list-header/ListHeader';
import ListBody from 'components/list-body/ListBody';
import Task from 'components/task/Task';
import useSectionHandlers from './useSectionHandlers';

const StyledWrapper = styled.div`
  width: 350px;
  height: 700px;
  margin-bottom: 20px;
`;

const Section = ({ status, tasks }) => {
  const {
    isVisibleNewTask,
    newTaskText,
    reset,
    handleListHeaderClick,
    handleDrop,
    handleTaskChange,
    handleNewTaskChange,
    handleBlur,
    handleTaskEnter,
    handleNewTaskEnter,
    handleTaskRemove,
    handleDragStart,
  } = useSectionHandlers(status);

  return (
    <StyledWrapper>
      <ListHeader status={status} onClick={handleListHeaderClick} />
      <ListBody status={status} onDrop={handleDrop}>
        {isVisibleNewTask && (
          <Task
            isActive
            status={status}
            text={newTaskText}
            onChange={handleNewTaskChange}
            onEscape={reset}
            onBlur={handleBlur}
            onEnter={handleNewTaskEnter}
          />
        )}
        {tasks.map(task => (
          <Task
            draggable
            key={task.id}
            status={status}
            isActive={false}
            text={task.text}
            onEscape={reset}
            onRemove={() => handleTaskRemove(task.id)}
            onDragStart={e => handleDragStart(e, task.id)}
            onChange={e => handleTaskChange(e, task.id, task.status)}
            onBlur={handleBlur}
            onEnter={e => handleTaskEnter(e, task.id)}
          />
        ))}
      </ListBody>
    </StyledWrapper>
  );
};

export default Section;
