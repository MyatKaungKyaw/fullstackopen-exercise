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
  if (props.countries.length === 0 || props.countries.length > 10) {
    return (
      <div >
        <p>Too many matches, specify another filter</p>
      </div >
    )
  }
  else if(props.countries.length > 1){
    return(
      <ul className={'multi-countries'}>
        {props.countries.map(country => 
          <li key={country.fifa}>
            <p className={'country-multi'}>{country.name.common}</p>
            <button  onClick={e => props.handleShowCtryOnClick(e, country.fifa)}>show</button>
            {props.showCtryDetail[country.fifa] === true ? <CountryDetail country={country}/> : null}
          </li>
        )}
      </ul>
    )
  }

  const country = props.countries[0];
  return(
    <CountryDetail country={country}/>
  )
}

const CountryDetail = ({country}) => (
  <div>
    <h2>{country.name.common}</h2>
    <p>
      capital {country.capital.reduce((pval, cval, index, arr)=> arr.length === index ? pval : `${pval}, ${cval}`)}<br/>
      area {country.area}
    </p>
    <h3>languages:</h3>
    <ul>
      {Object.getOwnPropertyNames(country.languages).map(lan => <li key={lan}>{country.languages[lan]}</li>)}
    </ul>
    <object type="image/svg+xml" data={country.flags.svg} className={'flag'}>flag</object>
  </div>
)

const App = () => {
  const [find, setFind] = useState('')
  const [countries, setCountries] = useState([])
  const [showCtryDetail, setShowCtryDetail] = useState({})

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  },[])

  const handleFindChange = (event) => {
    setFind(event.target.value.toString().trim())
    setShowCtryDetail({})
  }

  const handleShowCtryOnClick = (e, fifa) => {
    const objShowCtry = showCtryDetail.hasOwnProperty(fifa) 
    ? showCtryDetail
    : {...showCtryDetail, [fifa] : true}

    setShowCtryDetail(objShowCtry)
  }

  const foundCountries = find === '' 
  ? countries
  : countries.filter(country => country.name.common.toLowerCase().includes(find.toLowerCase()))

  // console.log(countries.reduce((pv,cv) => cv.independent === false ? pv.concat(cv.name.common) : pv,[]));
  console.log('%cApp.js line:64 foundCountries', 'color: #007acc;', foundCountries);

  return (
    <div>
      <FindCountries
        value={find}
        onChange={handleFindChange}
      />
      <ShowCountries
        countries={foundCountries}
        showCtryDetail={showCtryDetail}
        handleShowCtryOnClick={handleShowCtryOnClick}
      />
    </div>
  )
}
export default App;
