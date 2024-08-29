import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import "./App.css";
import Header from "./Component/Header";
import { useUserInteractionStore } from "./Zustand/store";


const Index = lazy(() => import("./Page/Index"));
const Error = lazy(() => import("./Component/Error"));
const AddEmployee = lazy(() => import("./Page/AddEmployee"));

function App() {
  const pageTitle = useUserInteractionStore((state) => state.pageTitle);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <Router>
      <Header />
      <Suspense fallback={<ClipLoader color="#36d7b7" size={50} />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<Error />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
