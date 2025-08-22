export default function WeatherFilters({ filter, setFilter }) {
  const filters = [
    { key: "current", label: "Current" },
    { key: "daily", label: "Daily" },
    { key: "weekly", label: "7-Day" },
    { key: "monthly", label: "Monthly" },
  ];

  return (
    <div className="weather-filters">
      <div className="filter-tabs">
        {filters.map((f) => (
          <button
            key={f.key}
            className={`filter-tab ${filter === f.key ? "active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
