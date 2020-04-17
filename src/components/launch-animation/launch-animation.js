import React, { Fragment, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {ReactComponent as Documents } from './documents.svg';

const animationVanish = keyframes`
  to {
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #282c34;
  font-size: calc(10px + 2vmin);
  color: #eee;
  z-index: 9999;
  pointer-events: none;
  animation: ${animationVanish} 1s forwards ease 2.5s;
`;

const animationGraphic = keyframes`
  to {
    transform: scale(1);
  }
`;

const Graphic = styled.div`
  height: 40vmin;
  overflow: hidden;
  animation: ${animationVanish} .5s forwards ease 2s;

  svg {
    width: 100%;
    height: 100%;
  }

  @media (prefers-reduced-motion: no-preference) {
    #doc-1, #doc-2, #doc-3 {
      transform: scale(0);
      transform-origin: center;
      animation: ${animationGraphic} forwards .8s ease;
    }

    #doc-1 {
      animation-delay: 1s;
    }

    #doc-2 {
      animation-delay: .5s;
    }
  }
`;

function LaunchAnimation() {
  const [running, setRunning] = useState(true);

  setTimeout(() => {
    setRunning(false);
  }, 3500);

  return(
    <Fragment>
      {running && <Wrapper>
        <Graphic><Documents /></Graphic>
        <p style={{margin: '40px'}}>
          <code style={{fontWeight: '1000'}}>pdf</code>
          <span style={{fontWeight: '200'}}>Edit</span>
        </p>
      </Wrapper>}
    </Fragment>
  );
}

export default LaunchAnimation;
