import React, { useRef } from 'react';
import styled from 'styled-components';
import { bgColors } from 'utils/constants';
import useListBodyHandlers from './useListBodyHandlers';

const StyledListBody = styled.div`
  height: 600px;
  overflow: auto;
  background-color: ${({ status }) => bgColors[status](0.2)};
  display: flex;
  padding: 10px 60px;
  justify-content: center;
  align-items: flex-start;
  align-content: baseline;
  flex-wrap: wrap;
`;

const ListBody = ({ children, status, onDrop }) => {
  const ref = useRef(null);
  const { handleDragEnter, handleDragLeave, handleDrop } = useListBodyHandlers(ref, onDrop);

  return (
    <StyledListBody
      ref={ref}
      status={status}
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {children}
    </StyledListBody>
  );
};

export default ListBody;
