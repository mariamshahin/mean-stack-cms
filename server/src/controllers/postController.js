import Post from '../models/post';
import User from '../models/user';

import { checkId } from '../utils/utility';

export const createOne = (req, res, next) => {
  const { title, content, user_id } = req.body;
  if (checkId(user_id)) {
    User.findById(user_id)
      .then((user) => {
        if (!user) {
          const error = new Error('User not found.');
          error.statusCode = 404;
          throw error;
        }
        const post = new Post({
          title,
          content,
          user_id,
        });
        return post.save();
      })
      .then((result) => {
        res.status(200).json({
          message: 'Post created successfully!',
          postId: result._id,
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        res.status(err.statusCode).json({ error: err.message });
      });
  } else {
    res.status(422).json({ message: 'Invalid id' });
  }
};

export const getAll = async (req, res, next) => {
  try {
    const fetchedPosts = await Post.find();
    const posts = fetchedPosts.map((post) => {
      return {
        id: post._id,
        title: post.title,
        content: post.content,
      };
    });
    res.status(200).json({
      posts,
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    res.status(err.statusCode).json({ error: err.message });
  }
};

export const getOne = (req, res, next) => {
  const postId = req.params.id;
  if (checkId(postId)) {
    Post.findById(postId)
      .then((post) => {
        if (!post) {
          const error = new Error('Post not found.');
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json({ post });
      })
      .catch((error) => {
        console.log(error);
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        res.status(error.statusCode).json({ error });
      });
  } else {
    res.status(422).json({ message: 'Invalid id' });
  }
};

export const updateOne = (req, res, next) => {
  const { title, content, user_id } = req.body;
  const postId = req.params.id;
  if (checkId(postId)) {
    Post.findByIdAndUpdate(postId, { title, content, user_id })
      .then((post) => {
        console.log(post);
        if (!post) {
          const error = new Error('Post not found.');
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json({ message: 'Post updated successfully!' });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        res.status(error.statusCode).json({ error });
      });
  } else {
    res.status(422).json({ message: 'Invalid id' });
  }
};

export const deleteOne = (req, res, next) => {
  const postId = req.params.id;
  if (checkId(postId)) {
    Post.findByIdAndDelete(postId)
      .then((post) => {
        if (!post) {
          const error = new Error('Post not found.');
          error.statusCode = 404;
          throw error;
        }
        console.log(post);
        res.status(200).json({ message: 'Post deleted successfully!' });
      })
      .catch((error) => {
        console.log(error);
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        res.status(error.statusCode).json({ error });
      });
  } else {
    res.status(422).json({ message: 'Invalid id' });
  }
};
