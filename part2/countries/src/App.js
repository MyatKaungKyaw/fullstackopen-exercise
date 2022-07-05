import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
const FindCountries = (props) => (
  <div className={'find-countries'}>
    <p>find countries</p>
    <input
      value={props.value}
      onChange={props.onChange}
    />
  </div>
)

const ShowCountries = (props) => {
  if (props.countries.length = 0 || props.countries.length > 10) {
    return (
      < div >
        <p>Too many matches, specify another filter</p>
      </div >
    )
  }
  return(
    <div></div>
  )
}

const App = () => {
  const [find, setFind] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  },[])

  const handleFindChange = (event) => {
    setFind(event.target.value)
  }

  const foundCountries = countries

  return (
    <div>
      <FindCountries
        value={find}
        onChange={handleFindChange}
      />
      <ShowCountries
        countries={foundCountries}
      />
    </div>
  )
}
export default App;
