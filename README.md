# Text-to-Image Generator

This project generates an image from a text description using the Hugging Face Inference API.

## Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Set up your API key:**
    -   Rename the `.env.example` file to `.env`.
    -   Open the `.env` file and replace `YOUR_HUGGINGFACE_API_KEY_HERE` with your actual Hugging Face API key.

## Usage

To generate an image, run the following command:

```bash
node index.js
```

The generated image will be saved as `city.png` in the project directory.
