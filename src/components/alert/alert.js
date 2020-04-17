import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const handleCloseNoficiation = setter => (e, reason) => {
  if (reason === 'clickaway') {
    return;
  };
  setter(false);
};

export default Alert;
