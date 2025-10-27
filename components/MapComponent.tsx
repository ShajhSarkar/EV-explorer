
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { LocationSummary } from '../types';

interface MapComponentProps {
    locations: LocationSummary[];
    onMarkerClick: (location: LocationSummary) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ locations, onMarkerClick }) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<L.Map | null>(null);
    const markersRef = useRef<L.LayerGroup | null>(null);

    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) {
            mapRef.current = L.map(mapContainerRef.current).setView([47.7511, -120.7401], 7);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapRef.current);

            markersRef.current = L.layerGroup().addTo(mapRef.current);
        }
    }, []);

    useEffect(() => {
        if (mapRef.current && markersRef.current) {
            markersRef.current.clearLayers();
            locations.forEach(location => {
                const radius = Math.max(5, Math.log(location.count) * 2.5);
                const marker = L.circleMarker([location.lat, location.lng], {
                    radius: radius,
                    fillColor: "#3b82f6",
                    color: "#ffffff",
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.7
                });

                marker.bindTooltip(`<b>${location.name}</b><br>EV Count: ${location.count.toLocaleString()}`);
                
                marker.on('click', () => {
                    onMarkerClick(location);
                    mapRef.current?.flyTo([location.lat, location.lng], 10);
                });

                markersRef.current?.addLayer(marker);
            });
        }
    }, [locations, onMarkerClick]);

    return <div ref={mapContainerRef} className="w-full h-full z-0" />;
};

export default MapComponent;
