const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;

  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  try {
    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    response.status(201).json(result);
  } catch (exception) {
    response.status(400).json({ error: exception.message });
  }
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;
    const userid = user.id;

    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() === userid.toString()) {
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } else {
      return response.status(401).json({
        error: "User not authorised to delete this blog",
      });
    }
  }
);

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user.id,
  };

  await Blog.findByIdAndUpdate(request.params.id, updatedBlog);
  response.status(204).end();
});

module.exports = blogsRouter;
