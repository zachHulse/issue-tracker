import React from 'react';

import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Navigate, ReactLocation, Route, Routes } from 'react-location';
import { AppBar, Container, makeStyles, Toolbar, Typography } from '@material-ui/core';
import * as propTypes from 'prop-types';
import Login from './pages/Login';
import Messages from './components/Messages';
import useSession from './hooks/useSession';
import Issues from './pages/Issues';
import ProjectCreate from './pages/ProjectCreate';
import ProjectUpdate from './pages/ProjectUpdate';
import Home from './pages/Home';
import SprintCreate from './pages/SprintCreate';
import SprintUpdate from './pages/SprintUpdate';
import Sprints from './pages/Sprints';
import IssueCreate from './pages/IssueCreate';
import IssueUpdate from './pages/IssueUpdate';
import Crumbs from './components/Crumbs';

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
              <Crumbs />
            </Toolbar>
          </AppBar>
        )}
        <Routes>
          <PrivateRoute path="/" Element={Home} />
          <PrivateRoute path="projects" Element={Home} />
          <PrivateRoute path="projects/:project_id/issues" Element={Issues} />
          <PrivateRoute path="projects/create" Element={ProjectCreate} />
          <PrivateRoute path="projects/:project_id/issues/create" Element={IssueCreate} />
          <PrivateRoute path="projects/:project_id/issues/:id" Element={IssueUpdate} />
          <PrivateRoute path="projects/:id" Element={ProjectUpdate} />
          <PrivateRoute path="projects/:project_id/sprints" Element={Sprints} />
          <PrivateRoute path="projects/:project_id/sprints/create" Element={SprintCreate} />
          <PrivateRoute path="projects/:project_id/sprints/:id" Element={SprintUpdate} />
          <Route path="login" element={<Login />} />
          <PrivateRoute path="*" Element={Page404} />
        </Routes>
      </ReactLocation>
      <Messages />
    </QueryClientProvider>
  );
}

export default App;
