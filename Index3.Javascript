const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';  // Replace with your OpenWeatherMap API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeather() {
    const cityName = document.getElementById('city-input').value;
    const errorMessage = document.getElementById('error-message');
    const weatherResult = document.getElementById('weather-result');
    const cityElement = document.getElementById('city-name');
    const temperatureElement = document.getElementById('temperature');
    const humidityElement = document.getElementById('humidity');
    const descriptionElement = document.getElementById('description');

    // Hide any previous error messages
    errorMessage.style.display = 'none';

    if (!cityName) {
        errorMessage.textContent = 'Please enter a city name';
        errorMessage.style.display = 'block';
        return;
    }

    const url = `${apiUrl}?q=${cityName}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            errorMessage.textContent = `Error: ${data.message}`;
            errorMessage.style.display = 'block';
            weatherResult.style.display = 'none';
        } else {
            cityElement.textContent = `${data.name}, ${data.sys.country}`;
            temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
            descriptionElement.textContent = `Weather: ${data.weather[0].description}`;

            weatherResult.style.display = 'block';
        }
    } catch (error) {
        errorMessage.textContent = 'Failed to fetch weather data. Please try again.';
        errorMessage.style.display = 'block';
    }
}
