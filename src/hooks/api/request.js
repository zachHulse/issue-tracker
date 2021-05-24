import axios from 'axios';

import * as constants from '../../constants';

const request = async (urlPartial, init) => {
  const token = localStorage.getItem('token');
  const initial = { headers: {}, ...init };
  initial.headers.authorization = `bearer ${token}`;
  return axios({ url: constants.API_URL + urlPartial, ...initial });
};

export default request;
