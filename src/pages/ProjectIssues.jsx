import React from 'react';

import { Button, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { Link, useParams } from 'react-location';
import { AddCircle } from '@material-ui/icons';
import useProjectIssues from '../hooks/api/useIssues';
import DataTable from '../components/DataTable';
import { useProject } from '../hooks/api/useProjects';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
  },
}));

const ProjectIssues = () => {
  const classes = useStyles();
  const params = useParams();
  const { data = {} } = useProject(params.id);
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Project {data.name} Issues
      </Typography>
      <Grid container justify="flex-end">
        <Grid item>
          <Link to="create" className={classes.link}>
            <Button variant="contained" color="default" startIcon={<AddCircle />}>
              Create Issue
            </Button>
          </Link>
        </Grid>
      </Grid>
      <DataTable
        displayKeys={['name', 'code', 'story_points']}
        useData={() => useProjectIssues(params.id)}
      />
    </Container>
  );
};

export default ProjectIssues;
