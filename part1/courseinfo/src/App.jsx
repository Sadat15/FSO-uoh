import Header from './Header.jsx';
import Content from './Content.jsx';
import Total from './Total.jsx';

const App = () => {
  const course = 'Half Stack application development';

  const parts = [{part: 'Fundamentals of React'}, {part: 'Using props to pass data'}, {part: 'State of a component'}];
  const exercises = [{exercise: 10}, {exercise: 7}, {exercise: 14}];

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} exercises={exercises} />
      <Total exercises={exercises}/>
    </div>
  )
}

export default App