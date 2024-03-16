import React, {useState, useEffect} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

export const ShowData = ({data}) => {
    const [showReport, setShowReport] = useState(false)
    const [report, setReport] = useState(null)

    return (
        <>
            <div className="relative overflow-x-auto shadow-2xl mt-2">
                <table className="w-full text-sm text-center text-gray-100">
                    <thead className="text-xs uppercase bg-gray-800 border-gray-400 border-t-2 border-b-2">
                    <tr>
                        <th>Data zgłoszenia</th>
                        <th>Dzielnica I <br/> Kategoria</th>
                        <th>Ilość zgłoszeń</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={index}
                            className={"hover:bg-gray-800 border-solid border-t-2 border-gray-400 border-b-2"}
                            onClick={() => {
                                setShowReport(true);
                                setReport(index)
                            }}>
                            {item.data.closedDate === null ? <td className={"text-red-500"}>{item.data.date}</td> :
                                <td className={"text-green-500"}>{item.data.date}</td>}
                            <td>
                                <div id={"description"}>
                                    <p>-{item.data.district}</p>
                                    <p>-{item.data.category}</p>
                                </div>
                            </td>
                            <td>
                                <p>{item.data.numberOfReports}</p>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {showReport &&
                <div id={"info"}
                     className={"fixed inset-0 flex items-stretch justify-center bg-gray-700 bg-opacity-80 z-50 flex-col text-white"}>
                    <div id={"header"} className={"max-w-screen-3xl flex flex-wrap items-center justify-between p-2"}>
                        <h1 className={"font-bold text-2xl"}>Zgłoszenie numer: {data[report].id}</h1>
                        <button type="button"
                                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                onClick={() => {
                                    setShowReport(false);
                                    setReport(null)
                                }}>
                            <span className="sr-only">Close menu</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div id={"content"} className={"text-center font-semibold text-lg"}>
                        <div id={"visual"}>
                            <img src={data[report].data.photo} alt={"Zdjęcie"}/>
                            <MapContainer center={data[report].position} zoom={13} className={"max-h-64 mt-2 mb-2"}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={data[report].position}>
                                    <Popup>{data[report].data.category}</Popup>
                                </Marker>
                            </MapContainer>

                        </div>
                        <div id={"details"}>
                            <p>Dzielnica: {data[report].data.district}</p>
                            <p>Kategoria: {data[report].data.category}</p>
                            <p>Liczba zgłoszeń: {data[report].data.numberOfReports}</p>
                        </div>
                        <div id={"description"}>
                            <h5>Opis zgłoszenia:</h5>
                            <p>{data[report].data.description}</p>
                        </div>
                        <button type="button"
                                className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={() => {
                                    setShowReport(false);
                                    setReport(null)
                                }}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"/>
                            </svg>
                        Oznacz jako wykonane
                    </button>
                </div>
                </div>
            }
</>
)
}

//<button onClick={() => showPhoto(index)}>Zdjęcie</button>
//<button onClick={() => showGPS(index)}>Lokalizacja</button>
//<button onClick={() => showManagement(index)}>Zarządzaj</button>