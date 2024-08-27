import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Component/Header";
import Index from "./Page/Index";
import Error from "./Component/Error";
import AddEmployee from "./Page/AddEmployee";
import { useUserInteractionStore } from "./Zustand/store";

function App() {
  const pageTitle = useUserInteractionStore((state) => state.pageTitle);
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<Error />} />
        <Route path="/addEmployee" element={<AddEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;