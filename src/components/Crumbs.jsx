import React from 'react';
import { Link, useLocation } from 'react-location';
import { NavigateNext } from '@material-ui/icons';
import { Breadcrumbs } from '@material-ui/core';

const Crumbs = () => {
  const location = useLocation();
  const path = location?.current?.pathname;
  const partials = path.split('/').slice(1);
  return (
    <Breadcrumbs separator={<NavigateNext />}>
      {partials.map((part, index) => (
        <Link to={partials.slice(0, index + 1).join('/')}>{part}</Link>
      ))}
    </Breadcrumbs>
  );
};

export default Crumbs;
