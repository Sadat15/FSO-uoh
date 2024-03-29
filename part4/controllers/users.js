const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");

  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  try {
    const { username, name, password } = request.body;
    if (!password) {
      return response.status(400).json({ error: "password missing" });
    } else if (password.length < 3) {
      return response
        .status(400)
        .json({ error: "password needs to be at least 3 characters long" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (e) {
    if (e.name === "ValidationError") {
      response.status(400).json({ error: e.message });
    }
  }
});

module.exports = usersRouter;
