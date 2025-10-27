import { LocationSummary, LocationDetails } from '../types';

const locationsData: LocationSummary[] = [
    { name: "Seattle", lat: 47.6062, lng: -122.3321, count: 58301 },
    { name: "Bellevue", lat: 47.6101, lng: -122.2015, count: 21050 },
    { name: "Redmond", lat: 47.6740, lng: -122.1215, count: 18453 },
    { name: "Sammamish", lat: 47.6163, lng: -122.0356, count: 11023 },
    { name: "Kirkland", lat: 47.6769, lng: -122.2060, count: 10589 },
    { name: "Bothell", lat: 47.7634, lng: -122.2065, count: 9874 },
    { name: "Renton", lat: 47.4829, lng: -122.2171, count: 9102 },
    { name: "Tacoma", lat: 47.2529, lng: -122.4443, count: 8501 },
    { name: "Spokane", lat: 47.6588, lng: -117.4260, count: 7642 },
    { name: "Vancouver", lat: 45.6387, lng: -122.6615, count: 12345 },
    { name: "Olympia", lat: 47.0379, lng: -122.9007, count: 6832 },
    { name: "Everett", lat: 47.9789, lng: -122.2021, count: 5987 },
    { name: "Kent", lat: 47.3809, lng: -122.2348, count: 5123 },
    { name: "Issaquah", lat: 47.5301, lng: -122.0326, count: 8876 },
    { name: "Bellingham", lat: 48.7519, lng: -122.4787, count: 4321 },
    { name: "Yakima", lat: 46.6021, lng: -120.5059, count: 1234 },
    { name: "Kennewick", lat: 46.2110, lng: -119.1372, count: 1109 },
    { name: "Puyallup", lat: 47.1854, lng: -122.2929, count: 3456 },
    { name: "Richland", lat: 46.2843, lng: -119.2825, count: 1500 },
    { name: "Auburn", lat: 47.3073, lng: -122.2285, count: 2890 },
    { name: "Pasco", lat: 46.2396, lng: -119.1006, count: 890 },
    { name: "Marysville", lat: 48.0518, lng: -122.1771, count: 2100 },
    { name: "Lakewood", lat: 47.1718, lng: -122.5182, count: 1980 },
    { name: "Shoreline", lat: 47.7554, lng: -122.3456, count: 4500 },
    { name: "Edmonds", lat: 47.8109, lng: -122.3774, count: 3200 },
    { name: "Bremerton", lat: 47.5673, lng: -122.6329, count: 2500 },
    { name: "Federal Way", lat: 47.3223, lng: -122.3110, count: 3100 },
];

const cityNames = [
    'Aberdeen', 'Airway Heights', 'Algona', 'Anacortes', 'Arlington', 'Asotin', 'Bainbridge Island', 
    'Battle Ground', 'Bingen', 'Black Diamond', 'Blaine', 'Bonney Lake', 'Brier', 'Buckley', 'Burien',
    'Burlington', 'Camas', 'Carnation', 'Cashmere', 'Castle Rock', 'Centralia', 'Chehalis', 'Chelan',
    'Cheney', 'Chewelah', 'Clarkston', 'Cle Elum', 'Clyde Hill', 'Colfax', 'College Place', 'Colton',
    'Colville', 'Conconully', 'Connell', 'Cosmopolis', 'Coulee Dam', 'Coulee City', 'Coupeville', 'Covington',
    'Davenport', 'Dayton', 'Deer Park', 'Des Moines', 'DuPont', 'Duvall', 'East Wenatchee', 'Eatonville',
    'Electric City', 'Ellensburg', 'Elma', 'Endicott', 'Entiat', 'Enumclaw', 'Ephrata', 'Everson',
    'Fairfield', 'Farmington', 'Fife', 'Fircrest', 'Forks', 'Friday Harbor', 'Garfield', 'George',
    'Gig Harbor', 'Gold Bar', 'Goldendale', 'Grand Coulee', 'Grandview', 'Granger', 'Granite Falls',
    'Hamilton', 'Harrah', 'Harrington', 'Hartline', 'Hatton', 'Hoquiam', 'Ilwaco', 'Ione', 'Kahlotus',
    'Kalama', 'Kelso', 'Kenmore', 'Kettle Falls', 'Kittitas', 'La Center', 'La Conner', 'Lacey',
    'Lake Forest Park', 'Lake Stevens', 'Lamont', 'Langley', 'Latah', 'Leavenworth', 'Liberty Lake',
    'Lind', 'Long Beach', 'Longview', 'Lyman', 'Lynden', 'Lynnwood', 'Mabton', 'Malden', 'Mansfield',
    'Maple Valley', 'Marcus', 'Mattawa', 'McCleary', 'Medical Lake', 'Medina', 'Mercer Island',
    'Mesa', 'Metaline', 'Metaline Falls', 'Mill Creek', 'Millwood', 'Milton', 'Monroe', 'Montesano',
    'Morton', 'Moses Lake', 'Mossyrock', 'Mount Vernon', 'Mountlake Terrace', 'Moxee', 'Mukilteo', 'Naches',
    'Napavine', 'Newcastle', 'Newport', 'Nooksack', 'Normandy Park', 'North Bend', 'North Bonneville',
    'Northport', 'Oak Harbor', 'Oakesdale', 'Oakville', 'Ocean Shores', 'Odessa', 'Okanogan', 'Omak',
    'Oroville', 'Orting', 'Othello', 'Pacific', 'Palouse', 'Pateros', 'Pe Ell', 'Pomeroy', 'Port Angeles',
    'Port Orchard', 'Port Townsend', 'Poulsbo', 'Prescott', 'Prosser', 'Pullman', 'Quincy',
    'Rainier', 'Raymond', 'Reardan', 'Republic', 'Ridgefield', 'Ritzville', 'Riverside',
    'Rock Island', 'Rockford', 'Rosalia', 'Roslyn', 'Roy', 'Royal City', 'Ruston', 'St. John', 'SeaTac',
    'Sedro-Woolley', 'Selah', 'Sequim', 'Shelton', 'Skykomish', 'Snohomish', 'Snoqualmie',
    'Soap Lake', 'South Bend', 'South Cle Elum', 'South Prairie', 'Spangle', 'Spokane Valley', 'Sprague',
    'Springdale', 'Stanwood', 'Starbuck', 'Steilacoom', 'Stevenson', 'Sultan', 'Sumas', 'Sumner',
    'Sunnyside', 'Tekoa', 'Tenino', 'Tieton', 'Toledo', 'Tonasket', 'Toppenish', 'Tukwila',
    'Tumwater', 'Twisp', 'Union Gap', 'Uniontown', 'University Place', 'Vader', 'Walla Walla', 'Wapato',
    'Warden', 'Washougal', 'Washtucna', 'Waterville', 'Waverly', 'Wenatchee', 'West Richland', 'Westport',
    'White Salmon', 'Wilbur', 'Wilkeson', 'Wilson Creek', 'Winlock', 'Winthrop', 'Woodinville', 'Woodland',
    'Woodway', 'Yacolt', 'Yelm', 'Zillah'
];

