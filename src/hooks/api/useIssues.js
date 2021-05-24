import { useQuery } from 'react-query';

import request from './request';
import * as constants from '../../constants';
import { addMessage } from '../useMessages';
import replace from '../../string';

const getIssues = async (key, id) => {
  const { data } = await request(replace(constants.ISSUE_URL, id), {
    method: 'get',
  });
  return data;
};

export default function useIssues() {
  return useQuery('issues', getIssues, {
    onError: () => {
      addMessage('Failed to fetch issues, please try again.', constants.MESSAGE_TYPE_ERROR);
    },
  });
}
