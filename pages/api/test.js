export default function handler(req, res) {
    res.status(200).json({ apiKey: process.env.WEATHER_API_KEY || "Not found" });
}