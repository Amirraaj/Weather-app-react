import React from 'react';
import './weather.css';


export const Weather = ({ data }) => {


    if (!data) {
        return (
            <></>
        )
    }
    return (
        <section className='weather-section'>
            <div className='container'>

                <div className='weather-icon'>
                    <img className='icon' src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt='icons' />
                </div>
                <div className='weather-details'>
                    <h2 className='weather-data description'>{data.weather[0].main}</h2>
                    <h1 className='weather-data temperature'>{data.main.temp}°C</h1>
                    <h2 className='weather-data description'>{data.weather[0].description}</h2>
                </div>
                <div className='temperature-details'>
                    <div className='temp max-temp'>
                        <h3 className='temp-title'>Max-Temp</h3>
                        <i className="fa-solid fa-temperature-high fa-temp"></i>
                        <h3 className='temp-value'>{data.main.temp}°C</h3>
                    </div>
                    <div className='temp avg-temp'>
                        <h3 className='temp-title'>Avg-Temp</h3>
                        <i className="fa-solid fa-temperature-quarter fa-temp"></i>
                        <h3 className='temp-value'>{data.main.temp}°C</h3>
                    </div>
                    <div className='temp min-temp'>
                        <h3 className='temp-title'>Min-Temp</h3>
                        <i className="fa-solid fa-temperature-low fa-temp"></i>
                        <h3 className='temp-value'>{data.main.temp}°C</h3>
                    </div>
                </div>
            </div>
        </section>
    )
}
