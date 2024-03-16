import React from 'react'
import Navbar from "../components/Navbar.jsx";
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet'
import "leaflet/dist/leaflet.css";


const MapPage = () => {
    const position = [50.06221931833916, 19.937108686033973];

    return (
        <>
            <Navbar shown={"map"}/>
            <MapContainer center={position} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        Zniszczona studzienka <br/> 2024-03-16
                    </Popup>
                </Marker>
            </MapContainer>
        </>
    )
}

export default MapPage