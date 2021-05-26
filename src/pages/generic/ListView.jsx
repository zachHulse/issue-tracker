import React from 'react';

import { Button, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-location';
import { AddCircle } from '@material-ui/icons';
import * as propTypes from 'prop-types';
import DataTable from '../../components/DataTable';
import { title } from '../../string';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
  },
}));

const ListView = ({ modelName, displayKeys, useData }) => {
  const classes = useStyles();
  return (
    <Container>
      <Typography variant="h2">{`${title(modelName)}s`}</Typography>
      <Grid container justify="flex-end">
        <Grid item>
          <Link to="create" className={classes.link}>
            <Button variant="contained" color="default" startIcon={<AddCircle />}>
              Create {modelName}
            </Button>
          </Link>
        </Grid>
      </Grid>
      <DataTable {...{ displayKeys, useData }} />
    </Container>
  );
};

ListView.propTypes = {
  modelName: propTypes.string.isRequired,
  displayKeys: propTypes.arrayOf(propTypes.string).isRequired,
  useData: propTypes.func.isRequired,
};

export default ListView;
