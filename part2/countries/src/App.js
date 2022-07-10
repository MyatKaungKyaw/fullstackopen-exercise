import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import { FindCountries, ShowCountries} from './Components/Country'

const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY

const App = () => {
  const [find, setFind] = useState('')
  const [allCtry, setAllCtry] = useState([])
  const [foundCtry, setFoundCtry] = useState([])
  const [showCtryDetail, setShowCtryDetail] = useState({})
  // const [weatherCtys, setWeatherCtys] = useState([])
  const [weather, setWeather]=useState([])

  useEffect(() => {
    console.log('[]');
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setAllCtry(response.data))
  },[])

  useEffect(() => {
    console.log('find');
    const ctrys = allCtry.filter(country => country.name.common.toLowerCase().includes(find.toLowerCase()))
    setFoundCtry(ctrys)
  },[find,allCtry])

  useEffect(() => {
    console.log('foundCtry');
    if(foundCtry.length !== 1) return
    
    const capitalLatLng = foundCtry[0].capitalInfo.latlng
    console.log('%cApp.js line:94 capitalLatLng', 'color: #007acc;', capitalLatLng);
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${capitalLatLng['0']}&lon=${capitalLatLng['1']}&appid=${weather_api_key}&units=metric`)
      .then(response => {
        const data  = response.data
        setWeather({
          city: foundCtry[0].capital['0'],
          temp: data.main.temp,
          wind: data.wind.speed,
          icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        })
      })
      .catch(err => console.error(err))
  },[foundCtry])

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

  console.log('%cApp.js line:105 weather', 'color: #007acc;', weather);

  // console.log(countries.reduce((pv,cv) => cv.independent === false ? pv.concat(cv.name.common) : pv,[]));
  console.log('%cApp.js line:64 foundCtry', 'color: #007acc;', foundCtry);
  
  return (
    <div>
      <FindCountries
        value={find}
        onChange={handleFindChange}
      />
      <ShowCountries
        countries={foundCtry}
        showCtryDetail={showCtryDetail}
        handleShowCtryOnClick={handleShowCtryOnClick}
        weather={weather}
      />
    </div>
  )
}
export default App;
