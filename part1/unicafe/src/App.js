import { useState } from 'react'

const Header = (props) => {
  switch (props.level.toUpperCase()) {
    case 'H1':
      return (<h1>{props.text}</h1>);
    case 'H2':
      return (<h2>{props.text}</h2>);
    case 'H3':
      return (<h3>{props.text}</h3>);
    case 'H4':
      return (<h4>{props.text}</h4>);
    case 'H5':
      return (<h5>{props.text}</h5>);
    default:
      return (<h6>{props.text}</h6>);
  }
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = ({ text,value }) =>( 
  <p>{text} {value}</p>
)

const Statistics = (props) => {
  if(props.good === 0 && props.neutral ===0 && props.bad===0){
    return(
      <>
        <Header level={'h2'} text={'statistics'}/>
        <p>No feedback given</p>
      </>
    )
  }

  const all = props.good + props.neutral + props.bad || 0
  const positive = ((props.good/all)*100 || 0) + '%'
  const average = (props.good - props.bad) / all || 0

  return (
    <>
      <Header level={'h2'} text={'statistics'}/>
      <StatisticLine text='good' value={props.good}/>
      <StatisticLine text={'neutral'} value={props.neutral}/>
      <StatisticLine text={'bad'} value={props.bad} />
      <StatisticLine text={'all'} value={all} />
      <StatisticLine text={'average'} value={average} />
      <StatisticLine text={'positive'} value={positive} />
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <Header level={'h1'} text={'give feedback'}/>
      <Button
        text='good'
        handleClick={() => setGood(good + 1)}
      />
      <Button 
        text='netural' 
        handleClick={() => setNeutral(neutral + 1)} 
      />
      <Button
        text='bad'
        handleClick={() => setBad(bad + 1)} 
      />
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App