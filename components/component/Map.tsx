"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface Personnel {
    name: string;
    role: string;
    location: any;
}

interface MapProps {
    personnel: Personnel[];
    zoom?: number;
}

const defaults = {
    zoom: 7,
}

const Map = ({ personnel, zoom = defaults.zoom }: MapProps) => {
    return (
        <MapContainer
            center={[26.5230, 80.4878]}  // Default center position
            zoom={zoom}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%", zIndex: 0 }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {

                personnel.map((person, index) => {

                    person.location &&
                        console.log(person.location)

                    return person.location && (
                        <Marker key={index} position={person.location} draggable={false}>
                            <Popup>
                                {person.name} - {person.role}
                            </Popup>
                        </Marker>
                    )
                })}
        </MapContainer>
    )
}

export default Map;