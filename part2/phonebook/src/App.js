import { useState } from 'react'

const Filter = (props) => (
  <input
    onChange={props.handleChange}
    value={props.value}
  />
)

const PersonForm = (props) => (
  <form onSubmit={props.onSubmit}>
    <div>
      name: <input 
              onChange={props.handleNameChange} 
              value={props.newName}
            />
    <div></div>
      number: <input
                onChange={props.handleNumberChange}
                value={props.newNumber}
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')
  const [filter, setFilter]=useState('')

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
  }

  const personsToShow = filter.trim() !== '' 
  ? persons.filter(p => p.name === filter.toLowerCase())
  : persons

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with<input
                          onChange={handleFilterChange}
                          value={filter}
                        />
      <h3>add a new</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
                  onChange={handleNameChange} 
                  value={newName}
                />
        <div></div>
          number: <input
                    onChange={handleNumberChange}
                    value={newNumber}
                  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => 
        <Person key={person.name} person={person}/>
      )}
    </div>
  )
}

export default App