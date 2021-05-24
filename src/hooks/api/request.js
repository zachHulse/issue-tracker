import axios from 'axios';

import * as constants from '../../constants';

const request = async (urlPartial, init) => {
  const token = localStorage.getItem('token');
  const initial = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...init,
  };
  initial.headers.Authorization = `bearer ${token}`;
  return axios({ url: constants.API_URL + urlPartial, ...initial });
};

export default request;
