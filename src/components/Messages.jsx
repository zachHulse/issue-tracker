import React from 'react';
import { Button, IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import * as propTypes from 'prop-types';
import useMessages from '../hooks/useMessages';

const Alert = ({ severity }) => <MuiAlert elevation={6} variant="filled" {...{ severity }} />;

const Messages = () => {
  const { messages, removeMessage } = useMessages();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    Object.entries(messages).forEach(([text]) => removeMessage(text));
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={!Object.keys(messages).length}
      autoHideDuration={10000}
      onClose={handleClose}
      action={
        <>
          <Button color="secondary" size="small" onClick={handleClose}>
            CLEAR
          </Button>
        </>
      }
    >
      {Object.entries(messages).map(([text, severity]) => (
        <Alert severity={severity}>
          {text}
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => removeMessage(text)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Alert>
      ))}
    </Snackbar>
  );
};

Alert.propTypes = {
  severity: propTypes.string,
};
Alert.defaultProps = {
  severity: 'info',
};

export default Messages;
