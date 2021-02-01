import auth from './auth';
import users from './users';
import posts from './posts';
import drafts from './drafts';
import comments from './comments';

export default (app) => {
  const prefix = '/api';
  app.use(prefix + '/auth', auth);
  app.use(prefix + '/users', users);
  app.use(prefix + '/posts', posts);
  app.use(prefix + '/drafts', drafts);
  app.use(prefix + '/comments', comments);
};
