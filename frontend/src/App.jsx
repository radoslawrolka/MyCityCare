import { BrowserRouter,Routes,Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AddPage from "./pages/AddPage.jsx";
import MapPage from "./pages/MapPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
