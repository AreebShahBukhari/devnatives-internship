const API_KEY = 'b67d5261014b44079da184624253107';
let currentFilter = 'current';
let currentLocation = 'New York';

const weatherIcons = {
    'clear': '☀️',
    'sunny': '☀️',
    'partly cloudy': '⛅',
    'cloudy': '☁️',
    'overcast': '☁️',
    'mist': '🌫️',
    'fog': '🌫️',
    'rain': '🌧️',
    'light rain': '🌦️',
    'heavy rain': '⛈️',
    'snow': '❄️',
    'light snow': '🌨️',
    'heavy snow': '❄️',
    'thunderstorm': '🌩️',
    'wind': '💨'
};

function getWeatherIcon(condition) {
    const conditionLower = condition.toLowerCase();
    for (const [key, emoji] of Object.entries(weatherIcons)) {
        if (conditionLower.includes(key)) {
            return emoji;
        }
    }
    return '☁️';
}


function setActiveFilter(filter) {
    currentFilter = filter;
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    loadWeatherData();
}

function searchWeather() {
    const searchInput = document.getElementById('searchInput');
    const location = searchInput.value.trim();
    if (location) {
        currentLocation = location;
        loadWeatherData();
    }
}

document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

async function loadWeatherData() {
    try {
        showLoading();

        let weatherData;
        if (currentFilter === 'current') {
            weatherData = await getCurrentWeather(currentLocation);
            displayCurrentWeather(weatherData);
            document.getElementById('forecastSection').style.display = 'none';
        } else {
            weatherData = await getForecastWeather(currentLocation, currentFilter);
            displayForecastWeather(weatherData);
            document.getElementById('currentWeather').style.display = 'none';
            document.getElementById('forecastSection').style.display = 'block';
        }

        await loadExtremeCities();
    } catch (error) {
        showError('Failed to load weather data. Please try again.');
        console.error('Weather API Error:', error);
    }
}

function showLoading() {
    document.getElementById('currentWeather').innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner"></i>
            <p>Loading weather data...</p>
        </div>
    `;
}

function showError(message) {
    document.getElementById('currentWeather').innerHTML = `
        <div class="error">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
        </div>
    `;
}

async function getCurrentWeather(location) {
    const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}&aqi=yes`
    );
    if (!response.ok) throw new Error('Failed to fetch current weather');
    return await response.json();
}

