import React from 'react';
import { search } from 'slices/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  text-align: end;
`;

const StyledInput = styled.input`
  color: black;
  min-width: 250px;
`;

const Search = () => {
  const searchText = useSelector(state => state.search);
  const dispatch = useDispatch();
  return (
    <StyledWrapper>
      <StyledInput
        type="text"
        placeholder="Enter search text here"
        onChange={e => dispatch(search(e.target.value))}
        defaultValue={searchText}
      />
    </StyledWrapper>
  );
};

export default Search;
