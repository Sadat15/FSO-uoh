function Total({exercises}) {
  let total = 0;
  for(const ex of exercises) {
    total += ex.exercise;
  }

  return <p>Number of exercises {total}</p>;
}

export default Total;