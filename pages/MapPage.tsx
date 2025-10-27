
import React, { useState, useEffect, useCallback } from 'react';
import MapComponent from '../components/MapComponent';
import LocationDetailModal from '../components/LocationDetailModal';
import ChargingRecommendations from '../components/ChargingRecommendations';
import { LocationSummary, LocationDetails } from '../types';
import { getLocations, getLocationDetails } from '../services/mockEvDataService';

const MapPage: React.FC = () => {
    const [locations, setLocations] = useState<LocationSummary[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<LocationSummary | null>(null);
    const [locationDetails, setLocationDetails] = useState<LocationDetails | null>(null);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const data = await getLocations();
                setLocations(data);
            } catch (err) {
                setError('Failed to load location data.');
                console.error(err);
            }
        };
        fetchLocations();
    }, []);

    const handleMarkerClick = useCallback(async (location: LocationSummary) => {
        setSelectedLocation(location);
        setIsLoadingDetails(true);
        setLocationDetails(null); 
        try {
            const details = await getLocationDetails(location.name);
            setLocationDetails(details);
        } catch (err) {
            setError(`Failed to load details for ${location.name}.`);
            console.error(err);
        } finally {
            setIsLoadingDetails(false);
        }
    }, []);

    const handleCloseModal = () => {
        setSelectedLocation(null);
        setLocationDetails(null);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Washington State EV Data Dashboard</h1>
            <p className="text-gray-600 mb-6">Click on a marker to view detailed statistics for that location.</p>
            
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
            
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 h-[600px] bg-gray-200 rounded-lg shadow-lg overflow-hidden relative">
                    <MapComponent locations={locations} onMarkerClick={handleMarkerClick} />
                </div>
                <div className="lg:col-span-1">
                    <ChargingRecommendations />
                </div>
            </div>

            {selectedLocation && (
                <LocationDetailModal 
                    isOpen={!!selectedLocation} 
                    onClose={handleCloseModal} 
                    locationName={selectedLocation.name}
                    details={locationDetails}
                    isLoading={isLoadingDetails}
                />
            )}
        </div>
    );
};

export default MapPage;
