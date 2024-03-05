import './app.scss'
import Forecast from './components/Forecast'
import { useState, useEffect } from 'react'

function App() {

  const api = {
    key: "86808a8e28ab4172b21111520241702",
    base: "http://api.weatherapi.com/v1"
  }
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("");

  console.log(weather)
  const searchByCity = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}/forecast.json?key=${api.key}&q=${city}&days=6`)
        .then(res => {
          if (res.status === 400) {
            console.log(`${city} is not found!`);
            throw new Error(`Http Error! Status: ${res.status}`);
          } else {
            res.json()
              .then(result => setWeather(result))
          }
        })

    }
  }

  const [theme, setTheme] = useState("light");
  const [buttonPosition, setButtonPosition] = useState('left');

  const toggleTheme = () => {
    setTheme((prevTheme) => prevTheme === "dark" ? "light" : "dark");
    setButtonPosition((prevPosition) => (prevPosition === 'left' ? 'right' : 'left'));
    document.body.style.background = theme === "dark" ? "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(70,97,115,1) 100%)" : "#444";
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(`${api.base}/forecast.json?key=${api.key}&q=tokyo&days=6`).then(res => res.json()).then(result => setWeather(result));
      }
      catch (error) {
        console.log("Error of fetching", error)
      }
    }

    fetchData()
  }, []);


  return (
    <>
      <div className={`search ${theme === 'dark' ? 'dark-mode' : ''}`}>
        <div className="container">
          <div className="search-inner">
            <div className="search-inner__mode">
              <div className="search-mode__btn" onClick={toggleTheme}>
                <button className={`${buttonPosition === 'right' ? 'move-right' : ''}`}></button>
              </div>
              <p>{theme} mode</p>
            </div>
            <div className={`search-inner__search ${theme === 'dark' ? 'dark-mode' : ''}`}>
              <input type="text" name="" id="" placeholder='Search for your preffered city...' onChange={(e) => { setCity(e.target.value) }} onKeyDown={searchByCity} />
            </div>
            <div className="searhc-inner__btn">
              <button>current location</button>
            </div>
          </div>
        </div>
      </div>

      <div className="clear"></div>

      {Object.keys(weather).length > 0 && <Forecast weather={weather} theme={theme} />}
    </>
  )
}

export default App
