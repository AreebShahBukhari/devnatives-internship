const API_KEY = "b67d5261014b44079da184624253107";

export async function getCurrentWeather(location) {
  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
      location
    )}&aqi=yes`
  );
  if (!res.ok) throw new Error("Failed to fetch current weather");
  return res.json();
}

export async function getForecastWeather(location, days = 7) {
  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=${days}`
  );
  return await res.json();
}


export async function getExtremeCities() {
  const cities = [
    "Dubai, UAE",
    "Phoenix, USA",
    "Kuwait City, Kuwait",
    "Las Vegas, USA",
    "Cairo, Egypt",
    "Fairbanks, Alaska",
    "Yakutsk, Russia",
    "Yellowknife, Canada",
    "Murmansk, Russia",
    "Reykjavik, Iceland",
    "Karachi, Pakistan",
    "Sydney, Australia",
    "London, UK",
    "Tokyo, Japan",
    "Cape Town, South Africa",
  ];

  let hottest = [];
  let coldest = [];

  for (const city of cities) {
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
        city
      )}`
    );
    const data = await res.json();
    const temp = data.current.temp_c;
    hottest.push({ name: city, temp });
    coldest.push({ name: city, temp });
  }

  hottest.sort((a, b) => b.temp - a.temp);
  coldest.sort((a, b) => a.temp - b.temp);

  return { hottest: hottest.slice(0, 5), coldest: coldest.slice(0, 5) };
}

export function getWeatherIcon(condition) {
  const weatherIcons = {
    clear: "☀️",
    sunny: "☀️",
    "partly cloudy": "⛅",
    cloudy: "☁️",
    overcast: "☁️",
    mist: "🌫️",
    fog: "🌫️",
    rain: "🌧️",
    "light rain": "🌦️",
    "heavy rain": "⛈️",
    snow: "❄️",
    "light snow": "🌨️",
    "heavy snow": "❄️",
    thunderstorm: "🌩️",
    wind: "💨",
  };
  const key = condition.toLowerCase();
  for (const [k, emoji] of Object.entries(weatherIcons)) {
    if (key.includes(k)) return emoji;
  }
  return "☁️";
}

export function getAQIText(index) {
  const aqiLevels = {
    1: "Good",
    2: "Moderate",
    3: "Unhealthy for Sensitive",
    4: "Unhealthy",
    5: "Very Unhealthy",
    6: "Hazardous",
  };
  return aqiLevels[index] || "N/A";
}
