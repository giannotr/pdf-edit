import React, { Suspense, lazy } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from '@material-ui/core/styles';
import * as Containers from './theme/containers';
import LaunchAnimation from './components/launch-animation/launch-animation';
import Loader from './components/loader/loader';
import { muiTheme } from './theme/theme';

const genLazyRoute = (module, time = 500) => {
  return lazy(() => {
    return new Promise(resolve => {
      setTimeout(() => resolve(module), time);
    });
  });
}

const Tools = genLazyRoute(import('./routes/tools/tools'));

const Wrapper = styled.div`
  height: 100vh;
  text-align: center;
  overflow: auto;
`;

const PageLoader = styled.div`
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <Wrapper>
        <Containers.VerticalConstraint height="100vh">
          <LaunchAnimation />
          <Suspense fallback={<PageLoader><Loader /></PageLoader>}>
            <Tools />
          </Suspense>
        </Containers.VerticalConstraint>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
