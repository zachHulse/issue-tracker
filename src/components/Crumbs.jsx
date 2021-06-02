import React from 'react';
import { Link, useLocation } from 'react-location';
import { NavigateNext } from '@material-ui/icons';
import { Breadcrumbs, Typography } from '@material-ui/core';
import { title } from '../string';

const Crumbs = () => {
  const location = useLocation();
  const path = location?.current?.pathname;
  const partials = path.split('/').slice(1);
  return (
    <Breadcrumbs separator={<NavigateNext />}>
      {partials.map((part, index) => (
        <Link to={partials.slice(0, index + 1).join('/')}>
          <Typography variant="h5" color="textSecondary">
            {title(part)}
          </Typography>
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default Crumbs;
