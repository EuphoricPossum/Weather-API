export default function handler(req, res) {
  try {
    return res.status(200).json({ name: "John Doe" });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
