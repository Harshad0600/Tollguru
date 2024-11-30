import React from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ route, tollPoints }) => {
  return (
    <MapContainer center={[17.385044, 78.486671]} zoom={7} className="h-96 w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {route && <Polyline positions={route} color="blue" />}
      {tollPoints.map((point, index) => (
        <Marker key={index} position={point.location}>
          <Popup>Toll Cost: ${point.cost}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
