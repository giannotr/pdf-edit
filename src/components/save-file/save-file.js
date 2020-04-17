import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../theme/buttons';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

const electron = window.require('electron');
const { remote } = electron;
const { dialog } = remote;

function SaveFile({ height, disabled, onClick }) {
  const _onClick = async () => {
    const { filePath } = await dialog.showSaveDialog({
      buttonLabel: 'Save PDF',
      defaultPath: `./output-${Date.now()}.pdf`,
    });

    onClick(filePath);
  }

  return(
    <Button
      theme="tertiary"
      height={height}
      onClick={_onClick}
      disabled={disabled}
    >
      <SaveAltIcon /> Save PDF
    </Button>
  );
}

SaveFile.propTypes = {
  height: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

SaveFile.defaultProps = {
  height: '',
  disabled: false,
  onClick: () => {},
}

export default SaveFile;
