
import { React, useState, useEffect, useRef } from 'react';
import { Weather } from '../weather/Weather';
import './sideContainer.css'
import { Search } from '../search/Search';

const SideContainer = () => {
    const [temperature, setTemperature] = useState();
    const [city, setCity] = useState();
    const [myLocation, setMyLocation] = useState({});
    const [myloading, setMyLoading] = useState(false);
    const lngLon = useRef();
    const urlAPI = "https://api.openweathermap.org/data/2.5/weather?appid=8df670774bf2ce5c6289be595e3682e9&units=metric";

    const getQuery = () => {
        let url = urlAPI
        if (city && city.trim() != '') {
            url = `${url}&q=${city.trim()}`
        } else if (lngLon.current) {
            url = `${url}&lat=${lngLon.current.lat}&lon=${lngLon.current.lon}`
        } else {
            return null;
        }
        return url
    }

    useEffect(() => {
        initalizeLocation();

    }, [])
    const getData = async () => {
        setMyLoading(true);
        setTimeout(function () {
            setMyLoading(false)
        }, 500)
        const url = getQuery()
        if (url) {
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (data.cod === 200) {
                    setTemperature(data);
                }

            }
            catch (e) {
                console.log(e, "error detected");
            }
        }

        else {
            console.log('initislize location')

            if (Object.keys(myLocation).length > 0) {

                const currentlocationUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${myLocation.latitude}&lon=${myLocation.longitude}&appid=8df670774bf2ce5c6289be595e3682e9&units=metric`;
                try {
                    const response = await fetch(currentlocationUrl);
                    const data = await response.json();
                    if (data.cod === 200) {
                        setTemperature(data);
                    }

                }
                catch (e) {
                    console.log(e, "error detected");
                }
            }

        }

    }

    useEffect(() => {
        getData();
    }, [myLocation])


    function searchCity() {
        getData();

    }

    function initalizeLocation() {
        navigator.geolocation.getCurrentPosition(function (position) {
            setMyLocation(() => ({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }))

        });
    }

    const noNameMatched = () =>{
        return (
            <div className='no-data-found'>
            </div>
        )
    }

    if (myloading) {
        return (
            <div >
                {/* loader section  */}
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>

            </div>
        )
    }

    return (
        <section className='main-container'>
            <div className='left-container'>
                <div className='nav-section'>
                    <h1 className='nav-title'>My Weather</h1>
                    <div className="current-location">
                        <div className="location-title">
                            <i class="fa-solid fa-location-dot"></i>
                            <h2 className="location-text">Current Location</h2>
                        </div>
                        <h2 className="data-from-api">{temperature && temperature.name}</h2>
                    </div>
                </div>
                <div className="opacati-controller"></div>

                <div className='center-container'>
                    <h1 className='center-container-title'>The Only Weather Forecast You Need</h1>
                    <Search
                        onChange={(value) => setCity(value)}
                        onSearch={searchCity}
                    />
                </div>
            </div>
            <div className='right-container'>
                <Weather
                    data={temperature}
                />
            </div>

        </section>

    )
}

export default SideContainer