import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LocationDetails } from '../types';

interface LocationDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    locationName: string;
    details: LocationDetails | null;
    isLoading: boolean;
}

const COLORS = ['#0ea5e9', '#6366f1', '#f97316', '#10b981', '#ec4899'];

const DetailItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className="text-lg font-bold text-gray-800">{value}</span>
    </div>
);

const LocationDetailModal: React.FC<LocationDetailModalProps> = ({ isOpen, onClose, locationName, details, isLoading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">Details for {locationName}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl leading-none">&times;</button>
                </div>

                <div className="p-6 overflow-y-auto">
                    {isLoading && <div className="text-center p-10">Loading details...</div>}
                    {!isLoading && !details && <div className="text-center p-10 text-red-500">Could not load details.</div>}
                    {details && (
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Key Statistics</h3>
                                <DetailItem label="Total EV Registrations" value={details.ev_count.toLocaleString()} />
                                <DetailItem label="Average Electric Range" value={`${details.average_range} miles`} />
                                
                                <div className="mt-4">
                                    <h4 className="font-semibold text-gray-700 mb-2">Top Makes</h4>
                                    <ul className="space-y-2">
                                        {details.top_makes.map(make => (
                                            <li key={make.make} className="flex justify-between bg-gray-50 p-2 rounded">
                                                <span className="text-gray-800">{make.make}</span>
                                                <span className="font-semibold text-gray-900">{make.count.toLocaleString()}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-4">
                                    <h4 className="font-semibold text-gray-700 mb-2">Top Models</h4>
                                    <ul className="space-y-2">
                                        {details.top_models.map(model => (
                                            <li key={model.model} className="flex justify-between bg-gray-50 p-2 rounded">
                                                <span className="text-gray-800">{model.model}</span>
                                                <span className="font-semibold text-gray-900">{model.count.toLocaleString()}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="flex flex-col">
                                 <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Vehicle Type Distribution</h3>
                                 <div className="flex-grow w-full h-[300px] md:h-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={details.type_distribution}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={100}
                                                fill="#8884d8"
                                                dataKey="value"
                                                nameKey="name"
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {details.type_distribution.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                 </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LocationDetailModal;
