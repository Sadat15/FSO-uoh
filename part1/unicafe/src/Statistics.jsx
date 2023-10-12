import StatisticLine from "./StatisticLine.jsx";

const Statistics = ({statsObject}) => {
  const { good, neutral, bad } = statsObject;

  const total = good + neutral + bad;

  const all = () => good + neutral + bad;
  const average = () => (good - bad) / total;
  const positive = () => (good/total)* 100 + " %";

  if(good === 0 && bad === 0 && neutral === 0) {
    return (
      <>
        <h2>statistics</h2>
        <div>No feedback given</div>
      </>
    )
  }

  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all()} />
          <StatisticLine text="average" value={average()} />
          <StatisticLine text="positive" value={positive()} />
        </tbody>
      </table>
      
    </>
  )
}

export default Statistics;