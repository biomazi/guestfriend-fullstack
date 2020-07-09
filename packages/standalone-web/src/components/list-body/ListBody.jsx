import React from 'react';
import styled from 'styled-components';
import { bgColors } from 'utils/constants';

const StyledListBody = styled.div`
  height: 600px;
  overflow: auto;
  background-color: ${({ status }) => bgColors[status](0.3)};
  display: flex;
  padding: 10px 60px;
  justify-content: center;
  align-items: flex-start;
  align-content: baseline;
  flex-wrap: wrap;
`;

const ListBody = ({ children, status, onDrop }) => (
  <StyledListBody status={status} onDragOver={e => e.preventDefault()} onDrop={onDrop}>
    {children}
  </StyledListBody>
);

export default ListBody;
