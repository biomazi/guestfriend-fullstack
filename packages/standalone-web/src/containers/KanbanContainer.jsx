import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Section from 'components/section/Section';
import { TASK_STATUS } from 'utils/constants';
import { filteredTasks } from 'slices/tasksSlice';
import Search from 'components/search/Search';

const StyledWrapper = styled.div`
    padding: 20px 10%;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;

const StyledSeparator = styled.hr`
  margin: 20px 0;
  height: 5px;
  background-color: blue;
`;

const KanbanContainer = () => {
  const getFilteredTasks = useSelector(filteredTasks);
  return (
    <StyledWrapper>
      <h2>Gastfreund - Front End Assessment</h2>
      <h1>Kanban Board</h1>
      <Search />
      <StyledSeparator />
      <StyledContainer>
        {Object.values(TASK_STATUS).map(status => (
          <Section
            key={status}
            status={status}
            tasks={getFilteredTasks(status)}
          >
            {status}
          </Section>
        ))}
      </StyledContainer>
    </StyledWrapper>
  );
};

export default KanbanContainer;
