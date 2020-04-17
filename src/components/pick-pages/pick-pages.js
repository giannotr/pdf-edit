import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RenderPage from '../render-page/render-page';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import { theme } from '../../theme/theme';
import * as Containers from '../../theme/containers';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: [start] repeat(auto-fit, 150px) [end];
  grid-gap: 25px;
  justify-content: center;
  width: 100%;
  margin: 10px auto;
  padding: 0 15px;
`;

const Toolbar = styled.div`
  grid-column-start: 1;
  grid-column-end: end;
  grid-row-start: 1;
  grid-row-end: span 1;
  text-align: left;
`;

const Page = styled.div`
  font-size: 12px;
`;

const PageFrame = styled.div`
  position: relative;
  cursor: pointer;
  border: 1.1px #333 solid;

  &:hover {
    border-color: ${theme.colors.outline};
  }

  & > * {
    pointer-events: none;
  }
`;

const Controls = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: auto;
  z-index: 1;
`;

function Skeletons() {
  return(
    <Fragment>
      {[0, 1, 2].map(i => (
        <Box key={i} pt={0.5}>
          <Skeleton variant="rect" width={150} height={118} />
          <Skeleton width={`${(Math.random() * .5 + .5) * 100}%`} />
          <Skeleton width={`${(Math.random() * .5 + .5) * 100}%`} />
        </Box>
      ))}
    </Fragment>
  );
}

const _void = () => {}

function PickPages({ b64, doc, pageCount, selection, onSelect = _void }) {
  const [indices, setIndices] = useState([]);

  useEffect(() => {
    if(doc) {
      setIndices([...new Array(pageCount).keys()]);
    }
  }, [doc, pageCount]);

  const handlePick = ({ target }) => {
    const { dataset } = target;
    const index = Number(dataset.index);
    
    let _selection = [];

    if(selection.includes(index)) {
      _selection = selection.filter(x => x !== index);
    } else {
      _selection = [...selection, index];
    }

    onSelect(_selection);
  };

  return(
    <Containers.VerticalConstraint>
      <Wrapper>
        {(pageCount === 0) &&
          <Skeletons />
        }
        {(pageCount > 0) && <Toolbar>
          <FormControlLabel
            control={
              <Checkbox
                checked={selection.length === pageCount}
                onChange={() => {
                  onSelect(selection.length < pageCount ? indices : [])
                }}
                name="Select all pages"
                color="primary"
              />
            }
            label="Select all pages"
          />
        </Toolbar>}
        {indices.map(i => (
          <Page key={i}>
            <PageFrame data-index={i} onClick={handlePick}>
              <Controls>
                <Checkbox
                  checked={selection.includes(i)}
                  color="primary"
                  inputProps={{
                    'aria-label': 'page selection checkbox',
                    'data-index': i,
                  }}
                  onChange={handlePick}
                />
              </Controls>
              <RenderPage b64={b64} page={i} />
            </PageFrame>
            <div>{`${i + 1}/${pageCount}`}</div>
          </Page>
        ))}
      </Wrapper>
    </Containers.VerticalConstraint>
  );
}

export default PickPages;
