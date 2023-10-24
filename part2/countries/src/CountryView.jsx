import axios from "axios";
import { useEffect, useState } from "react";

const CountryView = ({ countryObject }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const api_key = import.meta.env.VITE_SOME_KEY;
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${countryObject.capital[0]}&APPID=${api_key}`)
      .then(response => {
        setWeatherData(response.data);
      })
  }, [countryObject.capital]);

  return (
    <>
      <b><h2>{countryObject.name.common}</h2></b>
      <div>capital {countryObject.capital[0]}</div>
      <div>area {countryObject.area}</div>
      <h4>languages:</h4>
      <ul>
        {Object.values(countryObject.languages).map((lang, i) => <li key={i + 1}>{lang}</li>)}
      </ul>
      <img src={countryObject.flags.png} alt={countryObject.flags.alt} />
      <div>
        <h3>Weather in {countryObject.capital[0]}</h3>
        {weatherData && <>
          <div>temperature {(weatherData.main.temp - 273.15).toFixed(1)} Celcius</div>
          <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
          <div>wind {weatherData.wind.speed} m/s</div>
          </>}
      </div>
    </>
  );
};

export default CountryView;
