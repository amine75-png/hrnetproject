import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Component/Header";
import Index from "./Page/Index";
import Error from "./Component/Error";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;