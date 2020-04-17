import React, { Fragment, useState } from 'react';
import { outputPDF } from '../../../lib/output';
import mergeFiles from '../../../lib/merge-files';
import Snackbar from '@material-ui/core/Snackbar';
import Alert, { handleCloseNoficiation } from '../../../components/alert/alert';
import PickFileMulti from '../../../components/pick-file-multi/pick-file-multi';
import ListFiles from '../../../components/list-files/list-files';
import SaveFile from '../../../components/save-file/save-file';
import * as Containers from '../../../theme/containers';
import * as Styled from './merge-styled';

function Merge() {
  const [paths, setPaths] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleLoad = async (list) => {
    if(list && Array.isArray(list)) {
      setPaths(list);
    }
  };

  const handleSave = async (outputPath) => {
    const data = await mergeFiles(paths);
    const response = outputPDF(outputPath, data);
    setSuccess(response);
  }

  return(
    <Fragment>
      <Styled.ButtonGrid>
        <Styled.CellFile>
          <PickFileMulti onLoad={handleLoad} paths={paths} />
        </Styled.CellFile>
        <Styled.CellSave>
          <SaveFile
            height="100%"
            disabled={paths.length === 0}
            onClick={handleSave}
          />
        </Styled.CellSave>
      </Styled.ButtonGrid>
      <Containers.VerticalConstraint>
        <ListFiles paths={paths} onChange={setPaths} />
      </Containers.VerticalConstraint>
      <Snackbar
        open={success}
        autoHideDuration={2500}
        onClose={handleCloseNoficiation(setSuccess)}
      >
        <Alert onClose={handleCloseNoficiation(setSuccess)} severity="success">
          Merger complete!
        </Alert>
      </Snackbar>
    </Fragment>
  );
}

export default Merge;