// Shuffle cityNames array to get random, unique names
for (let i = cityNames.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cityNames[i], cityNames[j]] = [cityNames[j], cityNames[i]];
}

// Generate more data points for better visualization
const extraPoints = 250;
const waBounds = {
  minLat: 45.5, maxLat: 49.0,
  minLng: -124.0, maxLng: -117.0
};
for(let i = 0; i < extraPoints; i++) {
  if (i >= cityNames.length) break; // Ensure we don't exceed the array length
  locationsData.push({
    name: cityNames[i],
    lat: Math.random() * (waBounds.maxLat - waBounds.minLat) + waBounds.minLat,
    lng: Math.random() * (waBounds.maxLng - waBounds.minLng) + waBounds.minLng,
    count: Math.floor(Math.random() * 2000) + 50
  });
}

const detailsCache = new Map<string, LocationDetails>();

const generateMockDetails = (name: string, count: number): LocationDetails => {
    if (detailsCache.has(name)) {
        return detailsCache.get(name)!;
    }
    const topMakes = [
        { make: "TESLA", count: Math.floor(count * 0.45) },
        { make: "NISSAN", count: Math.floor(count * 0.12) },
        { make: "CHEVROLET", count: Math.floor(count * 0.10) },
        { make: "FORD", count: Math.floor(count * 0.08) },
        { make: "KIA", count: Math.floor(count * 0.05) },
    ];
    const topModels = [
        { model: "MODEL Y", count: Math.floor(count * 0.20) },
        { model: "MODEL 3", count: Math.floor(count * 0.18) },
        { model: "LEAF", count: Math.floor(count * 0.10) },
        { model: "MUSTANG MACH-E", count: Math.floor(count * 0.06) },
        { model: "BOLT EV", count: Math.floor(count * 0.05) },
    ];
    const typeDistribution = [
        { name: 'BEV', value: Math.floor(count * 0.75) },
        { name: 'PHEV', value: Math.floor(count * 0.25) },
    ];

    const details = {
        ev_count: count,
        average_range: Math.floor(Math.random() * 50) + 180,
        top_makes: topMakes,
        top_models: topModels,
        type_distribution: typeDistribution,
    };
    detailsCache.set(name, details);
    return details;
};

// Pre-populate cache for all locations
locationsData.forEach(loc => generateMockDetails(loc.name, loc.count));

export const getLocations = (): Promise<LocationSummary[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(locationsData);
        }, 300);
    });
};

export const getLocationDetails = (name: string): Promise<LocationDetails> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (detailsCache.has(name)) {
                resolve(detailsCache.get(name)!);
            } else {
                const location = locationsData.find(loc => loc.name === name);
                if (location) {
                    resolve(generateMockDetails(name, location.count));
                } else {
                    reject(new Error("Location not found"));
                }
            }
        }, 500);
    });
};

const aggregateData = <T extends { make: string; count: number } | { model: string; count: number }>(
    key: 'make' | 'model'
): { [key: string]: any, count: number }[] => {
    const counts = new Map<string, number>();
    detailsCache.forEach(details => {
        const list = key === 'make' ? details.top_makes : details.top_models;
        list.forEach(item => {
            const name = (item as any)[key];
            counts.set(name, (counts.get(name) || 0) + item.count);
        });
    });
    return Array.from(counts.entries())
        .map(([name, count]) => ({ [key]: name, count }))
        .sort((a, b) => b.count - a.count);
};


export const getOverallTopBrands = (limit = 5): Promise<{ make: string; count: number }[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const topBrands = aggregateData('make') as { make: string; count: number }[];
            resolve(topBrands.slice(0, limit));
        }, 600);
    });
};

export const getOverallTopModels = (limit = 5): Promise<{ model: string; count: number }[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const topModels = aggregateData('model') as { model: string; count: number }[];
            resolve(topModels.slice(0, limit));
        }, 600);
    });
};

export const getTopCitiesByType = (type: 'BEV' | 'PHEV', limit = 5): Promise<{ name: string; count: number }[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const cities = locationsData.map(location => {
                const details = detailsCache.get(location.name)!;
                const typeEntry = details.type_distribution.find(d => d.name === type);
                return { name: location.name, count: typeEntry ? typeEntry.value : 0 };
            }).sort((a, b) => b.count - a.count);
            resolve(cities.slice(0, limit));
        }, 600);
    });
};
