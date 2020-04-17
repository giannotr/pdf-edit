import React, { Fragment, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { parseRange } from '../../../lib/parsers';
import removePages from '../../../lib/remove-pages';
import { outputPDF } from '../../../lib/output';
import Snackbar from '@material-ui/core/Snackbar';
import Alert, { handleCloseNoficiation } from '../../../components/alert/alert';
import PickFile from '../../../components/pick-file/pick-file';
import PickPages from '../../../components/pick-pages/pick-pages';
import SelectRange from '../../../components/select-range/select-range';
import SaveFile from '../../../components/save-file/save-file';
import * as Styled from './remove-styled';

function Remove() {
  const [b64, setB64] = useState('');
  const [doc, setDoc] = useState({});
  const [pageCount, setPageCount] = useState(0);
  const [selection, setSelection] = useState([]);
  const [success, setSuccess] = useState(false);

  const _reset = () => {
    setB64('');
    setDoc({});
    setPageCount(0);
    setSelection([]);
  }

  const handleLoad = async (data) => {
    if(data) {
      const _doc = await PDFDocument.load(data);
      setDoc(_doc);
      setB64(await _doc.saveAsBase64());
      setPageCount(_doc.getPageCount());
      setSelection([]);
    } else {
      _reset();
    }
  }

  const handleSave = async (path) => {
    const data = await removePages(doc, selection.sort((x, y) => x - y));
    const response = outputPDF(path, data);
    setSuccess(response);
    _reset();
  }

  return (
    <Fragment>
      <Styled.ButtonGrid>
        <Styled.CellFile>
          <PickFile onLoad={handleLoad} />
        </Styled.CellFile>
        <Styled.CellRange>
          <SelectRange
            onSubmit={range => setSelection(parseRange(range, pageCount))}
            selection={selection}
            disabled={pageCount === 0}
            placeholder="Choose pages to remove..."
          />
        </Styled.CellRange>
        <Styled.CellSave>
          <SaveFile
            height="100%"
            disabled={pageCount === 0 || selection.length === 0}
            onClick={handleSave}
          />
        </Styled.CellSave>
      </Styled.ButtonGrid>
      <PickPages
        doc={doc}
        b64={b64}
        pageCount={pageCount}
        selection={selection}
        onSelect={setSelection}
      />
      <Snackbar
        open={success}
        autoHideDuration={2500}
        onClose={handleCloseNoficiation(setSuccess)}
      >
        <Alert onClose={handleCloseNoficiation(setSuccess)} severity="success">
          Removal complete!
        </Alert>
      </Snackbar>
    </Fragment>
  );
}

export default Remove;
