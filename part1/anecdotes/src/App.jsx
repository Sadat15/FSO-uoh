import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  })

  const [mostVotes, setMostVotes] = useState(anecdotes[indexOfMax(Object.values(points))]);


  const handleClickNext = () => {
    const updatedSelected = Math.floor((Math.random() * (anecdotes.length - 1)));
    setSelected(updatedSelected);
  }

  const handleClickVotes = () => {
    setPoints((points) => {
      const copy = {...points};
      copy[selected]++;
      const updatedMostVotes = anecdotes[indexOfMax(Object.values(copy))];
      setMostVotes(updatedMostVotes);
      return copy;
    })

    
  }

  function indexOfMax(arr) { 
    let maxIndex = 0; 
    for (let i = 1; i < arr.length; i++) { 
        if (arr[i] > arr[maxIndex]) { 
            maxIndex = i; 
        } 
    } 
    return maxIndex; 
  }

  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>
        {anecdotes[selected]}
      </div>
      <div>has {points[selected]} votes</div>
      <button onClick={handleClickVotes}>vote</button>
      <button onClick={handleClickNext}>next anecdote</button>
      <h2>Anecdote with the most votes</h2>
      <div>{mostVotes}</div>
    </>
  )
}

export default App