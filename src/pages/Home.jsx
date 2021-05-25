import React from 'react';
import { Card, CardContent, CardHeader, Container, Typography } from '@material-ui/core';

const Home = () => {
  return (
    <Container>
      <Card variant="outlined">
        <CardHeader>
          <Typography variant="h2" color="textSecondary">
            Issue Tracker
          </Typography>
        </CardHeader>
        <CardContent>
          <Typography variant="body1" color="textSecondary">
            simple issue tracking
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Home;
