import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { DiscProvider } from "./contexts/DiscContext";
import NavBar from "./components/NavBar";
import "./css/App.css";

function App() {
  return (
    <DiscProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </DiscProvider>
  );
}

export default App;
