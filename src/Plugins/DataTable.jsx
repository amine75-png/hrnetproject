import React from "react";
import DataTable from "react-data-table-component";
import "../App.css";
import { useEmployeeStore, useSearchStore } from "../Zustand/store";

const columns = [
  {
    name: "First Name",
    selector: (row) => row.firstName,
    sortable: true,
  },
  {
    name: "Last Name",
    selector: (row) => row.lastName,
    sortable: true,
  },
  {
    name: "Start Date",
    selector: (row) => row.startDate,
    sortable: true,
  },
  {
    name: "Date of Birth",
    selector: (row) => row.dateOfBirth,
    sortable: true,
  },
  {
    name: "Department",
    selector: (row) => row.department,
    sortable: true,
  },
  {
    name: "Street",
    selector: (row) => row.street,
    sortable: true,
  },
  {
    name: "City",
    selector: (row) => row.city,
    sortable: true,
  },
  {
    name: "State",
    selector: (row) => row.state,
    sortable: true,
  },
  {
    name: "Zip Code",
    selector: (row) => row.zipCode,
    sortable: true,
  },
];

export default function DataTableComponent() {
  const search = useSearchStore((state) => state.searchQuery);
  const employees = useEmployeeStore((state) => state.employees);
  const updateSearch = useSearchStore((state) => state.updateSearch);

  const filteredData = employees.filter((elem) => {
    return (
      elem.firstName.toLowerCase().includes(search) ||
      elem.lastName.toLowerCase().includes(search) ||
      elem.department.toLowerCase().includes(search) ||
      elem.street.toLowerCase().includes(search) ||
      elem.city.toLowerCase().includes(search) ||
      elem.state.toLowerCase().includes(search) ||
      elem.zipCode.includes(search) ||
      elem.startDate.includes(search) ||
      elem.dateOfBirth.includes(search)
    );
  });

  function handleSearchChange(e) {
    const searchValue = e.target.value.toLowerCase();
    updateSearch(searchValue);
  }

  return (
    <>
      <div className="searchBoxContainer">
        <input
          type="text"
          name="searchBox"
          id="searchBox"
          placeholder="Name, Address, Department..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {filteredData.length > 0 ? (
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          className="dataTableComponent"
        />
      ) : (
        <div className="noData">No Data to display</div>
      )}
    </>
  );
}
