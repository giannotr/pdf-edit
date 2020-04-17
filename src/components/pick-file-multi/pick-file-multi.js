import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { splitFileList } from '../../lib/parsers';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Button } from '../../theme/buttons';
import { Input } from '../../theme/forms';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ClearIcon from '@material-ui/icons/Clear';

const electron = window.require('electron');
const { remote } = electron;
const { dialog } = remote;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 150px auto;
  grid-template-rows: 50px 50px;
  width: 100%;
  height: 100px;
`;

const CellPick = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
`;

const CellSelect = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
`;

const CellClear = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
`;

function PickFileMulti({ paths, onLoad }) {
  const [value, setValue] = useState('');
  const [pickCall, setPickCall] = useState(false);

  useEffect(() => {
    setValue(paths.length > 0 ? `"${paths.join('", "')}"` : '');
  }, [paths]);

  const handlePick = async () => {
    const response = await dialog.showOpenDialogSync({
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'PDF', extensions: ['pdf'] },
      ],
    });

    if(response) {
      onLoad(response);
    }
  }

  const handleSubmitPaths = ({ key }) => {
    if(key === 'Enter'){
      onLoad(splitFileList(value));
    };
  }

  return(
    <Grid>
      <CellPick>
        <Button theme="primary" height="100%" onClick={handlePick}>
          <InsertDriveFileIcon /> Pick files
        </Button>
      </CellPick>
      <CellSelect>
        <ClickAwayListener onClickAway={() => setPickCall(false)}>
          <div>
            <Tooltip
              arrow
              placement="top-start"
              PopperProps={{
                disablePortal: true,
              }}
              onClose={() => setPickCall(false)}
              open={pickCall}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title="Hit 'Enter' to confirm selection"
            >
              <div>
                <Input
                  type="text"
                  name="pdf-path-list"
                  label="Selected files"
                  placeholder="Path list..."
                  value={value}
                  onClick={() => setPickCall(true)}
                  onChange={e => setValue(e.target.value)}
                  onKeyPress={handleSubmitPaths}
                />
              </div>
            </Tooltip>
          </div>
        </ClickAwayListener>
      </CellSelect>
      <CellClear>
        <Button theme="secondary" onClick={() => onLoad([])}>
          <ClearIcon /> Clear selection
        </Button>
      </CellClear>
    </Grid>
  );
}

export default PickFileMulti;
