import cors from 'cors';
import config from '../config';
import auth from './auth';
import users from './users';
import posts from './posts';
import drafts from './drafts';
import comments from './comments';

export default (app) => {
  const corsOptions = {
    origin: config.origin,
  };
  app.options('*', cors(corsOptions));
  app.use(cors(corsOptions));
  app.use('/auth', auth);
  app.use('/users', users);
  app.use('/posts', posts);
  app.use('/drafts', drafts);
  app.use('/comments', comments);
};
