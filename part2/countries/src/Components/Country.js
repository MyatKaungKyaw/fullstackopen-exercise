import React from 'react'

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
      <div>
        <h2>{country.name.common}</h2>
        <CountryDetail country={country}/>
        <Weather weather={props.weather}/>
      </div>
    )
  }
  
  const CountryDetail = ({country}) => (
    <>
      <p>
        capital {country.capital.reduce((pval, cval, index, arr)=> arr.length === index ? pval : `${pval}, ${cval}`)}<br/>
        area {country.area}
      </p>
      <h4>languages:</h4>
      <ul>
        {Object.getOwnPropertyNames(country.languages).map(lan => <li key={lan}>{country.languages[lan]}</li>)}
      </ul>
      <object type="image/svg+xml" data={country.flags.svg} className={'flag'}>flag</object>
    </>
  )
  
  const Weather = ({weather}) => (
    <>
      <h4>Weather in {weather.city}</h4>
      <p>tempearature {weather.temp} Celcius</p>
      <img 
        className='weather-image' 
        src={weather.icon}
        alt='Current city weather condition'
      />
      <p>wind {weather.wind} m/s</p>
    </>
  )

export {FindCountries, ShowCountries}