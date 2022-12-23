import axios from "axios";
import { useState, useEffect } from "react";
import { FaCloud, FaWind } from "react-icons/fa";
import { TbTemperature } from "react-icons/tb";

export const Weather = () => {
  const [converter, setConverter] = useState(false);
  const [ubication, setUbication] = useState({});
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(succes);
  }, []);

  const succes = (pos) => {
    const crd = pos.coords;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=d5903d29d5bfcfe84d3280c6d855306c`
      )
      .then((res) => {
        setUbication(res.data)
      });
  };
  
  const converterCelcius = ubication.main?.temp - 273.15;
  const celcius = parseInt(converterCelcius) + " °C";
  const converterFahrenheit = ((ubication.main?.temp - 273.15) * 9) / 5 + 32;
  const fahrenheit = parseInt(converterFahrenheit) + " °F";
  const picture = ubication?.weather?.[0].icon

  return (
    <div className="weather">
      <div className="weather__title">
        <h1>Wheater App</h1>
        <br />
      </div>
      <div className="weather__site">
        <h2>
          {ubication?.name}, {ubication.sys?.country}
        </h2>
      </div>
      <div className="weather__data">
        <div className="weather__data__picture">
          <img
            src={!!picture ? `http://openweathermap.org/img/wn/${picture}@2x.png` : null}
            alt=""
          />
          <p>
            <b>{!converter ? celcius : fahrenheit}</b>
          </p>
          <br />
        </div>
        <div className="weather__data__information">
          <div className="weather__data__information__subtitle">
            <p>"{ubication?.weather?.[0].description}"</p>
            <br />
          </div>
          <div className="weather__data__information__text">
            <p>
              <span>
                <FaWind />{" "}
              </span>
              <span>Wind speed:</span>
              <b> {ubication?.wind?.speed} m/s</b>
            </p>
            <br />
            <p>
              <span>
                <FaCloud />{" "}
              </span>
              <span>Clouds:</span>
              <b> {ubication?.clouds?.all}%</b>
            </p>
            <br />
            <p>
              <span>
                <TbTemperature />
              </span>
              <span>Pressure:</span>
              <b> {ubication?.main?.pressure} mb</b>
            </p>
            <br />
          </div>
        </div>
      </div>
      <div className="weather__converter">
        <button onClick={() => setConverter(!converter)}>
          Degrees {!converter ? "°F" : "°C"}
        </button>
      </div>
    </div>
  );
};
