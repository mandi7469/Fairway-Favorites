// imports
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./css/index.css";

// get the root DOM element where the React app will be mounted
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* browserRouter for client side routing */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
