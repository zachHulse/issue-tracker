// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import * as constants from '../constants';
import projects from './mockData/projects';

const handlers = [
  rest.get(`${constants.API_URL}${constants.PROJECT_URL}`, async (req, res, ctx) => {
    return res(ctx.json(projects));
  }),
  rest.post(`${constants.API_URL}login/`, async (req, res, ctx) => {
    return res(ctx.json({ token: 'super_secret_code', isAdmin: true }));
  }),
];
export default handlers;
