import { useState, useEffect } from 'react'
import personService from './services/persons'
import { Filter, PersonForm, Persons } from './components/Person'
import React from 'react'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errMessage, setErrMessage] = useState(null)

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

    if (newName.trim() === '' || newNumber.trim() === '') return

    setNewName(newName.trim())
    setNewNumber(newNumber.trim())

    const person = {
      name: newName,
      number: newNumber,
    }

    const duplicatePerson = persons.find(val => val.name === person.name)
    if (duplicatePerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(duplicatePerson.id, person)
          .then(updatePerson => {
            setPersons(persons.reduce((pVal, cVal) => cVal.id === updatePerson.id ? pVal.concat(updatePerson) : pVal.concat(cVal), []))
            showMessage(`${updatePerson.name}'s number was changed to ${updatePerson.number}`)
          })
          .catch(err => {
            setPersons(persons.filter(prsn => prsn.id !== duplicatePerson.id))
            showErrMessage(`Information of ${duplicatePerson.name} has already been removed from server`)
            console.error('%cApp.js line:76 err : ', 'color: #007acc;', err);
          })
        }
      setNewName('')
      setNewNumber('')
      return
    }

    personService
      .add(person)
      .then(returnPerson => {
        setPersons(persons.concat(returnPerson))
        setNewName('')
        setNewNumber('')
        showMessage(`Added ${returnPerson.name}`)
      })
      .catch(console.error)
  }

  const showMessage = message => {
    setMessage(message)
    setTimeout(() => setMessage(null), 3000)
  }

  const showErrMessage = message => {
    setErrMessage(message)
    setTimeout(() => setErrMessage(null), 3000)
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
      <Notification.Info message={message} />
      <Notification.Error message={errMessage} />
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