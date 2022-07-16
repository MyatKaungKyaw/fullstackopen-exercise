import { useState, useEffect } from 'react'
import personService from './services/presons'

const Filter = (props) => (
  <>
    filter shown with <input
      onChange={props.handleChange}
      value={props.value}
    />
  </>
)

const PersonForm = (props) => (
  <form onSubmit={props.onSubmit}>
    <div>
      name: <input 
              onChange={props.handleNameChange} 
              value={props.name}
            />
    <div></div>
      number: <input
                onChange={props.handleNumberChange}
                value={props.number}
              />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = (props) => (
  <>
    {props.persons.map(person => (
      <p key={person.name}>{person.name} {person.number}</p>
    ))}
  </>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')
  const [filter, setFilter]=useState('')

  useEffect(() => {
    personService.getAll()
      .then(data => {
        console.log('%cApp.js line:49 response.data', 'color: #007acc;', data);
        setPersons(data)
      })
  },[])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) =>{
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const isDuplicate = persons.find(val => val.name === newName)
    if(isDuplicate) {
      alert(`${newName} is already added to phonebook`)
      return;
    }

    setPersons(persons.concat({
      name:newName,
      number:newNumber,
      id:persons[persons.length-1].id +1
    }))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = filter.trim() !== '' 
  ? persons.filter(p => p.name.toLowerCase() === filter.toLowerCase())
  : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        handleChange={handleFilterChange}
        value={filter}
      />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        name={newName}
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App