import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

const MapPage = () => {
  const position = [50.06221931833916, 19.937108686033973];

  return (
      <MapContainer center={position} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
  )
}

export default MapPage