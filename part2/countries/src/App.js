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
  else if(props.countries.length > 1){
    <div>
      {props.countries.map(country => 
        <p key={country.fifa}>country.name.common</p>
      )}
    </div>
  }

  const country = props.country;
  return(
    <div>
      <h2>country.name.common</h2>
      <p>
        capital {country.capital.reduce((pval, cval, index, arr)=> arr.length === index ? pval : `${pval}, ${cval}`)}<br>
        area {country.area}
      </p>
      <h3>languages</h3>
    </div>
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
    setFind(event.target.value.toString().trim())
  }

  const foundCountries = find === '' 
  ? countries
  : countries.filter(country => country.name.common.includes(find))

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
