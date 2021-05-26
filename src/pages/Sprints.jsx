import React from 'react';
import useSprints from '../hooks/api/useSprints';
import ListView from './generic/ListView';

const Sprints = () => {
  return (
    <ListView
      modelName="sprint"
      displayKeys={['project', 'start', 'finish']}
      useData={useSprints}
    />
  );
};

export default Sprints;
