import { useState } from 'react'

const Person = (props) => (
  <>
    <p>{props.person.name} {props.person.number}</p>
  </>
)
const App = () => {
  const [persons, setPersons] = useState([{ 
      name: 'Arto Hellas' ,
      number: '040-1234567',  
  }]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
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
    }))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map(person => 
        <Person key={person.name} person={person}/>
      )}
    </div>
  )
}

export default App