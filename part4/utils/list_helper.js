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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
