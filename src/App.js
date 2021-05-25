import React from 'react';

import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactLocation, Route, Navigate, Routes, Link as LocationLink } from 'react-location';
import { Container, Typography, Link } from '@material-ui/core';
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

const Page404 = () => (
  <Container>
    <Typography variant="h2">Sorry, page not found.</Typography>
  </Container>
);

function App() {
  const { session } = useSession();

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
          <nav>
            <Link to="/" component={LocationLink}>
              Home
            </Link>
            <Link to="issues" component={LocationLink}>
              Issues
            </Link>
            <Link to="projects" component={LocationLink}>
              Projects
            </Link>
          </nav>
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
