const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("the length of blog objects is correct", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
}, 100000);

test("the first blog is called React patterns", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].title).toEqual("React patterns");
}, 100000);

test("verifies unique identifier property is named id", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
}, 100000);

test("verifies that a post request successfully creates a new blog post", async () => {
  let blogs = await api.get("/api/blogs");
  const originalBlogsLength = blogs.body.length;

  const newBlog = {
    title: "Every Software Developer should write a blog",
    author: "Elchin Nasirov",
    url: "https://dev.to/nasirovelchin/every-software-developer-should-write-a-blog-4622",
    likes: 147,
  };

  await api.post("/api/blogs", newBlog);

  blogs = await api.get("/api/blogs");

  expect(blogs.body).toHaveLength(originalBlogsLength + 1);
}, 100000);

afterAll(async () => {
  await mongoose.connection.close();
});