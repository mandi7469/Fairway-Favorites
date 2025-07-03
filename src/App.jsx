// imports
import { DiscProvider } from "./contexts/DiscContext";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import NavBar from "./components/NavBar";
import "./css/App.css";
import Game from "./pages/Game";
import Scorecard from "./pages/Scorecard";

// main application component that sets up overall structure including routing, global state provision and navigation
function App() {
  return (
    // DiscProvider wraps the entire app to make available to all nested components
    <DiscProvider>
      {/* navbar component */}
      <NavBar />
      <main className="main-content">
        {/* routes component container for individual route components */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/game" element={<Game />} />
          <Route path="/scorecard" element={<Scorecard />} />
        </Routes>
      </main>
    </DiscProvider>
  );
}

export default App;
