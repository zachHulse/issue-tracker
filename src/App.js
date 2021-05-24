import React from 'react';

import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactLocation, Route, Navigate, Routes } from 'react-location';
import { Container, Typography } from '@material-ui/core';
import * as propTypes from 'prop-types';
import Login from './pages/Login';
import Messages from './components/Messages';
import useSession from './hooks/useSession';
import Issues from './pages/Issues';
import Projects from './pages/Projects';

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
        <Routes>
          <PrivateRoute path="issues" Element={Issues} />
          <PrivateRoute path="/" Element={Projects} />
          <Route path="login" element={<Login />} />
          <PrivateRoute path="*" Element={Page404} />
        </Routes>
      </ReactLocation>
      <Messages />
    </QueryClientProvider>
  );
}

export default App;
