import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/context/ThemeContext";
import Header from "./components/header/Header";
import Country from "./components/country/Country";
import Countries from "./components/countries";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Countries />} />
          <Route path="/countries/:name" element={<Country />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
