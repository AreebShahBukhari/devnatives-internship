import { useState } from "react";
import heroImg from "../assets/weather-image.jpg";
export default function HeroSearch({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (input.trim()) onSearch(input.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="hero-overlay">
        <div className="search-container-hero">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="search-box-hero"
            placeholder="Search City"
          />
          <button className="location-btn" onClick={handleSearch}>
            Search <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
