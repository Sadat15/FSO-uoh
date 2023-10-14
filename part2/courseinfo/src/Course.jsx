const Course = ({course}) => {
  const header = course.name;
  const parts = course.parts;
  const totalExercises = parts.reduce((a, part, currentI) => a + parts[currentI].exercises, 0)


  return <>
  <h2>{header}</h2>
  {parts.map(part => <div key={part.id}>{part.name} {part.exercises}</div>)}
  <b><div>total of {totalExercises} exercises</div></b>
  </>
}

export default Course;