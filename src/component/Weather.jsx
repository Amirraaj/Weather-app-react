import {React, useState, useEffect, useRef} from 'react';
import './weather.css';
import WeaterData from './WeatherData.json'
import { Search } from './Search';

export const Weather = () => {
    
    
    const[temperature, setTemperature] =useState();
    const[city, setCity] =useState();
    const lngLon = useRef();
    const urlAPI = "https://api.openweathermap.org/data/2.5/weather?appid=aeec17f963040d74edaa1cd417ca4088&units=metric";
    
    const getQuery = () => {
        let url = urlAPI
        if(city && city.trim() != ''){
            url = `${url}&q=${city.trim()}`
        }else if(lngLon.current){
            url = `${url}&lat=${lngLon.current.lat}&lon=${lngLon.current.lon}`
        } else {
            return null
        }

        return url
    }
    
    const getData = async() =>{
        const url = getQuery()
        if (url) {
            try{
                const response = await fetch(url);
                const data = await response.json();
                if (data.cod === '200'){
                    setTemperature (data);
                }
            
            }
            catch(e){
                console.log(e, "error detected");
            }
        }

        else{
            console.log("location undefined");
        }
        
    }
    useEffect(() => {
        getData();
        // setTemperature(WeaterData);
        
    },[])

    function searchCity(){
       getData();
    }
    
if(!temperature){
    return(
        <></>
    )
}
  return (
   <section className='weather-section'>
    <div className='container'>
       <Search 
       onChange={(value)=>setCity(value)}
            onSearch ={searchCity}
       />
        <div className='weather-icon'>
            <img className='icon' src={`http://openweathermap.org/img/wn/${temperature.weather[0].icon}@2x.png`} alt='icons' />
        </div>
        <div className='weather-details'>
            <h2 className='weather-data description'>{temperature.weather[0].main}</h2>
            <h1 className='weather-data temperature'>{temperature.main.temp}°C</h1>
            <h2 className='weather-data description'>{temperature.weather[0].description}</h2>
        </div>
        <div className='temperature-details'>
            <div className='temp max-temp'>
                <h3 className='temp-title'>Max-Temp</h3>
                <i className="fa-solid fa-temperature-high fa-temp"></i> 
                <h3 className='temp-value'>{temperature.main.temp}°C</h3> 
            </div>
            <div className='temp avg-temp'>
                <h3 className='temp-title'>Avg-Temp</h3>
                <i className="fa-solid fa-temperature-quarter fa-temp"></i> 
                <h3 className='temp-value'>{temperature.main.temp}°C</h3> 
            </div>
            <div className='temp min-temp'>
                <h3 className='temp-title'>Min-Temp</h3>
                <i className="fa-solid fa-temperature-low fa-temp"></i> 
                <h3 className='temp-value'>{temperature.main.temp}°C</h3> 
            </div>
        </div>
    </div>
   </section>
  )
}
