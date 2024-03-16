import React from 'react'
import Navbar from "../components/Navbar.jsx";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";


const MapPage = () => {
  const position = [50.06221931833916, 19.937108686033973];
  
  const points = [
    { id: 1, 
      position: [50.06221931833916, 19.937108686033973],
      data: {
        description: "Zniszczona ławka",
        date: "2022-10-10",
        photo: "https://noweinfo.pl/wp-content/uploads/2020/09/Lawka-zniszczona.jpg"
      }
    },
    { id: 2, 
      position: [50.06221931833916, 19.947108686033973],
      data: {
        description: "Zniszczona latarnia",
        date: "2022-10-10",
        photo: "https://noweinfo.pl/wp-content/uploads/2020/09/Lawka-zniszczona.jpg"
      }
    },
    { id: 3, 
      position: [50.06221931833916, 19.957108686033973],
      data: {
        description: "Zniszczona kosz",
        date: "2022-10-10",
        photo: "https://noweinfo.pl/wp-content/uploads/2020/09/Lawka-zniszczona.jpg"
      }
    }
  ]

  return (
      <>
        <Navbar />
        <div>MapPage</div>
        <MapContainer center={position} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        </MapContainer>
      </>
      

  )
}

export default MapPage