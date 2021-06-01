import React from 'react';
import { Typography } from '@material-ui/core';
import SaveView from './generic/SaveView';
import ProjectSelect from '../components/fields/ProjectSelect';
import { useSprint, useSprintSave } from '../hooks/api/useSprints';
import SprintSelect from '../components/fields/SprintSelect';
import StoryPointSelect from '../components/StoryPointSelect';

const IssueCreate = () => {
  const HeaderElement = () => <Typography variant="h2">Create Issue</Typography>;
  const fields = {
    name: {},
    project_id: {
      component: ProjectSelect,
    },
    sprint_id: {
      component: SprintSelect,
    },
    description: {},
    story_points: { component: StoryPointSelect },
  };

  return (
    <SaveView useItem={useSprint} useSaveItem={useSprintSave} {...{ HeaderElement, fields }} />
  );
};

export default IssueCreate;
