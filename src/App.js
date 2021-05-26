import React from 'react';

import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Link, Navigate, ReactLocation, Route, Routes } from 'react-location';
import { AppBar, Container, Grid, makeStyles, Toolbar, Typography } from '@material-ui/core';
import * as propTypes from 'prop-types';
import Login from './pages/Login';
import Messages from './components/Messages';
import useSession from './hooks/useSession';
import Issues from './pages/Issues';
import Projects from './pages/Projects';
import ProjectCreate from './pages/ProjectCreate';
import ProjectUpdate from './pages/ProjectUpdate';
import Home from './pages/Home';
import SprintCreate from './pages/SprintCreate';
import SprintUpdate from './pages/SprintUpdate';
import Sprints from './pages/Sprints';

// Create a client
const queryClient = new QueryClient();
const useStyles = makeStyles((theme) => ({
  menuItem: {
    '&:hover': {
      opacity: 0.3,
    },
  },
  menuLink: {
    textDecoration: 'none',
  },
  menuBar: {
    marginBottom: theme.spacing(3),
  },
}));

const Page404 = () => (
  <Container>
    <Typography variant="h2">Sorry, page not found.</Typography>
  </Container>
);

function App() {
  const { session } = useSession();
  const classes = useStyles();

  const PrivateRoute = ({ path, Element }) => (
    <Route {...{ path }} element={session.token ? <Element /> : <Navigate to="login" />} />
  );

  PrivateRoute.propTypes = {
    path: propTypes.string.isRequired,
    Element: propTypes.func.isRequired,
  };
  return (
    <QueryClientProvider client={queryClient}>
      <ReactLocation>
        {session.token && (
          <AppBar position="static" color="transparent" className={classes.menuBar}>
            <Toolbar>
              <Grid container spacing={2}>
                <Grid item className={classes.menuItem}>
                  <Link to="/" className={classes.menuLink}>
                    <Typography variant="h4" color="textSecondary">
                      Home
                    </Typography>
                  </Link>
                </Grid>
                <Grid item className={classes.menuItem}>
                  <Link to="issues" className={classes.menuLink}>
                    <Typography variant="h4" color="textSecondary">
                      Issues
                    </Typography>
                  </Link>
                </Grid>
                <Grid item className={classes.menuItem}>
                  <Link to="projects" className={classes.menuLink}>
                    <Typography variant="h4" color="textSecondary">
                      Projects
                    </Typography>
                  </Link>
                </Grid>
                <Grid item className={classes.menuItem}>
                  <Link to="sprints" className={classes.menuLink}>
                    <Typography variant="h4" color="textSecondary">
                      Sprints
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        )}
        <Routes>
          <PrivateRoute path="/" Element={Home} />
          <PrivateRoute path="issues" Element={Issues} />
          <PrivateRoute path="projects" Element={Projects} />
          <PrivateRoute path="projects/create" Element={ProjectCreate} />
          <PrivateRoute path="projects/:id/update" Element={ProjectUpdate} />
          <PrivateRoute path="sprints" Element={Sprints} />
          <PrivateRoute path="sprints/create" Element={SprintCreate} />
          <PrivateRoute path="sprints/:id/update" Element={SprintUpdate} />
          <Route path="login" element={<Login />} />
          <PrivateRoute path="*" Element={Page404} />
        </Routes>
      </ReactLocation>
      <Messages />
    </QueryClientProvider>
  );
}

export default App;
