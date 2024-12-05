import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherDetails from './components/WeatherDetails';
import CapitalList from './components/CapitalList';
import './App.css';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([])
  const apiKey = 'b326210c48db9451b04eac802d63454d';

  const handleSearch = (city, state, country) => {
    let query = `${city},${country}`;
    if (state) {
      query = `${city},${state},${country}`;
    }

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`) 
    .then((response) => { 
      const data = response.data; 
      const stateCode = state ? `${state}-` : ''; 
      setWeather({ 
        city: data.name, 
        state: state, 
        country: data.sys.country, 
        temp: data.main.temp, 
        condition: data.weather[0].description, 
        min: data.main.temp_min, 
        max: data.main.temp_max, 
        feels_like: data.main.feels_like, 
        wind: data.wind.speed, 
        humidity: data.main.humidity, 
        formattedCity: `${data.name}, ${stateCode}${data.sys.country}` 
      });
      return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=${apiKey}`); }) 
      .then((response) => { 
        const forecastData = []; 
        response.data.list.forEach((item) => { 
          const date = new Date(item.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'short' }); 
          const existingDay = forecastData.find(day => day.date === date); 
          if (existingDay) { 
            existingDay.temps.push(item.main.temp); 
          } else { 
            forecastData.push({ date: date, temps: [item.main.temp] }); 
          } 
        }); 
        const finalForecast = forecastData.map(day => ({ 
          date: day.date, 
          min: Math.min(...day.temps), 
          max: Math.max(...day.temps) 
        })); setForecast(finalForecast); 
      }) 
      .catch((error) => { 
        console.error("Erro ao buscar os dados do tempo:", error); 
      });
    }

    const capitals = [
      { name: "Rio de Janeiro", min: 18, max: 27},
      { name: "São Paulo", min: 14, max: 22},
      { name: "Belo Horizonte", min: 21, max: 32},
      { name: "Brasília", min: 24, max: 37},
      { name: "Belém", min: 24, max: 37},
      { name: "Salvador", min: 23, max: 37},
      { name: "Curitiba", min: 5, max: 14},
      { name: "Fortaleza", min: 21, max: 32},
      { name: "Manaus", min: 24, max: 37},
      { name: "João Pessoa", min: 28, max: 40},
    ]
      return (
        <div className="app">
          <header className="header">
            <h1>Previsão do tempo</h1>
          </header>
          <main>
            <SearchBar onSearch={handleSearch} />
            <WeatherDetails weather={weather} forecast={forecast} />
            <div className='line'></div>
            <CapitalList capitals={capitals}/>
          </main>

        </div>
      );
    };

    export default App;
