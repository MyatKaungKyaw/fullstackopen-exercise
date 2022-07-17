import { useState, useEffect } from 'react'
import personService from './services/persons'
import { Filter, PersonForm, Persons } from './components/Person'
import React from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const getAllPerson = () => {
    personService.getAll()
      .then(data => {
        console.log('%cApp.js line:49 response.data', 'color: #007acc;', data);
        setPersons(data)
      })
  }

  useEffect(() => {
    getAllPerson()
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const removePerson = person => {
    if (!window.confirm(`Delete ${person.name} ?`)) return

    personService
      .remove(person.id)
      .then(response => {
        console.log('%cApp.js line:35 response', 'color: #007acc;', response)
        getAllPerson();
      })
      .catch(console.error)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const duplicatePerson = persons.find(val => val.name === newName)
    if (duplicatePerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(duplicatePerson).then(updatePerson => {
          persons.reduce((pVal, cVal) => cVal.id === updatePerson.id ? pVal.concat(updatePerson) : pVal.concat(cVal),[])
        })
      }
      return
    }

    const person = {
      name: newName,
      number: newNumber,
    }

    personService
      .add(person)
      .then(returnPerson => {
        setPersons(persons.concat(returnPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(console.error)
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
      <Persons persons={personsToShow} removePerson={removePerson} />
    </div>
  )
}

export default App