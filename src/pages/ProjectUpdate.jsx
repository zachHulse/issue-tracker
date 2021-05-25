import React from 'react';
import { Typography } from '@material-ui/core';
import * as propTypes from 'prop-types';
import { useProject, useProjectSave } from '../hooks/api/useProjects';
import SaveView from './generic/SaveView';
import Project from '../types/project';

const HeaderElement = ({ item }) => <Typography variant="h2">{item.name}</Typography>;
const fieldNames = ['name', 'description', 'abbreviation'];

const ProjectUpdate = () => {
  return (
    <SaveView
      useItem={useProject}
      useSaveItem={useProjectSave}
      {...{ HeaderElement, fieldNames }}
    />
  );
};

HeaderElement.propTypes = {
  item: propTypes.shape(Project).isRequired,
};

export default ProjectUpdate;
