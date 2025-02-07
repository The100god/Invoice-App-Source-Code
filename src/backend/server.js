import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API route to fetch data
app.post("/fetch-product-details", async (req, res) => {
  try {
    const { url } = req.body;

    // Make the Axios request to the external API
    const { data } = await axios({
      data: {
        apiKey: "1af3b31e46b16a33bc8e6905ac86c45d",
        urls: [url],
      },
      headers: { "Content-Type": "application/json" },
      method: "POST",
      url: "https://async.scraperapi.com/jobs",
    });

    // Return the result to the frontend
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching product details:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch product details" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
