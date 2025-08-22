import { useState, useEffect } from "react";
import TopBar from "./components/TopBar";
import HeroSearch from "./components/HeroSearch";
import WeatherFilters from "./components/WeatherFilters";
import CurrentWeather from "./components/CurrentWeather";
import ForecastWeather from "./components/ForecastWeather";
import ExtremeWeather from "./components/ExtremeWeather";
import Footer from "./components/Footer";
import {
  getCurrentWeather,
  getForecastWeather,
  getExtremeCities,
} from "./services/WeatherService";

export default function App() {
  const [location, setLocation] = useState("New York");
  const [filter, setFilter] = useState("current");
  const [weatherData, setWeatherData] = useState(null);
  const [extremes, setExtremes] = useState({ hottest: [], coldest: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const fetchWeather = async () => {
  try {
    setLoading(true);
    setError("");
    let data;

    if (filter === "current") {
      data = await getCurrentWeather(location);
    } else {
      let days = 1;
      if (filter === "daily") days = 3;
      if (filter === "7-day") days = 7;
      if (filter === "monthly") days = 10;
      data = await getForecastWeather(location, days);
    }

    setWeatherData(data);
  } catch (err) {
    setError("Failed to fetch weather data. Try another city.");
  } finally {
    setLoading(false);
  }
};



  const fetchExtremes = async () => {
    try {
      const data = await getExtremeCities();
      setExtremes(data);
    } catch (err) {
      console.error("Failed to fetch extreme cities");
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [location, filter]);

  useEffect(() => {
    fetchExtremes();
  }, []);

  return (
    <div>
      <TopBar />
      <HeroSearch onSearch={setLocation} />
      <WeatherFilters filter={filter} setFilter={setFilter} />

      <main className="weather-content">
        {loading && <p>Loading weather...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && weatherData && (
          <>
            {filter === "current" ? (
              <CurrentWeather data={weatherData} />
            ) : (
              <ForecastWeather data={weatherData} filter={filter} />
            )}
          </>
        )}
        <ExtremeWeather hottest={extremes.hottest} coldest={extremes.coldest} />
      </main>

      <Footer />
    </div>
  );
}
