import {useState, useEffect} from 'react'
import Navbar from "../components/Navbar.jsx";
import {ShowData} from "../components/ShowData.jsx";

const AdminPage = () => {
    const [data, setData] = useState([])
    const fetchData = () => {
        fetch("...")
            .then((response) => response.json())
            .then((fetched) => setData(fetched))
            .catch((error) => console.log(error))
    }


    const points = [
        { id: 1,
            position: [50.06221931833916, 19.937108686033973],
            data: {
                district: "Krowodrza",
                category: "Zniszczona ławka",
                numberOfReports: 2,
                date: "2022-10-10",
                closedDate: null,
                photo: "https://noweinfo.pl/wp-content/uploads/2020/09/Lawka-zniszczona.jpg"
            }
        },
        { id: 2,
            position: [50.06221931833916, 19.947108686033973],
            data: {
                district: "Krowodrza",
                category: "Zniszczona latarnia",
                numberOfReports: 3,
                date: "2022-10-10",
                closedDate: null,
                photo: "https://noweinfo.pl/wp-content/uploads/2020/09/Lawka-zniszczona.jpg"
            }
        },
        { id: 3,
            position: [50.06221931833916, 19.957108686033973],
            data: {
                district: "Krowodrza",
                category: "Zniszczony kosz",
                numberOfReports: 4,
                date: "2022-10-10",
                closedDate: "2022-11-10",
                photo: "https://noweinfo.pl/wp-content/uploads/2020/09/Lawka-zniszczona.jpg"
            }
        }
    ]
    useEffect(() => {
        // points.map((point) => {
        //     setData(data => [...data, point])
        // })
        setData(points);
        fetchData()
    }, [])

  return (
      <>
        <Navbar shown={"admin"}/>
        <div className={"overflow-auto h-screen bg-gradient-to-b from-gray-600 to-gray-400"}>
          <h1 className={"text-2xl font-bold text-center text-gray-100"}>Zarządzaj zgłoszeniami</h1>
            <ShowData data={data}/>
        </div>
      </>
  )
}

export default AdminPage