async function getForecastWeather(location, filter) {
    const days = filter === 'weekly' ? 7 : filter === 'monthly' ? 30 : 3;
    const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=${days}&aqi=yes&alerts=no`
    );
    if (!response.ok) throw new Error('Failed to fetch forecast weather');
    return await response.json();
}

function displayCurrentWeather(data) {
    const { current, location } = data;
    const aqi = current.air_quality ? getAQIText(current.air_quality['us-epa-index']) : 'N/A';

    document.getElementById('currentWeather').innerHTML = `
        <h2 style="margin-bottom: 20px; color: #333;">${location.name}, ${location.country}</h2>
        <div class="weather-main">
            <span class="weather-emoji">${getWeatherIcon(current.condition.text)}</span>
            <div>
                <div class="temperature">${Math.round(current.temp_c)}°C</div>
                <div style="font-size: 18px; color: #666; margin-top: 10px;">${current.condition.text}</div>
            </div>
        </div>
        <div class="weather-details">
            <div class="detail-item">
                <i class="fas fa-thermometer-half detail-icon"></i>
                <div class="detail-label">Feels Like</div>
                <div class="detail-value">${Math.round(current.feelslike_c)}°C</div>
            </div>
            <div class="detail-item">
                <i class="fas fa-tint detail-icon"></i>
                <div class="detail-label">Humidity</div>
                <div class="detail-value">${current.humidity}%</div>
            </div>
            <div class="detail-item">
                <i class="fas fa-wind detail-icon"></i>
                <div class="detail-label">Wind Speed</div>
                <div class="detail-value">${current.wind_kph} km/h ${current.wind_dir}</div>
            </div>
            <div class="detail-item">
                <i class="fas fa-compress-arrows-alt detail-icon"></i>
                <div class="detail-label">Pressure</div>
                <div class="detail-value">${current.pressure_mb} mb</div>
            </div>
            <div class="detail-item">
                <i class="fas fa-eye detail-icon"></i>
                <div class="detail-label">Visibility</div>
                <div class="detail-value">${current.vis_km} km</div>
            </div>
            <div class="detail-item">
                <i class="fas fa-sun detail-icon"></i>
                <div class="detail-label">UV Index</div>
                <div class="detail-value">${current.uv}</div>
            </div>
            <div class="detail-item">
                <i class="fas fa-leaf detail-icon"></i>
                <div class="detail-label">Air Quality</div>
                <div class="detail-value">${aqi}</div>
            </div>
        </div>
    `;

    document.getElementById('currentWeather').style.display = 'block';
}

function displayForecastWeather(data) {
    const { forecast, location } = data;
    let title = '';

    switch (currentFilter) {
        case 'daily':
            title = '3-Day Forecast';
            break;
        case 'weekly':
            title = '7-Day Forecast';
            break;
        case 'monthly':
            title = 'Monthly Forecast';
            break;
    }

    document.getElementById('forecastTitle').textContent = `${title} - ${location.name}`;

    const forecastHTML = forecast.forecastday.map(day => {
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        return `
            <div class="forecast-item">
                <div class="forecast-day">${dayName}</div>
                <div style="font-size: 12px; color: #666;">${monthDay}</div>
                <span class="forecast-emoji">${getWeatherIcon(day.day.condition.text)}</span>
                <div style="font-size: 14px; color: #666; margin: 5px 0;">${day.day.condition.text}</div>
                <div class="forecast-temps">
                    <span class="temp-high">${Math.round(day.day.maxtemp_c)}°</span>
                    <span class="temp-low">${Math.round(day.day.mintemp_c)}°</span>
                </div>
            </div>
        `;
    }).join('');


    document.getElementById('forecastGrid').innerHTML = forecastHTML;
}

async function loadExtremeCities() {

    const cities = [
        'Dubai, UAE',
        'Phoenix, USA',
        'Kuwait City, Kuwait',
        'Las Vegas, USA',
        'Cairo, Egypt',
        'Fairbanks, Alaska',
        'Yakutsk, Russia',
        'Yellowknife, Canada',
        'Murmansk, Russia',
        'Reykjavik, Iceland',
        'Karachi, Pakistan',
        'Sydney, Australia',
        'London, UK',
        'Tokyo, Japan',
        'Cape Town, South Africa'
    ];

    let hottest = [];
    let coldest = [];

    try {
        for (const city of cities) {
            const res = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`
            );
            const data = await res.json();
            const temp = data.current.temp_c;

            hottest.push({ name: city, temp });
            coldest.push({ name: city, temp });
        }

        hottest.sort((a, b) => b.temp - a.temp);
        coldest.sort((a, b) => a.temp - b.temp);

        displayExtremeCities(hottest.slice(0, 5), coldest.slice(0, 5));
    } catch (err) {
        console.error('Failed to load extreme cities:', err);
        document.getElementById('hottestCities').innerHTML =
            `<p class="error">Failed to load hottest cities.</p>`;
        document.getElementById('coldestCities').innerHTML =
            `<p class="error">Failed to load coldest cities.</p>`;
    }
}


function displayExtremeCities(hottest, coldest) {
    const hottestHTML = hottest.map(city => `
        <div class="extreme-item">
            <span class="extreme-city">${city.name}</span>
            <span class="extreme-temp hot-temp">${city.temp}°C</span>
        </div>
    `).join('');

    const coldestHTML = coldest.map(city => `
        <div class="extreme-item">
            <span class="extreme-city">${city.name}</span>
            <span class="extreme-temp cold-temp">${city.temp}°C</span>
        </div>
    `).join('');

    document.getElementById('hottestCities').innerHTML = hottestHTML;
    document.getElementById('coldestCities').innerHTML = coldestHTML;
    document.getElementById('extremeWeather').style.display = 'grid';
}

function getAQIText(index) {
    const aqiLevels = {
        1: 'Good',
        2: 'Moderate',
        3: 'Unhealthy for Sensitive',
        4: 'Unhealthy',
        5: 'Very Unhealthy',
        6: 'Hazardous'
    };
    return aqiLevels[index] || 'N/A';
}

document.addEventListener('DOMContentLoaded', function () {
    loadWeatherData();
});
