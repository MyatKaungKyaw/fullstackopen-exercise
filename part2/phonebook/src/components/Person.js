import React from "react"

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
  <table>
    <tbody>
      {props.persons.map(person => (
        <Person 
          key={person.name}
          removePerson={() => props.removePerson(person)}
          person={person}
        />
      ))}
    </tbody>
  </table>
)

const Person = props => (
  <tr>
    <td>
      <p key={props.person.name}>{props.person.name} {props.person.number}</p>
    </td>
    <td>
      <button onClick={props.removePerson}>delete</button>
    </td>
  </tr>
)

export {
  Filter,
  PersonForm,
  Persons,
}