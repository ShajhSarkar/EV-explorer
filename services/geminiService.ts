
import { GoogleGenAI, Type } from "@google/genai";
import { ChargingRecommendation, MlPrediction } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export async function getChargingRecommendations(): Promise<ChargingRecommendation[]> {

    const prompt = `You are an expert in urban planning and electric vehicle infrastructure. Based on general knowledge of Washington State's geography and population distribution, provide a list of 5 cities that are strategic locations for new EV fast-charging stations. For each city, provide a brief, one-sentence justification.`;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        recommendations: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    city: {
                                        type: Type.STRING,
                                        description: "The name of the recommended city."
                                    },
                                    justification: {
                                        type: Type.STRING,
                                        description: "A brief justification for the recommendation."
                                    }
                                },
                                required: ["city", "justification"]
                            }
                        }
                    },
                    required: ["recommendations"]
                }
            }
        });
        
        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        
        if (result.recommendations && Array.isArray(result.recommendations)) {
            return result.recommendations;
        } else {
            throw new Error("Invalid response format from AI.");
        }
    } catch (error) {
        console.error("Error fetching charging recommendations:", error);
        throw new Error("Failed to get recommendations from AI service.");
    }
}

export async function getMlPredictions(currentTopModels: { model: string, count: number }[]): Promise<MlPrediction> {
    const modelList = currentTopModels.map(m => m.model).join(', ');

    const prompt = `You are a market analyst specializing in the electric vehicle industry.
    Based on the fact that the current most popular EV models in Washington State include ${modelList}, please provide the following predictions.
    1. Forecast the top 3 most popular EV models for 2025. For each model, provide a brief, one-sentence reasoning considering market trends, new releases, and vehicle types.
    2. Predict the top 2 counties in Washington (e.g., King, Snohomish, Pierce) that will see the highest percentage growth in EV adoption by 2025. For each county, provide a brief, one-sentence reasoning, considering factors like population growth or economic development.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        modelForecast: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    model: { type: Type.STRING, description: "The name of the predicted top model." },
                                    reasoning: { type: Type.STRING, description: "The reasoning for the model's prediction." }
                                },
                                required: ["model", "reasoning"]
                            }
                        },
                        adoptionForecast: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    county: { type: Type.STRING, description: "The name of the predicted high-growth county." },
                                    reasoning: { type: Type.STRING, description: "The reasoning for the county's prediction." }
                                },
                                required: ["county", "reasoning"]
                            }
                        }
                    },
                    required: ["modelForecast", "adoptionForecast"]
                }
            }
        });
        
        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        
        if (result.modelForecast && result.adoptionForecast) {
            return result as MlPrediction;
        } else {
            throw new Error("Invalid response format from AI for ML predictions.");
        }
    } catch (error) {
        console.error("Error fetching ML predictions:", error);
        throw new Error("Failed to get predictions from AI service.");
    }
}
