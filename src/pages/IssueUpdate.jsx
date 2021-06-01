import React from 'react';
import { Typography } from '@material-ui/core';
import * as propTypes from 'prop-types';
import { useSprint, useSprintSave } from '../hooks/api/useSprints';
import SaveView from './generic/SaveView';
import ProjectSelect from '../components/fields/ProjectSelect';
import Sprint from '../types/sprint';
import SprintSelect from '../components/fields/SprintSelect';

const HeaderElement = ({ item }) => <Typography variant="h2">Issue {item.name}</Typography>;

const SprintUpdate = () => {
  const fields = {
    name: {},
    project_id: {
      component: ProjectSelect,
    },
    sprint_id: {
      component: SprintSelect,
    },
    description: {},
    story_points: {},
  };

  return (
    <SaveView useItem={useSprint} useSaveItem={useSprintSave} {...{ HeaderElement, fields }} />
  );
};

HeaderElement.propTypes = {
  item: propTypes.shape(Sprint).isRequired,
};

export default SprintUpdate;
