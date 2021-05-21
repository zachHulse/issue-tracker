import React from 'react';
import { Box, IconButton, makeStyles, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import * as propTypes from 'prop-types';
import useMessages from '../hooks/useMessages';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    left: '50%',
    zIndex: 4000,
  },
  alert: {
    position: 'static',
    width: '100%',
  },
}));

const Messages = () => {
  const { messages, removeMessage } = useMessages();
  const classes = useStyles();

  const handleClose = (reason, text) => {
    if (reason === 'clickaway') {
      return;
    }

    removeMessage(text);
  };

  return (
    <Box className={classes.root}>
      {Object.entries(messages).map(([text, severity]) => (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open
          onClose={(event, reason) => handleClose(reason, text)}
          key={text}
          className={classes.alert}
        >
          <Alert
            elevation={6}
            variant="filled"
            severity={severity}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => removeMessage(text)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            {text}
          </Alert>
        </Snackbar>
      ))}
    </Box>
  );
};

Alert.propTypes = {
  severity: propTypes.string,
};
Alert.defaultProps = {
  severity: 'info',
};

export default Messages;
