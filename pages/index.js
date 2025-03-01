import { useState } from "react";

export default function Home() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherEnergy = async (event) => {
    event.preventDefault(); // Prevent form from reloading the page
    if (!location) {
      setError("Please enter a location.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/weather?location=${encodeURIComponent(location)}`);
      const result = await response.json();

      if (!response.ok) {
        setError(result.message);
        setData(null);
      } else {
        setData(result);
      }
    } catch (err) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", backgroundColor: "#1e1e1e", color: "#fff", padding: "20px" }}>
      <h1>Weather Energy App</h1>
      <p>Enter a location to see solar, wind, & hydro energy predictions.</p>

      <form onSubmit={fetchWeatherEnergy}>
        <input 
          type="text" 
          placeholder="Enter city name" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          style={{ padding: "8px", marginRight: "10px", borderRadius: "5px" }} 
        />
        <button type="submit" style={{ padding: "8px 12px", borderRadius: "5px" }}>
          {loading ? "Loading..." : "Get Energy Data"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div style={{ marginTop: "20px" }}>
          <h3>Solar Energy Potential: {data.solarEnergy}%</h3>
          <h3>Wind Energy Potential: {data.windEnergy}%</h3>
          <h3>Hydro Energy Potential: {data.hydroEnergy}%</h3>
          <h3>Energy Price: ${data.energyPrice} per unit</h3>
        </div>
      )}
    </div>
  );
}