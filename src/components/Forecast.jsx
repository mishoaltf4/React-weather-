import React, { useState } from "react"
import './forecast.scss'
import { useEffect } from "react";

 function Forecast({weather, theme}){
    console.log(weather.forecast.forecastday)
    const forecastDays = weather.forecast.forecastday.slice(-5);
    const today = forecastDays[0].hour.slice(-5);

    const [datePart, timePart] = weather.location.localtime.split(" ")
    const currentDate = new Date(datePart);
    
    const weekDay = currentDate.toLocaleDateString('en-US', {weekday: 'long'})
    const month = currentDate.toLocaleDateString('en-US', {month: 'short'})
    
    const currentCode = weather.current.condition.code;
    const [currentCodeImg, setCurrentCodeImg] = useState("");

    useEffect(() => {
        switch(currentCode){
            case 1000:
                setCurrentCodeImg("../../public/weatherIMG/1.png");
                break;
            case 1003:
                setCurrentCodeImg("../../public/weatherIMG/2.png");
                break;
            case 1117:
                setCurrentCodeImg("../../public/weatherIMG/4.png");
                break;
            case 1087:
                setCurrentCodeImg("../../public/weatherIMG/3.png");
            case 1006:
                setCurrentCodeImg("../../public/weatherIMG/5.png");
                break;
            default:
                setCurrentCodeImg(weather.current.condition.icon)
        }

    }, [])
    return(
        <>
            <div className={`forecast ${theme === "dark" ? "dark-mode" : ""}`}>
                <div className="container">
                    <div className="forecast-inner">
                        <div className={`forecast-inner__today ${theme === "dark" ? "dark-mode" : ""}`}>
                            <div className="forecast-today__time">
                                <div className="forecast-time__city">
                                    <h1>{weather.location.name}</h1>
                                </div>
                                <div className="forecast-time__time">
                                    <h1>{timePart}</h1>
                                    <p>{weekDay}, {currentDate.getDate()} {month}</p>
                                </div>
                            </div>
                            <div className="forecast-today__weather">
                                <div className="forecast-weather__temp">
                                    <div className="forecast-temp__temp">
                                        <h1>{weather.current.temp_c}°C</h1>
                                        <p>Feels like: {weather.current.feelslike_c}°C</p>
                                    </div>
                                    <div className="forecast-temp__sun">
                                        <div className="forecast-sun__box">
                                            <img src="../../public/sunrise.png" alt="" />
                                            <p>sunrise</p>
                                            <p>{weather.forecast.forecastday[0].astro.sunrise}</p>
                                        </div>
                                        <div className="forecast-sun__box">
                                            <img src="../../public/sunset.png" alt="" />
                                            <p>sunset</p>
                                            <p>{weather.forecast.forecastday[0].astro.sunset}</p></div>
                                    </div>
                                </div>
                                <div className="forecast-weather__weather">
                                    <img src={currentCodeImg} alt="" />
                                   
                                    <h1>{weather.current.condition.text}</h1>
                                </div>
                                <div className="forecast-weather__wind">
                                    <div className="forecast-wind__box">
                                        <img src="../../public/humidity.png" alt="" />
                                        <h3>{weather.current.humidity}</h3>
                                        <p>humandity</p>
                                    </div>
                                    <div className="forecast-wind__box">
                                        <img src="../../public/wind.png" alt="" />
                                        <h3>{weather.current.wind_kph}</h3>
                                        <p>wind speed</p>
                                    </div>
                                    <div className="forecast-wind__box">
                                        <img src="../../public/pressure.png" alt="" />
                                        <h3>{weather.current.pressure_mb}</h3>
                                        <p>pressure</p>
                                    </div>
                                    <div className="forecast-wind__box">
                                        <img src="../../public/uv.png" alt="" />
                                        <h3>{weather.current.uv}</h3>
                                        <p>uv</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`forecast-inner__forecast ${theme === "dark" ? "dark-mode" : ""}`}>
                            <div className="forecast-forecast__days">
                                <h1>{forecastDays.length} days forecast</h1>
                                <div className="foreacst-days__boxes">
                                    {forecastDays.map((item) => {
                                        const forecastDate = item.date.split(" ")[0];
                                        const forecastDay = new Date(forecastDate);
                                        const forecastWeekDay = forecastDay.toLocaleDateString('ne-US', {weekday: 'long'});
                                        const forecastDateMonth = forecastDay.toLocaleDateString('en-us', {month: "short"})
                                        return(
                                            <div className="forecast-boxes__box" key={item.date}>
                                                <img src={item.day.condition.icon} alt="" />
                                                <h1>{item.day.avgtemp_c}°C</h1>
                                                <p>{forecastWeekDay}, {forecastDay.getDate()} {forecastDateMonth}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="forecast-forecast__hour">
                                <h1>Hourly Forecast:</h1>
                                <div className="forecast-hour__boxes">
                                    {today.map((item) => {
                                        //time, img, Temp, kmh
                                        const [date, time] = item.time.split(" ");
                                        const elem = document.getElementsByClassName("forecast-boxes__box");
                                        const mak = parseInt(time.split(":")[0])
                                        if(theme === "light"){
                                            return(
                                                <div className={`forecast-hour-boxes__box ${mak < 21 ? "day" : "night"}`} key={time}>
                                                    <p>{time}</p>
                                                    <div className="forecast-hour-box__temp">
                                                        <div className="forecast-hour-temp__img" style={{backgroundImage: `url(${item.condition.icon})` }}></div>
                                                        <p>{item.temp_c} °C</p>
                                                    </div>
                                                    <div className="forecast-hour-box__wind">
                                                        <div className="forecast-wind__img" style={{transform: `rotate(${item.wind_degree}deg)`}}></div>
                                                        <p>{item.wind_kph}km/h</p>
                                                    </div>
                                                </div>
                                            )
                                        }else{
                                            return(
                                                <div className="forecast-hour-boxes__box" key={time}>
                                                    <p>{time}</p>
                                                    <div className="forecast-hour-box__temp">
                                                        <div className="forecast-hour-temp__img" style={{backgroundImage: `url(${item.condition.icon})` }}></div>
                                                        <p>{item.temp_c} °C</p>
                                                    </div>
                                                    <div className="forecast-hour-box__wind">
                                                        <div className="forecast-wind__img" style={{transform: `rotate(${item.wind_degree}deg)`}}></div>
                                                        <p>{item.wind_kph}km/h</p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forecast