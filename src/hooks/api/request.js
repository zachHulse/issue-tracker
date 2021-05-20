import axios from 'axios';

import * as constants from '../../constants';

export default async function request(urlPartial, init) {
  return axios({ url: constants.API_URL + urlPartial, ...init });
}
