import { useQuery } from 'react-query';

import request from './request';
import * as constants from '../../constants';
import { addMessage } from '../useMessages';
import replace from '../../string';

const getProjectIssues = async (key, id) => {
  const { data } = await request(replace(constants.PROJECT_ISSUES_URL, id), {
    method: 'get',
  });
  return data;
};

export default function useProjectIssues() {
  return useQuery('issues', getProjectIssues, {
    onError: () => {
      addMessage('Failed to fetch issues, please try again.', constants.MESSAGE_TYPE_ERROR);
    },
  });
}
