import { useQuery } from 'react-query';

import request from './request';
import * as constants from '../../constants';
import { addMessage } from '../useMessages';

const getProjects = async () => {
  const { data } = await request(constants.PROJECT_URL, {
    method: 'get',
  });
  return data;
};

export default function useProjects() {
  return useQuery('projects', getProjects, {
    onError: () => {
      addMessage('Failed to fetch projects, please try again.', constants.MESSAGE_TYPE_ERROR);
    },
  });
}
