import React from 'react';
import { Container, Typography } from '@material-ui/core';

const Home = () => {
  return (
    <Container>
      <Typography variant="h2" color="textSecondary" align="center">
        Issue Tracker
      </Typography>
      <Typography variant="body1" color="textSecondary" align="center">
        simple issue tracking
      </Typography>
    </Container>
  );
};

export default Home;
