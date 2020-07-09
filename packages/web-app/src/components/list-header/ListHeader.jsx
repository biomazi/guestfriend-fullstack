import React from 'react';
import styled from 'styled-components';
import { bgColors, TITLE_TASK_STATUS } from 'utils/constants';
import { useSelector } from 'react-redux';
import { numberOfTasksByStatus } from 'store/selectors/tasksSelectors';

const StyledListHeader = styled.div`
  height: 100px;
  border-bottom: 5px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${({ status }) => bgColors[status](1)};
`;

const StyledButton = styled.button`
  width: 32px;
  height: 32px;
  background-color: transparent;
  font-size: 32px;
  line-height: 32px;
  font-weight: 900;
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  border-style: none;
  outline: none;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

const StyledTitle = styled.div`
  font-size: 28px;
  line-height: 28px;
  font-weight: 900;
`;

const StyledNumber = styled.div`
  position: absolute;
  font-size: 20px;
  font-weight: 900;
  line-height: 20px;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

const ListHeader = ({ status, onClick }) => {
  const getNumberOfTasks = useSelector(numberOfTasksByStatus);

  return (
    <StyledListHeader status={status}>
      <StyledTitle>{TITLE_TASK_STATUS[status]}</StyledTitle>
      <StyledButton onClick={onClick}>+</StyledButton>
      <StyledNumber>{`(${getNumberOfTasks(status)})`}</StyledNumber>
    </StyledListHeader>
  );
};
export default ListHeader;
