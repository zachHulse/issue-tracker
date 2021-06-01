import { useMutation, useQuery, useQueryClient } from 'react-query';

import request from './request';
import * as constants from '../../constants';
import { addMessage } from '../useMessages';
import replace from '../../string';

const getIssues = async (projectId) => {
  const { data } = await request(replace(constants.ISSUE_URL, projectId), {
    method: 'get',
  });
  return data;
};

export function useIssues(projectId) {
  return useQuery('issues', () => getIssues(projectId), {
    onError: () => {
      addMessage('Failed to fetch issues, please try again.', constants.MESSAGE_TYPE_ERROR);
    },
  });
}

const getIssue = async (id, projectId) => {
  const { data } = await request(`${replace(constants.ISSUE_URL, projectId)}${id}/`, {
    method: 'get',
  });
  return data;
};

export function useIssue(id, projectId, enabled = true) {
  return useQuery(['issue', id], () => getIssue(id, projectId), {
    enabled,
    onError: () => {
      addMessage('Failed to fetch issue, please try again.', constants.MESSAGE_TYPE_ERROR);
    },
  });
}

const saveIssue = async (projectId, variables) => {
  let method = 'post';
  let url = replace(constants.ISSUE_URL, projectId);
  if (variables.id) {
    method = 'put';
    url += `${variables.id}/`;
  }
  const { data } = await request(url, {
    method,
    data: variables,
  });
  return data;
};

export function useSaveIssue(projectId) {
  const queryClient = useQueryClient();
  return useMutation((variables) => saveIssue(projectId, variables), {
    onSuccess: async (data) => {
      await queryClient.setQueryData(['issue', { id: data.id }], data);
      await queryClient.invalidateQueries('issues');
      addMessage(`Issue ${data.name} saved successfully`, constants.MESSAGE_TYPE_SUCCESS);
    },
    onError: () => {
      addMessage('Failed to save issue, please try again.', constants.MESSAGE_TYPE_ERROR);
    },
  });
}
