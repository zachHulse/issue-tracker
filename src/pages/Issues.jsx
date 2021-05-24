import React from 'react';

import { Container, List, ListItem, Typography } from '@material-ui/core';
import useIssues from '../hooks/api/useIssues';

const Issues = () => {
  const { data = [], isLoading } = useIssues();
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Issues
      </Typography>
      <List>
        {data.map((issue) => (
          <ListItem button>{issue.name}</ListItem>
        ))}
      </List>
      {isLoading && <Typography variant="overline">Loading . . .</Typography>}
    </Container>
  );
};

export default Issues;
