import { useQuery } from 'react-query';

import request from './request';
import * as constants from '../../constants';
import { addMessage } from '../useMessages';

const getIssues = async () => {
  const { data } = await request(constants.ISSUE_URL, {
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
