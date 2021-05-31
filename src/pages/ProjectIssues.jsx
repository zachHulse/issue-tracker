import React from 'react';

import { Container, Typography } from '@material-ui/core';
import { useParams } from 'react-location';
import useProjectIssues from '../hooks/api/useIssues';
import DataTable from '../components/DataTable';
import { useProject } from '../hooks/api/useProjects';

const ProjectIssues = () => {
  const params = useParams();
  const { data = {} } = useProject(params.id);
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Project {data.name} Issues
      </Typography>
      <DataTable
        displayKeys={['name', 'code', 'story_points']}
        useData={() => useProjectIssues(params.id)}
      />
    </Container>
  );
};

export default ProjectIssues;
