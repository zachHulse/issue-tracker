import React from 'react';

import { Container, Typography } from '@material-ui/core';
import useIssues from '../hooks/api/useIssues';
import DataTable from '../components/DataTable';

const Issues = () => {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Issues
      </Typography>
      <DataTable displayKeys={['name', 'code', 'story_points']} useData={useIssues} />
    </Container>
  );
};

export default Issues;
