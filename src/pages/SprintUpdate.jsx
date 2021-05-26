import React from 'react';
import { Typography } from '@material-ui/core';
import * as propTypes from 'prop-types';
import { useProject, useProjectSave } from '../hooks/api/useProjects';
import SaveView from './generic/SaveView';
import ProjectSelect from '../components/fields/ProjectSelect';
import Sprint from '../types/sprint';

const HeaderElement = ({ item }) => (
  <Typography variant="h2">
    Sprint {item?.start} - {item?.finish}
  </Typography>
);

const SprintUpdate = () => {
  const fields = {
    project: {
      component: ProjectSelect,
    },
    start: { type: 'date' },
    finish: { type: 'date' },
  };

  return (
    <SaveView useItem={useProject} useSaveItem={useProjectSave} {...{ HeaderElement, fields }} />
  );
};

HeaderElement.propTypes = {
  item: propTypes.shape(Sprint).isRequired,
};

export default SprintUpdate;
