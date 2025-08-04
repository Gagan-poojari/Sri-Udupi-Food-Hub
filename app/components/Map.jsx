'use client';

import {
    MapContainer, TileLayer, Marker, Popup, Polyline,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import haversine from 'haversine-distance';
import { renderToStaticMarkup } from 'react-dom/server';
import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast';

import { FaMapMarkerAlt } from 'react-icons/fa';

// Leaflet Fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
    iconUrl: '/leaflet/images/marker-icon.png',
    shadowUrl: '/leaflet/images/marker-shadow.png',
});

// Branches
const customLocations = [
    {
        name: 'Commercial Street',
        full: 'Sri Udupi Food Hub Commercial Street',
        address: '43, Dispensary Rd, Tasker Town, Shivaji Nagar, Bengaluru, Karnataka 560001',
        position: [12.9817703, 77.6064136],
    },
    {
        name: 'Yelahanka',
        full: 'Sri Udupi Food Hub Yelahanka',
        address: '98/1, 10th Main Rd, Attur Layout, Yelahanka New Town, Bengaluru, Karnataka 560064',
        position: [13.0982542, 77.5691699],
    },
    {
        name: 'Vijayanagar',
        full: 'Sri Udupi Food Hub Vijayanagar',
        address: '#26, 2nd Main Rd, Hoshalli Extension, Stage 1, Vijayanagar, Bengaluru, Karnataka 560040',
        position: [12.9664327, 77.54162803],
    },
    {
        name: 'Gandhinagar',
        full: 'Sri Udupi Food Hub Gandhinagar',
        address: 'The Kanishka Grand Building, 2, 2nd Main Rd, Gandhi Nagar, Bengaluru, Karnataka 560009',
        position: [12.9759865, 77.5771464],
    },
    {
        name: 'Kammanahalli',
        full: 'Sri Udupi Food Hub, Kammanahalli',
        address: 'Ground Floor, Nehru Rd, 3rd Block, St Thomas Town, Kacharakanahalli, Bengaluru, Karnataka 560084',
        position: [13.0149961, 77.6334445],
    },
    {
        name: 'Domlur, Indiranagar',
        full: 'Sri Udupi Food Hub Indiranagar',
        address: '266, 1st Main, 2nd Stage Domlur, Indiranagar, Bengaluru, Karnataka 560071',
        position: [12.968457, 77.6328507],
    },
    {
        name: 'Jayanagar 3rd Block',
        full: 'Sri Udupi Food Hub Jayanagar 3rd Block',
        address: '196, 8th F Main Rd, next to Sreeraj Lassi Bar, Jayanagar 3rd Block, Jayanagar, Bengaluru, Karnataka 560011',
        position: [12.9313075, 77.5831926],
    },
    {
        name: 'Koramangala',
        full: 'Sri Udupi Food Hub Koramangala',
        address: 'Bhuwanappa Layout, 12, Hosur Rd, opp. Forum Mall, Tavarekere, Kaveri Layout, Koramangala, Bengaluru, Karnataka 560029',
        position: [12.9338933, 77.6104759],
    },
    {
        name: 'Jayanagar 8th Block',
        full: 'Sri Udupi Food Hub Jayanagar 8th Block',
        address: '155, 43rd cross Sangam Circle, 114, 2nd Main Rd, near 8th Block, 8th Block, Jayanagar, Bengaluru, Karnataka 560070',
        position: [12.9176705, 77.5761646],
    },
    {
        name: 'Tilaknagar',
        full: 'Sri Udupi Food Hub Tilaknagar',
        address: 'No 1218/A, 1218, 34th C Cross Rd, East End, 4th T Block East, Jayanagar, Bengaluru, Karnataka 560041',
        position: [12.9274036, 77.5910624],
    },
    {
        name: 'Whitefield',
        full: 'Sri Udupi Food Hub Whitefield',
        address: 'Siddhapura Main Rd, Nallurhalli, Whitefield, Bengaluru, Karnataka 560066',
        position: [12.9762767, 77.7250266],
    },
    {
        name: 'Hopefarm',
        full: 'Sri Udupi Food Hub Hopefarm',
        address: '12/2 Hope Farm (Towards Whitefield Main Road Whitefield, Prasanth Extension, Kadugodi, Bengaluru, Karnataka 560066',
        position: [12.9835404, 77.7488073],
    },
]
const createReactIcon1 = (pulse = false) =>
    L.divIcon({
        html: renderToStaticMarkup(
            <FaMapMarkerAlt className={`text-[#0000dd] text-3xl ${pulse ? 'animate-pulse' : ''}`} />
        ),
        iconSize: [24, 24],
        className: '',
    });

