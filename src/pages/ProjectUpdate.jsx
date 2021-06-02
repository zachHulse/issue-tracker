import React from 'react';
import { Grid, IconButton, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import * as propTypes from 'prop-types';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useNavigate } from 'react-location';
import { useProject, useProjectSave } from '../hooks/api/useProjects';
import SaveView from './generic/SaveView';
import Project from '../types/project';
import useSession from '../hooks/useSession';

const useStyles = makeStyles(() => ({
  btn: {
    '& svg': {
      fontSize: '2em',
    },
  },
}));

const HeaderElement = ({ item }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid container justify="space-between">
      <Typography variant="h2">{item?.name}</Typography>
      <IconButton
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.btn}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => navigate('./sprints')}>Sprints</MenuItem>
        <MenuItem onClick={() => navigate('./issues')}>Issues</MenuItem>
      </Menu>
    </Grid>
  );
};

const ProjectUpdate = () => {
  const fields = {
    name: {},
    description: {},
    abbreviation: {},
  };
  const { session } = useSession();

  return (
    <SaveView
      useItem={useProject}
      useSaveItem={useProjectSave}
      disabled={!session.isAdmin}
      {...{ HeaderElement, fields }}
    />
  );
};

HeaderElement.propTypes = {
  item: propTypes.shape(Project).isRequired,
};

export default ProjectUpdate;
