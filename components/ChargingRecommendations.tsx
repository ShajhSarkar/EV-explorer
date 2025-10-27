import React, { useState, useCallback } from 'react';
import { getChargingRecommendations } from '../services/geminiService';
import { ChargingRecommendation } from '../types';

const ChargingRecommendations: React.FC = () => {
    const [recommendations, setRecommendations] = useState<ChargingRecommendation[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchRecommendations = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setRecommendations([]);
        try {
            const result = await getChargingRecommendations();
            setRecommendations(result);
        } catch (err) {
            console.error(err);
            setError("Sorry, I couldn't get recommendations at this time. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg h-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Smart Charging Recommendations</h2>
            <p className="text-gray-600 mb-6">
                Use AI to identify strategic locations for new EV charging stations based on population and geography.
            </p>
            <button
                onClick={handleFetchRecommendations}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-300"
            >
                {isLoading ? 'Generating...' : 'Get AI Recommendations'}
            </button>

            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

            {isLoading && (
                <div className="mt-6 space-y-4 animate-pulse">
                    {[...Array(5)].map((_, i) => (
                       <div key={i} className="p-4 bg-gray-100 rounded-lg">
                           <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                           <div className="h-3 bg-gray-200 rounded w-full"></div>
                       </div>
                    ))}
                </div>
            )}
            
            {recommendations.length > 0 && (
                <div className="mt-6">
                    <h3 className="font-semibold text-gray-700 mb-3">Top 5 Recommended Locations:</h3>
                    <ul className="space-y-4">
                        {recommendations.map((rec, index) => (
                            <li key={index} className="p-4 bg-sky-50 rounded-lg border border-sky-200">
                                <p className="font-bold text-blue-800">{index + 1}. {rec.city}</p>
                                <p className="text-gray-600 mt-1">{rec.justification}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ChargingRecommendations;