import React from 'react';
import * as propTypes from 'prop-types';
import { Link } from 'react-location';
import { FormatListBulleted } from '@material-ui/icons';
import useProjects from '../hooks/api/useProjects';
import ListView from './generic/ListView';
import Project from '../types/project';
import StyledTableCell from '../components/StyledTableCell';

const IssuesCell = ({ item }) => {
  return (
    <StyledTableCell>
      <Link to={`${item.id}/issues`}>
        <FormatListBulleted />
      </Link>
    </StyledTableCell>
  );
};

const Projects = () => {
  return (
    <ListView
      modelName="project"
      displayKeys={['name', 'description', 'issues']}
      formattedCells={{ issues: IssuesCell }}
      useData={useProjects}
    />
  );
};

IssuesCell.propTypes = {
  item: propTypes.shape(Project).isRequired,
};

export default Projects;
