import React, { useEffect, useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import "../App.css";
import DataTableComponent from "../Plugins/DataTable";
import { useUserInteractionStore } from "../Zustand/store";

const Index = () => {
  const { updatePageLocation } = useUserInteractionStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updatePageLocation({
      page: "index",
      pageTitle: "HRnet - Current Employees",
    });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [updatePageLocation]);

  return (
    <main className="indexMain">
      <h1>Current Employees</h1>
      <section className="dataTableContainer">
        {loading ? (
          <div className="loaderContainer">
            <BarLoader color="#4A90E2" loading={loading} />
          </div>
        ) : (
          <DataTableComponent />
        )}
      </section>
    </main>
  );
};

export default Index;
