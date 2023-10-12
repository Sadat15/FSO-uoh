import Feedback from './Feedback.jsx';
import Button from './Button.jsx';
import { useState } from 'react';
import Statistics from './Statistics.jsx';


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);


  const statsObject = {
    good,
    neutral,
    bad,
  }

  return (
    <div>
      <Feedback />
      <Button label={"good"} ev={() => setGood(good + 1)}/>
      <Button label={"neutral"} ev={() => setNeutral(neutral + 1)}/>
      <Button label={"bad"} ev={() => setBad(bad + 1)}/>
      <Statistics statsObject={statsObject} />
    </div>
  )
}

export default App;