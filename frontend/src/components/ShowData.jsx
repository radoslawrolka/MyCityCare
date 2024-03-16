import {useState, useEffect} from 'react';

export const ShowData = ({data, showPhoto, showGPS, showManagement}) => {
    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th>Data zgłoszenia</th>
                        <th>Dzielnica
                            Kategoria
                        </th>
                        <th>Ilość zgłoszeń</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {item.closedDate === null ? <td className={"text-red-500"}>{item.date}</td> :
                                <td>{item.date}</td>}
                            <td>
                                <div id={"description"}>
                                    <p>{item.district}</p>
                                    <p>{item.category}</p>
                                </div>
                            </td>
                            <td>
                                <p>{item.numberOfReports}</p>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
)
}

//<button onClick={() => showPhoto(index)}>Zdjęcie</button>
//<button onClick={() => showGPS(index)}>Lokalizacja</button>
//<button onClick={() => showManagement(index)}>Zarządzaj</button>