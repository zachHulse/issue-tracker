import { useMutation, useQuery, useQueryClient } from 'react-query';

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

const getProject = async (id) => {
  const { data } = await request(`${constants.PROJECT_URL}${id}/`, {
    method: 'get',
  });
  return data;
};

export function useProject(id, enabled = true) {
  return useQuery(['project', id], () => getProject(id), {
    enabled,
    onError: () => {
      addMessage('Failed to fetch project, please try again.', constants.MESSAGE_TYPE_ERROR);
    },
  });
}

const saveProject = async (variables) => {
  let method = 'post';
  let url = constants.PROJECT_URL;
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

export function useProjectSave() {
  const queryClient = useQueryClient();
  return useMutation(saveProject, {
    onSuccess: async (data) => {
      await queryClient.setQueryData(['project', { id: data.id }], data);
      await queryClient.invalidateQueries('projects');
      addMessage(`Project ${data.name} saved successfully`, constants.MESSAGE_TYPE_SUCCESS);
    },
    onError: () => {
      addMessage('Failed to fetch projects, please try again.', constants.MESSAGE_TYPE_ERROR);
    },
  });
}
