import { useMutation, useQuery, useQueryClient } from 'react-query';

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

export function useProjectIssues() {
  return useQuery('project_issues', getProjectIssues, {
    onError: () => {
      addMessage('Failed to fetch issues, please try again.', constants.MESSAGE_TYPE_ERROR);
    },
  });
}

const getSprintIssues = async (key, id) => {
  const { data } = await request(replace(constants.SPRINT_ISSUES_URL, id), {
    method: 'get',
  });
  return data;
};

export function useSprintIssues() {
  return useQuery('sprint_issues', getSprintIssues, {
    onError: () => {
      addMessage('Failed to fetch issues, please try again.', constants.MESSAGE_TYPE_ERROR);
    },
  });
}

const saveIssue = async (variables) => {
  let method = 'post';
  let url = constants.ISSUE_URL;
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

export function useSaveIssue() {
  const queryClient = useQueryClient();
  return useMutation(saveIssue, {
    onSuccess: async (data) => {
      await queryClient.setQueryData(['issue', { id: data.id }], data);
      await queryClient.invalidateQueries('project_issues');
      await queryClient.invalidateQueries('sprint_issues');
      addMessage(`Issue ${data.name} saved successfully`, constants.MESSAGE_TYPE_SUCCESS);
    },
    onError: () => {
      addMessage('Failed to save issue, please try again.', constants.MESSAGE_TYPE_ERROR);
    },
  });
}
