import "dotenv/config";
import express from "express";
import fetch from "node-fetch";
import FormData from "form-data";

const app = express();
const port = 3000;

const VYRO_API_KEY = process.env.VYRO_API_KEY;

app.use(express.static("public"));
app.use(express.json());

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).send("Prompt is required");
  }

  try {
    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('style', 'realistic'); // You can make this configurable later
    formData.append('aspect_ratio', '1:1'); // You can make this configurable later
    formData.append('seed', '5'); // You can make this configurable later

    const response = await fetch('https://api.vyro.ai/v2/image/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VYRO_API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Vyro.ai API error: ${response.status} - ${errorText}`);
    }

    const buffer = await response.buffer();
    res.set("Content-Type", "image/png");
    res.send(buffer);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("Failed to generate image");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
