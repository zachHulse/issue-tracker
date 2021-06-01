import { useMutation, useQuery, useQueryClient } from 'react-query';

import request from './request';
import * as constants from '../../constants';
import { addMessage } from '../useMessages';
import replace from '../../string';

const getSprints = async (projectId) => {
  const { data } = await request(replace(constants.SPRINT_URL, projectId), {
    method: 'get',
  });
  return data;
};

export default function useSprints(projectId) {
  return useQuery('sprints', () => getSprints(projectId), {
    onError: () => {
      addMessage('Failed to fetch sprints, please try again.', constants.MESSAGE_TYPE_ERROR);
    },
  });
}

const getSprint = async (id, projectId) => {
  const { data } = await request(`${replace(constants.SPRINT_URL, projectId)}${id}/`, {
    method: 'get',
  });
  return data;
};

export function useSprint(id, projectId, enabled = true) {
  return useQuery(['sprint', id], () => getSprint(id, projectId), {
    enabled,
    onError: () => {
      addMessage('Failed to fetch sprint, please try again.', constants.MESSAGE_TYPE_ERROR);
    },
  });
}

const saveSprint = async (projectId, variables) => {
  let method = 'post';
  let url = replace(constants.SPRINT_URL, projectId);
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

export function useSprintSave(projectId) {
  const queryClient = useQueryClient();
  return useMutation((variables) => saveSprint(projectId, variables), {
    onSuccess: async (data) => {
      await queryClient.setQueryData(['sprint', { id: data.id }], data);
      await queryClient.invalidateQueries('sprints');
      addMessage(
        `Sprint ${data.start} - ${data.finish} saved successfully`,
        constants.MESSAGE_TYPE_SUCCESS,
      );
    },
    onError: () => {
      addMessage('Failed to fetch sprints, please try again.', constants.MESSAGE_TYPE_ERROR);
    },
  });
}
