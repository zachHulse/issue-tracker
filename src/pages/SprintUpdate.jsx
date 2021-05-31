import React from 'react';
import { Typography } from '@material-ui/core';
import * as propTypes from 'prop-types';
import { useSprint, useSprintSave } from '../hooks/api/useSprints';
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
    project_id: {
      component: ProjectSelect,
    },
    start: { type: 'date' },
    finish: { type: 'date' },
  };

  return (
    <SaveView useItem={useSprint} useSaveItem={useSprintSave} {...{ HeaderElement, fields }} />
  );
};

HeaderElement.propTypes = {
  item: propTypes.shape(Sprint).isRequired,
};

export default SprintUpdate;
