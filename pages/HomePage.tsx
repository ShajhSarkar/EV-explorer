import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DataIcon } from '../components/icons/DataIcon';
import { PredictionIcon } from '../components/icons/PredictionIcon';
import { getOverallTopBrands, getOverallTopModels, getTopCitiesByType } from '../services/mockEvDataService';
import { getMlPredictions } from '../services/geminiService';
import { MlPrediction } from '../types';

const HeroIllustration = () => (
    <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-tr from-sky-200 to-blue-200 rounded-full blur-xl opacity-50"></div>
        <div className="relative">
            <svg width="400" height="300" viewBox="0 0 400 300" className="w-full h-auto max-w-lg">
                <path d="M50 250 H350" stroke="#a0aec0" strokeWidth="4" strokeDasharray="10 5" />
                <path d="M70 200 C 80 170, 110 170, 120 200 L 140 200 C 150 170, 180 170, 190 200 Z" fill="#4ade80" />
                <path d="M220 180 C 230 160, 260 160, 270 180 L 290 180 C 300 160, 330 160, 340 180 Z" fill="#22c55e" />

                <g transform="translate(150, 180)">
                    <rect x="0" y="0" width="120" height="50" rx="10" fill="#4fd1c5"/>
                    <path d="M10 0 C 20 -30, 100 -30, 110 0 Z" fill="#81e6d9" />
                    <circle cx="30" cy="50" r="12" fill="#4a5568" stroke="white" strokeWidth="2" />
                    <circle cx="90" cy="50" r="12" fill="#4a5568" stroke="white" strokeWidth="2" />
                </g>

                <g transform="translate(300, 170)">
                     <path d="M0 80 L 0 30 Q 0 0, 30 0 L 20 0 L 20 80 Z" fill="#718096" />
                     <path d="M20 50 L 30 50 L 30 60 L 20 60 Z" fill="#facc15" />
                     <path d="M5 20 L 15 20" stroke="white" strokeWidth="2" />
                     <path d="M5 30 L 15 30" stroke="white" strokeWidth="2" />
                     <path d="M5 40 L 15 40" stroke="white" strokeWidth="2" />
                     <path d="M30 40 L 40 40 C 45 40, 45 50, 40 50 L 30 50" stroke="#718096" strokeWidth="3" fill="none" />
                </g>
            </svg>
        </div>
    </div>
);

const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

type InsightCategory = 'BEV' | 'PHEV' | 'Brands' | 'Models';

