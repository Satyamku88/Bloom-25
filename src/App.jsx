import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Bloom from "./pages/Bloom";
import SymptomChecker from "./pages/SymptomChecker";
import MedicineReminder from "./pages/MedicineReminder";
import EducationalHub from "./pages/EducationalHub";
import EmergencySOS from "./pages/EmergencySOS";
import Teleconsultation from "./pages/Teleconsultation";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the Home page */}
          <Route path="/" element={<Home />} />

          {/* Add routes for all the other pages here */}
          <Route path="/bloom" element={<Bloom />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/medicine-reminder" element={<MedicineReminder />} />
          <Route path="/educational-hub" element={<EducationalHub />} />
          <Route path="/emergency-sos" element={<EmergencySOS />} />
          <Route path="/teleconsultation" element={<Teleconsultation />} />

          {/* You can add a 404 catch-all route here if you want */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
