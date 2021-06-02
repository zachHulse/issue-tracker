import React from 'react';
import { useNavigate } from 'react-location';
import { ExitToApp } from '@material-ui/icons';
import { AppBar, Grid, IconButton, makeStyles, Toolbar } from '@material-ui/core';
import useSession from '../hooks/useSession';
import Crumbs from './Crumbs';

const useStyles = makeStyles((theme) => ({
  menuBar: {
    marginBottom: theme.spacing(3),
  },
}));
const AppMenu = () => {
  const { clearSession, session } = useSession();
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <AppBar position="static" color="transparent" className={classes.menuBar}>
      <Toolbar>
        {session.token && (
          <Grid container justify="space-between">
            <Grid item>
              <Crumbs />
            </Grid>
            <Grid item>
              <IconButton
                onClick={() => {
                  clearSession();
                  navigate('/login');
                }}
              >
                <ExitToApp />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppMenu;
