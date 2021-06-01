import React from 'react';
import { Typography } from '@material-ui/core';
import { useParams } from 'react-location';
import SaveView from './generic/SaveView';
import SprintSelect from '../components/fields/SprintSelect';
import StoryPointSelect from '../components/fields/StoryPointSelect';
import { useProject } from '../hooks/api/useProjects';
import { useIssue, useSaveIssue } from '../hooks/api/useIssues';

const IssueCreate = () => {
  const params = useParams();
  const { data = {} } = useProject(params.project_id, Boolean(params.project_id));
  const HeaderElement = () => <Typography variant="h2">Create Issue for {data.name}</Typography>;
  const fields = {
    name: {},
    sprint_id: {
      component: SprintSelect,
    },
    description: {},
    story_points: { component: StoryPointSelect },
  };

  return (
    <SaveView
      useItem={(id, enabled) => useIssue(id, params.id, enabled)}
      useSaveItem={() => useSaveIssue(params.project_id)}
      {...{ HeaderElement, fields }}
    />
  );
};

export default IssueCreate;
