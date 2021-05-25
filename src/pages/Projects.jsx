import React from 'react';

import { Container, Typography, Link, Grid, Button } from '@material-ui/core';
import { Link as LocationLink } from 'react-location';
import { AddCircle } from '@material-ui/icons';
import useProjects from '../hooks/api/useProjects';
import DataTable from '../components/DataTable';

const Projects = () => {
  return (
    <Container>
      <Typography variant="h2">Projects</Typography>
      <Grid container justify="flex-end">
        <Grid item>
          <Link to="create" component={LocationLink} underline="none">
            <Button variant="contained" color="default" startIcon={<AddCircle />}>
              Create Project
            </Button>
          </Link>
        </Grid>
      </Grid>
      <DataTable displayKeys={['name', 'description']} useData={useProjects} />
    </Container>
  );
};

export default Projects;
