import React from 'react';
import { Typography } from '@material-ui/core';
import * as propTypes from 'prop-types';
import { useProject, useProjectSave } from '../hooks/api/useProjects';
import SaveView from './generic/SaveView';
import Project from '../types/project';

const HeaderElement = ({ project }) => <Typography variant="h2">{project.name}</Typography>;

const ProjectUpdate = () => {
  return <SaveView useItem={useProject} useSaveItem={useProjectSave} {...{ HeaderElement }} />;
};

HeaderElement.propTypes = {
  project: propTypes.shape(Project).isRequired,
};

export default ProjectUpdate;
