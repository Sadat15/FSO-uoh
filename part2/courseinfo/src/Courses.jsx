import Course from './Course.jsx';

const Courses = ({courses}) => {
  return <>
  <h1>Web development curriculum</h1>
  {courses.map(course => {
    return <Course key={course.id} course={course}/>
  })}
  </>
}

export default Courses;