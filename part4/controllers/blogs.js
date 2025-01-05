const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  if (!request.user) return response.status(401).json({ error: 'Token missing or invalid' });

  const blog = new Blog({ ...request.body, user: request.user._id });
  const savedBlog = await blog.save();
  request.user.blogs = request.user.blogs.concat(savedBlog._id);
  await request.user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) return response.status(404).json({ error: 'Blog not found' });

  if (!request.user || blog.user.toString() !== request.user.id) {
    return response.status(401).json({ error: 'Unauthorized' });
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
