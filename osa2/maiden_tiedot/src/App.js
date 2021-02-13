import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
    // Hooks
    const [countries, setCountries] = useState([])

    const [find, setFind] = useState('')

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            console.log("promise fulfilled")
            setCountries(response.data)
        })
    }, [])

    // eventhadlers
    const handleFind = (event) => {
        setFind(event.target.value)
    }

    return (
        <div>
            <div>
                find countries <input value={find}
                                      onChange={handleFind}/>  
            </div>
            <DisplayCountries countries={countries} find={find} setFind={setFind}/>
        </div>
    )
}


const DisplayCountries = ({countries, find, setFind}) => {
    // Parsing info from api
    const countryInfos = () => {
        const infos = countries.map(country =>
            country.name)
        return infos
    }

    const filterCountries = () => {
        let filteredCountries = countryInfos().filter(country => 
            country.toLowerCase().indexOf(find.toLowerCase()) != -1)
        return filteredCountries
    }

    const makeDivs = (countryNames) => {
        countryNames = countryNames.map((country, i) =>
           <div key={i}>{country}
           <button onClick={() => setFind(country)}>show</button></div>)
        return countryNames
    }
    // One match
    if (filterCountries().length === 1) {
        const countryName = filterCountries()[0]
        const countryInfo = countries.find(country => country.name === countryName)
        let capital = countryInfo.capital
        const population = countryInfo.population
        const languages = countryInfo.languages.map((language, i) => <li key={i}>{language.name}</li> )
        const flagUrl = countryInfo.flag

        if (capital === 'Washington, D.C.') {
            capital = 'Washington, DC'
        }


        return (
            <div>
                <h2>{countryName}</h2>
                    <p>capital {capital}</p>
                    <p>population {population}</p>
                <h3>languages</h3>
                    <ul>
                        {languages}
                    </ul>
                  <img src={flagUrl} height="200"></img>
                <ShowWeather capital={capital}/>
            
            </div>
        )
    }
    // Too many matches
    else if (filterCountries().length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }
    // 2-10 matches
    else if (filterCountries().length <= 10 && filterCountries().length > 1) {
        return (
            <div>
                {makeDivs(filterCountries())}
            </div>
        )
    }
    // 0 matches
    return (
        <div></div>
    )
    
}

const ShowWeather = ({capital}) => {
    // API key
    const api_key = process.env.REACT_APP_API_KEY
    console.log(api_key)

    // Params for axios.get()
    const params = {
        access_key: api_key,
        query: capital
    }
    // Hooks
    const [weather, setWeather] = useState([])

    useEffect(() => {
        axios.get('http://api.weatherstack.com/current', {params})
        .then(response => {
            const weather = response.data
            console.log(weather)
            console.log(weather.current)
            setWeather(weather.current)
        })
    }, [])
    
    return (
        <div>
            <h3>Weather in {capital}</h3>
                <p><strong>temperature:</strong> {weather.temperature} Celcius</p>
                <p> {weather.weather_descriptions}</p>
                <p><strong>wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}</p>
        </div>
    )
}

export default App