const HomePage: React.FC = () => {
    const location = useLocation();
    const [insightsOpen, setInsightsOpen] = useState(false);
    const [predictionsOpen, setPredictionsOpen] = useState(false);

    const [isLoadingInsights, setIsLoadingInsights] = useState(false);
    const [insightsData, setInsightsData] = useState({
        brands: [] as { make: string; count: number }[],
        models: [] as { model: string; count: number }[],
        bevCities: [] as { name: string; count: number }[],
        phevCities: [] as { name: string; count: number }[],
    });
    const [activeInsight, setActiveInsight] = useState<InsightCategory>('BEV');
    const hasFetchedInsights = React.useRef(false);

    const [isLoadingPredictions, setIsLoadingPredictions] = useState(false);
    const [predictionsData, setPredictionsData] = useState<MlPrediction | null>(null);
    const [predictionsError, setPredictionsError] = useState<string | null>(null);
    const hasFetchedPredictions = React.useRef(false);

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.substring(1);
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location]);

    const handleToggleInsights = () => {
        const willBeOpen = !insightsOpen;
        setInsightsOpen(willBeOpen);

        if (willBeOpen && !hasFetchedInsights.current) {
            hasFetchedInsights.current = true;
            setIsLoadingInsights(true);
            Promise.all([
                getOverallTopBrands(),
                getOverallTopModels(),
                getTopCitiesByType('BEV'),
                getTopCitiesByType('PHEV'),
            ]).then(([brands, models, bevCities, phevCities]) => {
                setInsightsData({ brands, models, bevCities, phevCities });
                setIsLoadingInsights(false);
            }).catch(err => {
                console.error("Failed to load insights data", err);
                setIsLoadingInsights(false);
            });
        }
    };
    
    const handleTogglePredictions = async () => {
        const willBeOpen = !predictionsOpen;
        setPredictionsOpen(willBeOpen);

        if (willBeOpen && !hasFetchedPredictions.current) {
            hasFetchedPredictions.current = true;
            setIsLoadingPredictions(true);
            setPredictionsError(null);

            try {
                let models = insightsData.models;
                if (models.length === 0) {
                    models = await getOverallTopModels();
                    setInsightsData(prev => ({...prev, models}));
                }
                
                const predictions = await getMlPredictions(models);
                setPredictionsData(predictions);

            } catch (err) {
                console.error("Failed to load prediction data", err);
                setPredictionsError("Sorry, I couldn't get predictions at this time.");
            } finally {
                setIsLoadingPredictions(false);
            }
        }
    };

    const renderInsightContent = () => {
        if (isLoadingInsights) {
             return (
                <div className="p-4 space-y-3 animate-pulse">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex justify-between items-center bg-gray-200 p-3 rounded-md">
                            <div className="h-4 bg-gray-300 rounded w-2/4"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                        </div>
                    ))}
                </div>
            );
        }
    
        let data: { name: string; count: number }[] = [];
        if (activeInsight === 'Brands') data = insightsData.brands.map(b => ({ name: b.make, count: b.count }));
        else if (activeInsight === 'Models') data = insightsData.models.map(m => ({ name: m.model, count: m.count }));
        else if (activeInsight === 'BEV') data = insightsData.bevCities;
        else if (activeInsight === 'PHEV') data = insightsData.phevCities;
    
        return (
            <ul className="space-y-2 p-4">
                {data.map((item, index) => (
                    <li key={index} className="flex justify-between items-center bg-white p-2.5 rounded-md shadow-xs">
                        <span className="text-sm font-medium text-gray-700">{index + 1}. {item.name}</span>
                        <span className="text-sm font-bold text-blue-600">{item.count.toLocaleString()}</span>
                    </li>
                ))}
            </ul>
        );
    };

    const renderPredictionContent = () => {
        if (isLoadingPredictions) {
            return (
                <div className="p-4 space-y-4 animate-pulse">
                    {[...Array(5)].map((_, i) => (
                       <div key={i} className="p-3 bg-gray-200 rounded-lg">
                           <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                           <div className="h-3 bg-gray-300 rounded w-full"></div>
                       </div>
                    ))}
                </div>
            );
        }
    
        if (predictionsError) {
            return <div className="p-4 text-center text-red-500 font-medium">{predictionsError}</div>;
        }
    
        if (!predictionsData) {
            return null;
        }
    
        return (
            <div className="px-6 py-4 space-y-4">
                <div>
                    <h4 className="font-semibold text-gray-700 mb-2 text-base">Forecast: Top Models for 2025</h4>
                    <ul className="space-y-2 text-gray-700">
                        {predictionsData.modelForecast.map((item, index) => (
                            <li key={index} className="p-3 bg-white rounded-lg shadow-xs border border-gray-200">
                                <p className="font-bold text-gray-800">{index + 1}. {item.model}</p>
                                <p className="text-sm text-gray-600 italic mt-1">{item.reasoning}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-700 mb-2 text-base">Forecast: Top Counties for Adoption Growth</h4>
                    <ul className="space-y-2 text-gray-700">
                        {predictionsData.adoptionForecast.map((item, index) => (
                            <li key={index} className="p-3 bg-white rounded-lg shadow-xs border border-gray-200">
                                <p className="font-bold text-gray-800">{index + 1}. {item.county}</p>
                                <p className="text-sm text-gray-600 italic mt-1">{item.reasoning}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };

    const InsightTab: React.FC<{ name: InsightCategory, label: string }> = ({ name, label }) => (
        <button
            onClick={() => setActiveInsight(name)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                activeInsight === name ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
            {label}
        </button>
    );

    return (
        <>
            {/* Hero Section */}
            <section className="bg-sky-50/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
                                Washington <span className="text-blue-600">EV Explorer</span>
                            </h1>
                            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
                                Discover Electric Vehicle trends, data-driven insights, and smart charging recommendations across the Evergreen State.
                            </p>
                            <Link 
                                to="/map" 
                                className="mt-8 inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:-translate-y-1 duration-300 ease-in-out"
                            >
                                Explore the Interactive Map
                                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
                            </Link>
                        </div>
                        <div className="flex justify-center">
                            <HeroIllustration />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-gray-50 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                            <div 
                                className="text-center p-8 cursor-pointer"
                                onClick={handleToggleInsights}
                                aria-expanded={insightsOpen}
                                aria-controls="insights-content"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                                    <DataIcon className="w-8 h-8"/>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Data-Driven Insights</h3>
                                <p className="mt-2 text-gray-600">Explore detailed statistics on EV registrations, models, and types for any location.</p>
                                <ChevronDownIcon className={`mx-auto mt-3 text-gray-400 transition-transform duration-300 ${insightsOpen ? 'rotate-180' : ''}`} />
                            </div>
                             {insightsOpen && (
                                <div id="insights-content" className="bg-gray-100">
                                    <div className="px-4 pt-4 flex justify-center space-x-2 border-b border-gray-200">
                                       <InsightTab name="BEV" label="Top BEV Cities" />
                                       <InsightTab name="PHEV" label="Top PHEV Cities" />
                                       <InsightTab name="Brands" label="Top Brands" />
                                       <InsightTab name="Models" label="Top Models" />
                                    </div>
                                    {renderInsightContent()}
                                </div>
                            )}
                        </div>
                        <div className="bg-gray-50 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                             <div 
                                className="text-center p-8 cursor-pointer"
                                onClick={handleTogglePredictions}
                                aria-expanded={predictionsOpen}
                                aria-controls="predictions-content"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                                    <PredictionIcon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Machine Learning Predictions</h3>
                                <p className="mt-2 text-gray-600">Future-forward predictions on EV adoption and range expectations.</p>
                                <ChevronDownIcon className={`mx-auto mt-3 text-gray-400 transition-transform duration-300 ${predictionsOpen ? 'rotate-180' : ''}`} />
                            </div>
                             {predictionsOpen && (
                                <div id="predictions-content" className="bg-gray-100">
                                    {renderPredictionContent()}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            
            {/* About Section */}
            <section id="about" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                         <h2 className="text-3xl font-bold text-gray-800">About the Project</h2>
                         <p className="mt-4 text-lg text-gray-600">
                            EV Explorer is a tool designed to provide a clear and interactive view of the electric vehicle landscape in Washington State.
                         </p>
                    </div>
                    <div className="mt-12 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold text-gray-800">The Dataset</h3>
                        <p className="mt-4 text-gray-600">
                            The visualizations and insights presented in this application are derived from the <a href="https://catalog.data.gov/dataset/electric-vehicle-population-data" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Electric Vehicle Population Data</a> provided by the Washington State Department of Licensing (DoL). 
                        </p>
                        <p className="mt-4 text-gray-600">
                            This public dataset includes registrations for Battery Electric Vehicles (BEVs) and Plug-in Hybrid Electric Vehicles (PHEVs) currently registered in Washington. Key data points include vehicle make, model, type, electric range, and location (city, county, zip code). We process and aggregate this data to bring you the trends and statistics you see on the map.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;