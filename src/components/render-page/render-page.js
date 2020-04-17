import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;//'./node_modules/pdfjs-dist/build/pdf.worker.js'

const Wrapper = styled.div`
  position: relative;
  width: ${props => props.width || '146px'};
  height: ${props => props.height || '206px'};
`;

const Frame = styled.canvas`
  width: 100%;
  height: 100%;
`;

function RenderPage({ b64, page, width, height }) {
  const frame = useRef(null);

  useEffect(() => {
    if(b64) {
      const _render = async () => {
        const loadingTask = pdfjs.getDocument({ data: atob(b64) });
        const pdf = await loadingTask.promise;
        const _cache = await pdf.getPage(page + 1);
        const viewport = _cache.getViewport({scale: 1});
        const canvas = frame.current;
        const context = canvas.getContext('2d');

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        const renderTask = _cache.render(renderContext);
        await renderTask.promise;
      };
      _render();
    }
  }, [b64, page, frame]);

  return(
    <Wrapper width={width} height={height}>
      <Frame ref={frame} />
    </Wrapper>
  );
}

export default RenderPage;
