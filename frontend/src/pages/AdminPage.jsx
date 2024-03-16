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
    useEffect(() => {
        setData(['"numberOfReports" : "100"'])
        fetchData()
    }, [])
  return (
      <>
        <Navbar />
        <div className={"container mx-auto"}>
          <h1 className={"text-2xl font-bold text-center"}>Zarządzaj zgłoszeniami</h1>
            <ShowData data={data}/>
        </div>
      </>
  )
}

export default AdminPage