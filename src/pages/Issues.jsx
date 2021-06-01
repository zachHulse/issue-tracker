import React from 'react';
import * as propTypes from 'prop-types';
import { useParams } from 'react-location';
import ListView from './generic/ListView';
import { useProject } from '../hooks/api/useProjects';
import StyledTableCell from '../components/StyledTableCell';
import Project from '../types/project';
import { useIssues } from '../hooks/api/useIssues';

const ProjectCell = ({ item }) => {
  const { data = {} } = useProject(item.project_id);
  return <StyledTableCell>{data.name}</StyledTableCell>;
};

const Issues = () => {
  const params = useParams();
  return (
    <ListView
      modelName="issue"
      displayKeys={['project', 'name', 'code', 'story_points']}
      formattedCells={{ project: ProjectCell }}
      useData={() => useIssues(params.project_id)}
    />
  );
};

ProjectCell.propTypes = {
  item: propTypes.shape(Project).isRequired,
};

export default Issues;
