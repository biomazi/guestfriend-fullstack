import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { bgColors } from 'utils/constants';

const StyledWrapper = styled.div`
  width: 150px;
  height: 130px;
  background-color: ${({ status }) => bgColors[status](0.6)};
  margin-bottom: 10px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  &:last-child {
    margin-bottom: 0
  }
`;

const StyledButton = styled.button`
  display: none;
  width: 16px;
  height: 16px;
  font-size: 16px;
  line-height: 16px;
  font-weight: 900;
  background-color: transparent;
  position: absolute;
  border-style: none;
  outline: none;
  top: 10px;
  right: 10px;
  ${StyledWrapper}:hover & {
    display: block;
  }
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

const StyledText = styled.textarea`
  background-color: transparent;
  border: none;
  resize: none;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
`;

const Task = ({
  text,
  onChange,
  onDragStart,
  onBlur,
  onEnter,
  onEscape,
  onRemove,
  isActive,
  draggable,
  status,
}) => {
  const [isActiveState, setIsActive] = useState(isActive);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => inputRef.current.focus());

  const handleDragStart = e => {
    wrapperRef.current.style.opacity = 0.3;
    wrapperRef.current.style.border = '1px solid black';
    onDragStart(e);
  };

  return (
    <StyledWrapper
      status={status}
      ref={wrapperRef}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDoubleClick={() => setIsActive(true)}
    >
      {isActiveState ? '' : text}
      <StyledText
        ref={inputRef}
        isActive={isActiveState}
        onBlur={e => {
          onBlur(e);
          setIsActive(false);
        }}
        onChange={onChange}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === 'Escape') e.preventDefault();
        }}
        onKeyUp={e => {
          if (e.key === 'Enter') onEnter(e);
          if (e.key === 'Escape') onEscape(e);
        }}
        value={text}
      />
      {!isActive && <StyledButton onClick={onRemove}>X</StyledButton>}
    </StyledWrapper>
  );
};
export default Task;
