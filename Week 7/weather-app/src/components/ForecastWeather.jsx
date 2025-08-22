import { getWeatherIcon } from "../services/WeatherService";

export default function ForecastWeather({ data, filter }) {
  // safeguard against missing data
  if (!data || !data.forecast || !data.forecast.forecastday) {
    return <p>No forecast data available.</p>;
  }

  const { forecast, location } = data;

  // match your filters in App.js
  const titleMap = {
    daily: "Daily Forecast",
    "7-day": "7-Day Forecast",
    monthly: "Monthly Forecast",
  };

  return (
    <div className="forecast-section">
      <h2 className="forecast-title">
        {titleMap[filter] || "Forecast"} - {location?.name}
      </h2>
      <div className="forecast-grid">
        {forecast.forecastday.map((day) => {
          const date = new Date(day.date);
          const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
          const monthDay = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });

          return (
            <div key={day.date} className="forecast-item">
              <div className="forecast-day">{dayName}</div>
              <div style={{ fontSize: 12, color: "#666" }}>{monthDay}</div>
              <span className="forecast-emoji">
                {getWeatherIcon(day.day.condition.text)}
              </span>
              <div style={{ fontSize: 14, color: "#666", margin: "5px 0" }}>
                {day.day.condition.text}
              </div>
              <div className="forecast-temps">
                <span className="temp-high">
                  {Math.round(day.day.maxtemp_c)}°
                </span>
                <span className="temp-low">
                  {Math.round(day.day.mintemp_c)}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
