import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../../theme/buttons';
import { Input } from '../../theme/forms';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ClearIcon from '@material-ui/icons/Clear';

const { readFile } = window.require('fs');
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

function PickFile({ onLoad, reset }) {
  const [path, setPath] = useState('');

  useEffect(() => {
    try {
      readFile(path, 'base64', (err, data) => {
        if(!err && path) {
          onLoad(data);
        } else {
          onLoad(null);
        }
      });
    } catch(err) {
      console.log(err);
    }
  }, [path]);

  useEffect(() => {
    if(reset) {
      setPath('');
    }
  }, [reset]);

  const handlePick = async () => {
    const response = await dialog.showOpenDialogSync({
      properties: ['openFile'],
      filters: [
        { name: 'PDF', extensions: ['pdf'] },
      ],
    });
    if(response) {
      const [path] = response;
      setPath(path);
    }
  }

  return(
    <Grid>
      <CellPick>
        <Button theme="primary" height="100%" onClick={handlePick}>
          <InsertDriveFileIcon /> Pick file
        </Button>
      </CellPick>
      <CellSelect>
        <Input
          type="text"
          name="pdf-path"
          label="Selected file"
          placeholder="Path..."
          value={path}
          onChange={e => setPath(e.target.value)}
        />
      </CellSelect>
      <CellClear>
        <Button theme="secondary" onClick={() => setPath('')}>
          <ClearIcon /> Clear file
        </Button>
      </CellClear>
    </Grid>
  );
}

export default PickFile;
