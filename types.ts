
export interface LocationSummary {
  name: string;
  lat: number;
  lng: number;
  count: number;
}

export interface LocationDetails {
  ev_count: number;
  average_range: number;
  top_makes: { make: string; count: number }[];
  top_models: { model: string; count: number }[];
  type_distribution: { name: string; value: number }[];
}

export interface ChargingRecommendation {
    city: string;
    justification: string;
}

export interface MlPrediction {
    modelForecast: { model: string; reasoning: string; }[];
    adoptionForecast: { county: string; reasoning: string; }[];
}