import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
`;

function Loader() {
  return(
    <Wrapper>
      <CircularProgress color="primary" />
    </Wrapper>
  );
}

export default Loader;
