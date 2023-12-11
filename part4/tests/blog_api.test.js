const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");

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

describe("blog testing", () => {
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

    await api.post("/api/blogs").send(newBlog).expect(201);

    blogs = await api.get("/api/blogs");

    expect(blogs.body).toHaveLength(originalBlogsLength + 1);
  }, 100000);

  test("verifies that if likes property is missing, will default the value to 0", async () => {
    const newBlog = {
      title: "Back-End & Web Development Trends For 2024",
      author: "Kostya Stepanov",
      url: "https://medium.com/ux-planet/back-end-web-development-trends-for-2024-04cc14bb43cb",
    };
    await api.post("/api/blogs").send(newBlog).expect(201);
    let blogs = await api.get("/api/blogs");
    blogs = blogs.body;

    expect(blogs[blogs.length - 1].likes).toEqual(0);
  }, 100000);

  test("verifies that if title is missing, response is a 400 bad request", async () => {
    const newBlog = {
      title: "",
      author: "Fresh Frontend Links",
      url: "https://medium.com/@frontender-ua/frontend-weekly-digest-338-20-26-november-2023-0391292f6e58",
      likes: 52,
    };
    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogs = await api.get("/api/blogs");

    expect(blogs.body).toHaveLength(initialBlogs.length);
  }, 100000);

  test("verifies that delete request works", async () => {
    const blogsAtStart = await api.get("/api/blogs");
    const body = blogsAtStart.body;

    const blogToDelete = body[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await api.get("/api/blogs");

    expect(blogsAtEnd.body).toHaveLength(initialBlogs.length - 1);

    const urls = blogsAtEnd.body.map((el) => el.url);

    expect(urls).not.toContain(blogToDelete.url);
  });

  test("Verifies that the number of likes is updated correctly", async () => {
    const blogsAtStart = await api.get("/api/blogs");
    const body = blogsAtStart.body;

    const blogToUpdate = body[0];

    const updatedBlog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 10,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(204);

    const blogsAtEnd = await api.get("/api/blogs");
    const bodyAtEnd = blogsAtEnd.body;

    expect(bodyAtEnd[0].likes).toEqual(10);
  }, 100000);
});

describe("user testing", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("verifies that user database has one user", async () => {
    const users = await api.get("/api/users");

    expect(users.body).toHaveLength(1);
  });

  test("verifies that a post request successfully creates a new user", async () => {
    const users = await api.get("/api/users");

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const updatedUsers = await api.get("/api/users");

    expect(updatedUsers.body).toHaveLength(users.body.length + 1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
