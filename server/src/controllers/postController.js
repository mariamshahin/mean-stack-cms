import Post from '../models/post';
import User from '../models/user';

import PostService from '../services/PostService';

const postService = new PostService(Post);

export const createOne = async (req, res) => {
  const { result, error } = await postService.createPost(req.body);
  if (result) {
    return res.status(200).json({
      message: 'Post created successfully!',
      data: result,
    });
  }
  return res.status(500).json({ error: error.message });
};

export const getAll = async (req, res) => {
  const { result, error } = await postService.getAllPosts();
  if (result) {
    return res.status(200).json({
      data: result,
    });
  }
  return res.status(500).json({ error: error.message });
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  const { result, error } = await postService.getPost(id);
  if (!result) {
    return res.status(404).json({
      message: 'Post not found.',
    });
  }
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json({
    data: result,
  });
};

export const updateOne = async (req, res) => {
  const { result, error } = await postService.updatePost(req.body);
  if (!result) {
    return res.status(404).json({
      message: 'Post not found.',
    });
  }
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json({
    message: 'Post updated successfully!',
  });
};

export const deleteOne = async (req, res) => {
  const { id } = req.params;
  const { result, error } = await postService.deletePost(id);
  if (!result) {
    return res.status(404).json({
      message: 'Post not found.',
    });
  }
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json({
    message: 'Post deleted successfully!',
  });
};
