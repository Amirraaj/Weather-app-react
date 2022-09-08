import {React, useState, useEffect} from 'react';
import './weather.css';

export const Weather = () => {
    
    const[temperature, setTemperature] =useState([]);

    const getData = async() =>{
        try{
            const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=28.3949&lon=84.1240&appid=aeec17f963040d74edaa1cd417ca4088");
            const data = await response.json();
            setTemperature (data);
            console.log(data)
        
        }
        catch(e){
            console.log(e, "error detected");
        }
    }
    useEffect(() => {
        getData();
        const myWeather = JSON.parse(WeatherObject);
    },[])
    

  return (
   <section className='weather-section'>
    {/* <h1 className='Location'>{temperature.name}</h1> */}
    <div className='container'>
        <div className='weather-icon'>
            
        <i className="fa-solid fa-cloud-rain fa-cs"></i>
        </div>
        <div className='weather-details'>
            <h2 className='weather-data weather-main'>{temperature.weather.main}</h2>
            <h1 className='weather-data temperature'>{temperature.main.temp}°F</h1>
            <h2 className='weather-data description'>{temperature.weather.description}</h2>
        </div>
        <div className='temperature-details'>
            <div className='temp max-temp'>
                <h3 className='temp-title'>Max-Temp</h3>
                <i className="fa-solid fa-temperature-high fa-temp"></i> 
                <h3 className='temp-value'>{temperature.main.temp}°F</h3> 
            </div>
            <div className='temp avg-temp'>
                <h3 className='temp-title'>Avg-Temp</h3>
                <i className="fa-solid fa-temperature-quarter fa-temp"></i> 
                <h3 className='temp-value'>{temperature.main.temp}°F</h3> 
            </div>
            <div className='temp min-temp'>
                <h3 className='temp-title'>Min-Temp</h3>
                <i className="fa-solid fa-temperature-low fa-temp"></i> 
                <h3 className='temp-value'>{temperature.main.temp}°F</h3> 
            </div>
        </div>
    </div>
   </section>
  )
}
