import { getWeatherIcon, getAQIText } from "../services/WeatherService";

export default function CurrentWeather({ data }) {
  const { current, location } = data;
  const aqi = current.air_quality
    ? getAQIText(current.air_quality["us-epa-index"])
    : "N/A";

  return (
    <div className="current-weather">
      <h2 style={{ marginBottom: 20, color: "#333" }}>
        {location.name}, {location.country}
      </h2>
      <div className="weather-main">
        <span className="weather-emoji">
          {getWeatherIcon(current.condition.text)}
        </span>
        <div>
          <div className="temperature">{Math.round(current.temp_c)}°C</div>
          <div style={{ fontSize: 18, color: "#666", marginTop: 10 }}>
            {current.condition.text}
          </div>
        </div>
      </div>
      <div className="weather-details">
        <div className="detail-item">
          <i className="fas fa-thermometer-half detail-icon"></i>
          <div className="detail-label">Feels Like</div>
          <div className="detail-value">{Math.round(current.feelslike_c)}°C</div>
        </div>
        <div className="detail-item">
          <i className="fas fa-tint detail-icon"></i>
          <div className="detail-label">Humidity</div>
          <div className="detail-value">{current.humidity}%</div>
        </div>
        <div className="detail-item">
          <i className="fas fa-wind detail-icon"></i>
          <div className="detail-label">Wind Speed</div>
          <div className="detail-value">
            {current.wind_kph} km/h {current.wind_dir}
          </div>
        </div>
        <div className="detail-item">
          <i className="fas fa-compress-arrows-alt detail-icon"></i>
          <div className="detail-label">Pressure</div>
          <div className="detail-value">{current.pressure_mb} mb</div>
        </div>
        <div className="detail-item">
          <i className="fas fa-eye detail-icon"></i>
          <div className="detail-label">Visibility</div>
          <div className="detail-value">{current.vis_km} km</div>
        </div>
        <div className="detail-item">
          <i className="fas fa-sun detail-icon"></i>
          <div className="detail-label">UV Index</div>
          <div className="detail-value">{current.uv}</div>
        </div>
        <div className="detail-item">
          <i className="fas fa-leaf detail-icon"></i>
          <div className="detail-label">Air Quality</div>
          <div className="detail-value">{aqi}</div>
        </div>
      </div>
    </div>
  );
}
