import React, {useState} from 'react'
import Navbar from "../components/Navbar.jsx";
import axios from 'axios';

const AddPage = () => {
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [photo, setPhoto] = useState('');

  function getMyLocation(){
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      console.log(location);
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    await axios.post('http://127.0.0.1:5000/add-new-report', {
      mail: 'worekkuba@gmail.com',
      localization: `[${location.lat}, ${location.lng}]`,
      link: photo,
      category: 'wandalizm',
      description: description,
      date: new Date().toISOString(),
      district: 'Krowodrza',
      }
    )
  }

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImageFormSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    console.log(formData)

    await axios.post('http://127.0.0.1:5000/upload_file', formData).then((response) => {
      setPhoto(response.data.link);
    });
  };

  return (
    <>
      <Navbar shown={"add"}/>
      <section className="mt-8">
        <h1 className="text-center text-4xl mb-4">
          Dodaj zgłoszenie
        </h1>

        <div className='text-center flex flex-col items-center'>
          <label>Dodaj zdjęcie</label>
          <form onSubmit={handleImageFormSubmit}>
            <input type="file" onChange={handleFileInputChange} />
            <button type="submit" className='my-4 bg-blue-400 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full'>Upload</button>
          </form>
        </div>

        <button
            onClick={getMyLocation}
            className='my-4 bg-blue-400 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full'
          >Dodaj lokalizację
        </button>

        <form className="flex flex-col max-w-xs mx-auto text-center"
          onSubmit={handleFormSubmit}
        >

          {location && 
            <p className=''>
              Twoja lokalizacja: {location.lat} {location.lng}
            </p>
          }
          <label className='mt-4'>Opis zgłoszenia</label>
          <input 
          type="text" 
          placeholder="Opis" 
          value={description} 
          onChange={ev => setDescription(ev.target.value)}/>
          <label className='mt-4'>Data zgłoszenia</label>
          <input 
            type="date" 
            name="date"
            value={date}
            placeholder="Date"
            className='my-4'
            onChange={(e) => setDate(e.target.value)}
          />
          <button 
            type="submit"
            className='my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
          >
            Dodaj to zgłoszenie
          </button>
        </form>
      </section>
    </>
  )
}

export default AddPage