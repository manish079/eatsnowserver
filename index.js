const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3500;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/restaurants", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5204303&lng=73.8567437&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        },
      }
    );
    const data = response.data;
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch restaurant data" });
  }
});
//rest menu
app.get("/api/restaurants/:resId", async (req, res) => {
  try {
    const { resId } = req.params;
    const response = await axios.get(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId=${resId}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        },
      }
    );
    const data = response.data;
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch restaurant data" });
  }
});

// 404 handler (for unmatched routes)
app.use((req, res, next) => {
  res.status(404).send("Route not found");
});

// Error handler (for other errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
