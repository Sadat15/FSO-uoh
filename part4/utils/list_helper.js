const logger = require("./logger");
const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, val) => (acc += val.likes), 0);
};

const favouriteBlog = (blogs) => {
  let favourite = blogs[0];

  for (let i = 1; i < blogs.length; i++) {
    if (favourite.likes < blogs[i].likes) {
      favourite = blogs[i];
    }
  }

  return favourite;
};

const mostBlogs = (blogs) => {
  const mostBlogsObject = _.countBy(blogs, "author");

  const maxEntry = _.maxBy(_.toPairs(mostBlogsObject), (pair) => pair[1]);

  return {
    author: maxEntry[0],
    blogs: maxEntry[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
};
