import React from 'react';

import { Container, Typography } from '@material-ui/core';
import useProjects from '../hooks/api/useProjects';
import DataTable from '../components/DataTable';

const Projects = () => {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Projects
      </Typography>
      <DataTable displayKeys={['name', 'description']} useData={useProjects} />
    </Container>
  );
};

export default Projects;
