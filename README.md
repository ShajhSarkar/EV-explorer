## Project Overview
The **EV Explorer - Washington** is a web application designed to visualize Electric Vehicle (EV) registration data across Washington State. It provides interactive map-based insights into EV distribution, offers tools for predicting EV characteristics, and suggests potential locations for new charging stations.

## Features
*   **Interactive Map:** Visualize EV density and distribution across Washington cities.
*   **Detailed Location Data:** View specific statistics for selected cities, including EV counts, average range, top makes, models, and type distribution (BEV/PHEV). Includes an interactive chart.
*   **EV Feature Prediction:** Input vehicle details (make, model, year, MSRP) to get predictions on EV type and electric range using a simulated machine learning model.
*   **Charging Station Recommendations:** Identifies potential cities for new charging infrastructure based on EV population.
  
## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
