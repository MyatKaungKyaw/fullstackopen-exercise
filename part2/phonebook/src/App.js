import { useState } from 'react'

const Person = (props) => (
  <>
    <p>{props.person.name}</p>
  </>
)
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const isDuplicate = persons.find(val => val.name === newName)
    if(isDuplicate) {
      alert(`${newName} is already added to phonebook`)
      return;
    }
    setPersons(persons.concat({name:newName}))
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