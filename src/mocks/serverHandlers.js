// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import projects from './mockData/projects';
import { API_URL, PROJECT_URL } from '../constants';
import sprints from './mockData/sprints';
import issues from './mockData/issues';

const handlers = [
  rest.get(`${API_URL}${PROJECT_URL}`, async (req, res, ctx) => {
    return res(ctx.json(projects));
  }),
  rest.get(`${API_URL}/v1/:projectID/sprints`, async (req, res, ctx) => {
    const { projectID } = req.params;
    return res(ctx.json(sprints.filter((sprint) => sprint.project === Number(projectID))));
  }),
  rest.get(`${API_URL}/v1/:projectID/issues`, async (req, res, ctx) => {
    const { projectID } = req.params;
    return res(ctx.json(issues.filter((issue) => issue.project === Number(projectID))));
  }),
  rest.post(`${API_URL}login/`, async (req, res, ctx) => {
    return res(ctx.json({ token: 'super_secret_code', isAdmin: true }));
  }),
];
export default handlers;
