
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CenterHome from "./components/CenterHome";
import "./App.css";

function App() {
  return (
    <Router basename="/charities/amrutcup">
      <div className="app-container">

        <Routes>
          {/* The home page with the dropdown */}
          <Route path="/" element={<Home />} />

          {/* Dynamic route for each center */}
          <Route path="/:centerId" element={<CenterHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

