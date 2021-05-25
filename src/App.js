import React from 'react';

import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Link as LocationLink, Navigate, ReactLocation, Route, Routes } from 'react-location';
import { AppBar, Container, Grid, Link, makeStyles, Toolbar, Typography } from '@material-ui/core';
import * as propTypes from 'prop-types';
import Login from './pages/Login';
import Messages from './components/Messages';
import useSession from './hooks/useSession';
import Issues from './pages/Issues';
import Projects from './pages/Projects';
import ProjectCreate from './pages/ProjectCreate';
import ProjectUpdate from './pages/ProjectUpdate';
import Home from './pages/Home';

// Create a client
const queryClient = new QueryClient();
const useStyles = makeStyles((theme) => ({
  menuItem: {
    '&:hover': {
      opacity: 0.3,
    },
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
                  <Link
                    to="/"
                    component={LocationLink}
                    variant="h4"
                    color="textSecondary"
                    underline="none"
                  >
                    Home
                  </Link>
                </Grid>
                <Grid item className={classes.menuItem}>
                  <Link
                    to="issues"
                    component={LocationLink}
                    variant="h4"
                    color="textSecondary"
                    underline="none"
                  >
                    Issues
                  </Link>
                </Grid>
                <Grid item className={classes.menuItem}>
                  <Link
                    to="projects"
                    component={LocationLink}
                    variant="h4"
                    color="textSecondary"
                    underline="none"
                  >
                    Projects
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
          <Route path="login" element={<Login />} />
          <PrivateRoute path="*" Element={Page404} />
        </Routes>
      </ReactLocation>
      <Messages />
    </QueryClientProvider>
  );
}

export default App;
