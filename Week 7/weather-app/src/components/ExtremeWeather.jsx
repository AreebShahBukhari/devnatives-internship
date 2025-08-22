export default function ExtremeWeather({ hottest, coldest }) {
  return (
    <div className="extreme-weather">
      <div className="extreme-card">
        <h3 className="extreme-title hot">
          <i className="fas fa-thermometer-full"></i>
          Hottest Cities Today
        </h3>
        <div>
          {hottest.map((city) => (
            <div key={city.name} className="extreme-item">
              <span className="extreme-city">{city.name}</span>
              <span className="extreme-temp hot-temp">{city.temp}°C</span>
            </div>
          ))}
        </div>
      </div>
      <div className="extreme-card">
        <h3 className="extreme-title cold">
          <i className="fas fa-thermometer-empty"></i>
          Coldest Cities Today
        </h3>
        <div>
          {coldest.map((city) => (
            <div key={city.name} className="extreme-item">
              <span className="extreme-city">{city.name}</span>
              <span className="extreme-temp cold-temp">{city.temp}°C</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
