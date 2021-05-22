import { useMutation } from 'react-query';

import request from './request';
import * as constants from '../../constants';
import { addMessage } from '../useMessages';

const login = async (credentials) => {
  const { data } = await request(constants.LOGIN_URL, {
    method: 'post',
    data: credentials,
  });
  return data;
};

export default function useLogin() {
  return useMutation(login, {
    onSuccess: async (data, variables) => {
      await localStorage.setItem('token', data.token);
      await localStorage.setItem('email', variables.email);
    },
    onError: () => {
      addMessage('Login failed, please try again.', constants.MESSAGE_TYPE_ERROR);
    },
  });
}