const createReactIcon2 = (pulse = false) =>
    L.divIcon({
        html: renderToStaticMarkup(
            <FaMapMarkerAlt className={`text-[#dd0000] text-3xl ${pulse ? 'animate-pulse' : ''}`} />
        ),
        iconSize: [24, 24],
        className: '',
    });

const Map = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [destination, setDestination] = useState(customLocations[0]);
    const [distance, setDistance] = useState(null);
    const [estimatedTime, setEstimatedTime] = useState(null);
    const [scrollZoomEnabled, setScrollZoomEnabled] = useState(false);
    const mapRef = useRef(null);

    // Get location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const coords = [pos.coords.latitude, pos.coords.longitude];
                    setUserLocation(coords);
                    const distMeters = haversine(
                        { lat: coords[0], lon: coords[1] },
                        { lat: destination.position[0], lon: destination.position[1] }
                    );
                    const distKm = distMeters / 1000;
                    const km = Math.floor(distKm);
                    const meters = Math.round((distKm - km) * 1000);
                    setDistance({ km, meters });

                    const getTimeEstimate = (speedKmHr) => {
                        const totalHours = distKm / speedKmHr;
                        const hours = Math.floor(totalHours);
                        const minutes = Math.round((totalHours - hours) * 60);
                        return { hours, minutes };
                    };

                    setEstimatedTime({
                        car: getTimeEstimate(15),
                        walk: getTimeEstimate(5),
                        public: getTimeEstimate(10),
                    });
                },
                () => toast.error('Location access denied!')
            );
        }
    }, [destination]);

    // Auto-fit map
    useEffect(() => {
        if (mapRef.current && userLocation && destination) {
            const bounds = L.latLngBounds([userLocation, destination.position]);
            mapRef.current.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [userLocation, destination]);

    const openInGoogleMaps = () => {
        if (!userLocation) return;
        const [lat1, lon1] = userLocation;
        const [lat2, lon2] = destination.position;
        window.open(`https://www.google.com/maps/dir/?api=1&origin=${lat1},${lon1}&destination=${lat2},${lon2}&travelmode=driving`, '_blank');
    };
    const openInGoogleMapsByAddress = () => {
        if (!userLocation || !destination) return;

        const [lat1, lon1] = userLocation;
        const encodedAddress = encodeURIComponent(destination.address || destination.full);

        window.open(
            `https://www.google.com/maps/dir/?api=1&origin=${lat1},${lon1}&destination=${encodedAddress}&travelmode=driving`,
            '_blank'
        );
    };

    const openInGoogleMapsByAddressWithoutLocation = () => {
        if (!destination) return;
        const encodedAddress = encodeURIComponent(destination.address || destination.full);
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}&travelmode=driving`, '_blank');
    };

    return (
        <section
            className="flex flex-col  items-center w-full min-h-screen bg-[#f7f7e4] p-8 gap-10 ">
            <h1 className="text-4xl md:text-5xl pt-2 font-extrabold text-center uppercase tracking-widest bg-gradient-to-r from-[#bfa14a] via-[#e6d091] to-[#bfa14a] text-transparent bg-clip-text drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] animate-fade-in">
                OUR LOCATIONS
            </h1>
            <div className="flex flex-col justify-center items-center lg:flex-row gap-6 w-full ">


                <Toaster position="top-center" />

                <div
                    onClick={() => setScrollZoomEnabled(true)}
                    className="w-full lg:w-[60%] rounded-2xl overflow-hidden border-2 border-[#cec284] shadow-xl"
                >
                    <MapContainer
                        ref={(mapInstance) => (mapRef.current = mapInstance)}
                        center={[12.9716, 77.5946]}
                        zoom={11}
                        scrollWheelZoom={scrollZoomEnabled}
                        style={{ height: '500px', width: '100%' }}
                        onClick={() => setScrollZoomEnabled(true)}
                        className="rounded-xl"
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap'
                        />
                        {customLocations.map((loc, idx) => (
                            <Marker
                                key={idx}
                                position={loc.position}
                                icon={createReactIcon2(loc.name === destination.name)}
                            >
                                <Popup>
                                    <strong>{loc.name}</strong><br />
                                    <span className="text-sm">{loc.full}</span>
                                </Popup>
                            </Marker>
                        ))}
                        {userLocation && (
                            <>
                                <Marker position={userLocation} icon={createReactIcon1(true)}>
                                    <Popup>Your Location</Popup>
                                </Marker>
                                <Polyline positions={[userLocation, destination.position]} color="#547254" />
                            </>
                        )}
                    </MapContainer>
                </div>

                <div className="flex flex-col items-center justify-center backdrop-blur-sm shadow-xl bg-[#e7dca6] shadow-[#00000033] rounded-xl p-6">
                    <h2 className="text-3xl font-bold text-[#384b38] mb-4">SELECT YOUR FAVOURITE</h2>
                    <Select
                        options={customLocations.map((loc, i) => ({ value: i, label: loc.name }))}
                        defaultValue={{ value: 0, label: customLocations[0].name }}
                        onChange={(opt) => setDestination(customLocations[opt.value])}
                        className="mb-6 w-full "
                        styles={{
                            control: (base) => ({
                                ...base,
                                backgroundColor: '#fdf8ec',
                                borderRadius: '12px',
                                borderColor: '#384b38',
                                padding: '0.5rem',
                                fontWeight: 600,
                            }),
                        }}
                    />

                    {userLocation && distance && estimatedTime ? (
                        <div className="flex flex-col items-center gap-4 lg:max-w-3xl text-[#000000]">
                            <div className='flex flex-col items-center'>
                                <span className="text-[#a52a2a] font-bold text-xl">{destination.full}</span>
                                <span className="text-[#3f3f3f] max-w- text-center">{destination.address}</span>
                            </div>
                            <p className="text-2xl font-bold text-[#384b38]">
                                Distance: {distance.km}.{distance.meters} km
                            </p>

                            <div className="space-y-2 w-full">
                                <p className="text-lg font-bold text-[#2b2b2b]">Estimated Time:</p>
                                <div className="flex flex-wrap gap-3">
                                    <span className="px-4 py-1 rounded-full bg-[#252f25]/20 text-[#252f25] font-medium">
                                        Vehicle: {estimatedTime.car.hours}h {estimatedTime.car.minutes}m
                                    </span>
                                    <span className="px-4 py-1 rounded-full bg-[#a52a2a]/20 text-[#a52a2a] font-medium">
                                        Walk: {estimatedTime.walk.hours}h {estimatedTime.walk.minutes}m
                                    </span>
                                    {/* <span className="px-4 py-1 rounded-full bg-[#1c1d3a]/20 text-[#1c1d3a] font-medium">
                                        Public Transport: {estimatedTime.public.hours}h {estimatedTime.public.minutes}m
                                    </span> */}
                                </div>
                            </div>

                            <button
                                onClick={openInGoogleMapsByAddress}
                                className="mt-2 cursor-pointer w-full bg-gradient-to-br from-[#547254] to-[#384b38] text-white py-2 rounded-xl font-semibold hover:opacity-90 transition smooth"
                            >
                                Open in Google Maps
                            </button>
                        </div>
                    ) : (
                        <div className='flex flex-col items-center'>
                            <div className="flex gap-3 items-center">
                                <div className="animate-spin h-6 w-6 border-2 border-[#547254] border-t-transparent rounded-full"></div>
                                <p className="text-[#547254] font-medium">Fetching your location...</p>
                            </div>
                            <p className="text-[#a52a2a] font-medium">Find how close you are to savour the authentic Udupi cuisine!</p>
                            <p className="text-[#547254] font-medium">Please grant your location access...</p>
                            <button
                                onClick={openInGoogleMapsByAddressWithoutLocation}
                                className="mt-2 cursor-pointer w-full bg-gradient-to-br from-[#547254] to-[#384b38] text-white py-2 rounded-xl font-semibold hover:opacity-90 transition smooth"
                            >
                                Open in Google Maps
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Map;
