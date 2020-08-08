import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const appid = process.env.REACT_APP_WEATHER_KEY;
  const [temp, setTemp] = useState(0);
  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lang=pt_br&appid=${appid}&lat=${latitude}&lon=${longitude}`)
        .then((response) => response.json()).then((jsonData) => {
          console.log(jsonData);
          setName(jsonData.name);

          const { temp, temp_min, temp_max } = jsonData.main;
          setTemp(temp);
          setMinTemp(temp_min);
          setMaxTemp(temp_max);

          const { description, icon } = jsonData.weather[0];
          setDescription(description);
          setIcon(icon);

        }).catch(error => {
          console.error(error);
        });
    });
  }, []);

  return (
    <div className="App">
      <div className="weather-search">
        <p>search</p>
      </div>
      <div className="weather-status">
        <div className="weather-name">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
        <div className="weather-show">
          <div className="weather-icon">
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
            <h2>{temp}</h2>
          </div>
          <div className="weather-minmax">
            <p>{`${minTemp}°`}</p>
            <p>{`${maxTemp}°`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
