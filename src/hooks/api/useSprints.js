import { useMutation, useQuery, useQueryClient } from 'react-query';

import request from './request';
import * as constants from '../../constants';
import { addMessage } from '../useMessages';

const getSprints = async () => {
  const { data } = await request(constants.SPRINT_URL, {
    method: 'get',
  });
  return data;
};

export default function useSprints() {
  return useQuery('sprints', getSprints, {
    onError: () => {
      addMessage('Failed to fetch sprints, please try again.', constants.MESSAGE_TYPE_ERROR);
    },
  });
}

const getSprint = async (id) => {
  const { data } = await request(`${constants.SPRINT_URL}${id}/`, {
    method: 'get',
  });
  return data;
};

export function useSprint(id, enabled = true) {
  return useQuery(['sprint', id], () => getSprint(id), {
    enabled,
    onError: () => {
      addMessage('Failed to fetch sprint, please try again.', constants.MESSAGE_TYPE_ERROR);
    },
  });
}

const saveSprint = async (variables) => {
  let method = 'post';
  let url = constants.SPRINT_URL;
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

export function useSprintSave() {
  const queryClient = useQueryClient();
  return useMutation(saveSprint, {
    onSuccess: async (data) => {
      queryClient.setQueryData(['sprint', { id: data.id }], data);
      addMessage(`Sprint ${data.name} saved successfully`, constants.MESSAGE_TYPE_SUCCESS);
    },
    onError: () => {
      addMessage('Failed to fetch sprints, please try again.', constants.MESSAGE_TYPE_ERROR);
    },
  });
}
