import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Dropdown.css";

const Dropdown = ({ dropdownData, onChange, onReset = false, name, id }) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [dropdownSelection, setDropdownSelection] = useState(
    dropdownData[0] || ""
  );
  const [filteredDropdownData, setFilteredDropdownData] =
    useState(dropdownData);
  const dropdownRef = useRef(null);

  const toggleDropdown = useCallback(() => {
    setDropdownIsOpen((prev) => !prev);
  }, []);

  const handleSelectionClick = (e) => {
    const selection = e.target.innerText;
    setDropdownSelection(selection);
    toggleDropdown();
    onChange(selection);
  };

  const filterData = (e) => {
    const search = e.target.value.toLowerCase();
    setFilteredDropdownData(
      dropdownData.filter((elem) => String(elem).toLowerCase().includes(search))
    );
  };

  useEffect(() => {
    if (onReset) {
      setDropdownSelection(dropdownData[0] || "");
      setFilteredDropdownData(dropdownData);
      setDropdownIsOpen(false);
    }
  }, [onReset, dropdownData]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownIsOpen(false);
      }
    };

    if (dropdownIsOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownIsOpen]);

  return (
    <div className="DropdownWrapper BaseContainer" ref={dropdownRef}>
      <input
        className="InputBtn"
        type="button"
        value={dropdownSelection}
        onClick={toggleDropdown}
        name={name}
        id={id}
      />
      {dropdownIsOpen && (
        <div className="DropdownMenu BaseContainer">
          <input
            className="SearchBar"
            type="text"
            placeholder="Search"
            onChange={filterData}
          />
          {filteredDropdownData.length > 0 ? (
            filteredDropdownData.map((elem, index) => (
              <div
                className="DropdownSelectionContainer"
                key={`dropdownMenu__selectionContainer_${index}`}
                onClick={handleSelectionClick}
              >
                <p className="DropdownSelection">{elem}</p>
              </div>
            ))
          ) : (
            <p className="NoDataErrMsg">No content to display after search</p>
          )}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  dropdownData: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
};

export default Dropdown;
