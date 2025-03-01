// weather.js (API route)
export default async function handler(req, res) {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: "WEATHER_API_KEY is not defined" });
    }

    const location = req.query.location;
    if (!location) {
      return res.status(400).json({ message: "Location query parameter is required" });
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}`;
    const response = await fetch(weatherUrl);

    if (!response.ok) {
      return res.status(response.status).json({ message: `Failed to fetch weather data: ${response.statusText}` });
    }

    let weatherData;
    try {
      weatherData = await response.json();
    } catch (jsonError) {
      return res.status(500).json({ message: "Error parsing weather data" });
    }

    const solarEnergyForecast = weatherData.weather.some((condition) => condition.main === "Clear") 
      ? 100 
      : 50;

    const windEnergyForecast = weatherData.wind?.speed > 10 
      ? 100  
      : 30;

    const hydroEnergyForecast = weatherData.rain?.["1h"] ? weatherData.rain["1h"] * 10 : 0;

    const energyPrice = (solarEnergyForecast + windEnergyForecast + hydroEnergyForecast) < 50 ? 
      1.5 : 1;

    return res.status(200).json({
      solarEnergy: solarEnergyForecast,
      windEnergy: windEnergyForecast,
      hydroEnergy: hydroEnergyForecast,
      energyPrice,
    });

  } catch (error) {
    console.error("Weather API Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}