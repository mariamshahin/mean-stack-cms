import auth from './auth';
import users from './users';
import posts from './posts';
import drafts from './drafts';
import comments from './comments';

export default (app) => {
  app.use('/auth', auth);
  app.use('/users', users);
  app.use('/posts', posts);
  app.use('/drafts', drafts);
  app.use('/comments', comments);
};
