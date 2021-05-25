import React from 'react';

import { Container, Typography, makeStyles, Grid, Button } from '@material-ui/core';
import { Link } from 'react-location';
import { AddCircle } from '@material-ui/icons';
import useProjects from '../hooks/api/useProjects';
import DataTable from '../components/DataTable';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
  },
}));

const Projects = () => {
  const classes = useStyles();
  return (
    <Container>
      <Typography variant="h2">Projects</Typography>
      <Grid container justify="flex-end">
        <Grid item>
          <Link to="create" className={classes.link}>
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
