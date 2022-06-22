import { useState } from 'react'

const Button = (props) =>(
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Anecdote = (props) =>(
  <>
    <h1>{props.header}</h1>
    <p>
      {props.anecdote}<br/>
      has {props.point} votes
    </p>

  </>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const getRandomSelected = () => Math.floor(Math.random() * anecdotes.length)

  const [selected, setSelected] = useState(getRandomSelected)
  const [points,setPoints]=useState(new Array(anecdotes.length).fill(0))
  
  const getRandomAncdotes = () => {
    let randomSelected = getRandomSelected()
    while(selected === randomSelected){
      randomSelected = getRandomSelected()
    }
    setSelected(randomSelected)
  }
  
  const handleVote = () =>{
    const cpyPoints = [...points]
    cpyPoints[selected] += 1
    setPoints(cpyPoints)
  }

  const getMostPointIndex = () => (
    points.reduce((preVal, crntVal, index) => preVal[1] > crntVal ? preVal : [index,crntVal],[-1,-1])[0]
  )

  const getMostPointAnecdotes = () => {
    const index=getMostPointIndex()
    if(points[index] === 0){
      return 'No most voted anecdote yet'
    }
    return anecdotes[index]
  }

  console.log(getMostPointIndex())


  return (
    <div>
      <Anecdote
        header={'Anecdote of the day'}
        anecdote={anecdotes[selected]}
        point={points[selected]}
      />
      <div>
        <Button
          handleClick={handleVote}
          text={'vote'}
        />
        <Button 
          handleClick={getRandomAncdotes}
          text={'next anecdote'}
        />
      </div>
      <Anecdote
        header={'Anecdote with most votes'}
        anecdote={getMostPointAnecdotes()}
        point={points[getMostPointIndex()]}
      />
    </div>
  )
}

export default App