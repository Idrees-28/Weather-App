import React, { useState } from 'react';
import axios from 'axios';

function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState("");
    const [temp, setTemp] = useState("");
    const [desc, setDesc] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleCity(event) {
        setCity(event.target.value);
    }

    function getWeather() {
        const apiKey = "8f359ee89b371bfec89ad46ce7fb70ff";
        setLoading(true);
        setError(""); // Clear previous errors

        axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(function(success) {
                console.log(success.data);
                setWeather(success.data.weather[0].main);
                setDesc(success.data.weather[0].description);
                setTemp(success.data.main.temp);
            })
            .catch(function(error) {
                console.error("Error fetching weather data:", error);
                setError("Unable to fetch weather data. Please check the city name and try again.");
            })
            .finally(() => {
                setLoading(false); // Hide loading indicator
            });
    }

    return (
        <div style={{ backgroundColor: '#f0f8ff', minHeight: '100vh' }} className="flex items-center justify-center">
            <div className="bg-teal-400 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Weather Report</h2>
                <p className="text-teal-100 mb-4">I can give you a weather report about your city!</p>

                <input
                    onChange={handleCity}
                    type="text"
                    placeholder="Enter your City Name"
                    className="w-full p-3 mb-4 text-gray-800 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
                />

                <button
                    onClick={getWeather}
                    className="w-full p-3 bg-teal-700 text-white font-semibold rounded hover:bg-teal-800 transition duration-300"
                >
                    {loading ? "Loading..." : "Get Report"}
                </button>

                {/* Error handling */}
                {error && <p className="text-red-500 mt-2">{error}</p>}

                {/* Output section with black text */}
                <div className="mt-6 text-left text-black">
                    {weather && <p className="mb-2 font-semibold">Weather: {weather}</p>}
                    {temp && <p className="mb-2 font-semibold">Temperature: {temp} °C</p>}
                    {desc && <p className="font-semibold">Description: {desc}</p>}
                </div>
            </div>
        </div>
    );
}

export default Weather;
