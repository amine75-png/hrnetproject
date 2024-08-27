import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "dropdownpluginamine";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import TextInput from "../Component/TextInput";
import dateFormat from "../Features/dateFormat";
import DateInput from "../Plugins/DateInput";
import {
  useAppDataStore,
  useEmployeeStore,
  useUserInteractionStore,
} from "../Zustand/store";

const initialState = {
  firstName: "",
  lastName: "",
  birthStartDate: new Date(),
  hiringStartDate: new Date(),
  department: "",
  street: "",
  city: "",
  zipCode: "",
  stateAdress: "",
};

export default function AddEmployee() {
  // Utilisation des hooks Zustand
  const addEmployee = useEmployeeStore((state) => state.addEmployee);
  const departments = useAppDataStore((state) => state.department);
  const states = useAppDataStore((state) => state.states);
  const { updatePageLocation } = useUserInteractionStore();

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState(initialState);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const stateArr = states.map((elem) => elem.name);
  const employeeDataLastIndex =
    useEmployeeStore.getState().employees.at(-1)?.index || 0;

  // Mise à jour de la page actuelle et du titre de la page à l'aide de Zustand
  useEffect(() => {
    updatePageLocation({ page: "employee", pageTitle: "HRnet - Add Employee" });
  }, [updatePageLocation]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setFormErrors({ ...formErrors, [field]: null });
  };

  const validateField = (field, value, regex, errorMessage) => {
    if (!regex.test(value)) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        [field]: errorMessage,
      }));
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formContainsError = false;

    // Exemple de validation
    formContainsError =
      !validateField(
        "firstName",
        formData.firstName,
        /^(?=[A-Za-z- ]{2,18}$)[A-Za-z]+(?:[- ]?[A-Za-z]+)*$/,
        "Invalid first name format"
      ) || formContainsError;
    formContainsError =
      !validateField(
        "lastName",
        formData.lastName,
        /^(?=[A-Za-z- ]{2,18}$)[A-Za-z]+(?:[- ]?[A-Za-z]+)*$/,
        "Invalid last name format"
      ) || formContainsError;

    if (formContainsError) {
      console.log("Form is not correct");
      alert("Form is not correct");
      return;
    }

    const employee = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: dateFormat(formData.birthStartDate),
      startDate: dateFormat(formData.hiringStartDate),
      department: formData.department,
      street: formData.street,
      city: formData.city,
      state: formData.stateAdress,
      zipCode: formData.zipCode,
      index: employeeDataLastIndex + 1,
    };

    addEmployee(employee);
    setModalIsOpen(true);
  };

  const resetForm = () => {
    setFormData(initialState);
    setFormErrors({});
    setModalIsOpen(false);
  };

  return (
    <>
      <Modal show={modalIsOpen} onHide={resetForm}>
        <Modal.Header closeButton>
          <Modal.Title>Employee successfully added</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Employee has been successfully added to the system!
        </Modal.Body>
        <Modal.Footer>
          <button onClick={resetForm}>Close</button>
        </Modal.Footer>
      </Modal>

      <main className="addEmployeeMain">
        <h1>Add Employee</h1>
        <div className="formContainer">
          <form id="formAddEmployee" onSubmit={handleSubmit}>
            <div className="employeeIdInfo formAddEmployee__sectionContainer">
              <p className="formTitle">Identity Information</p>
              <div className="formInfosGroup">
                <div className="employeeIdInfo__name">
                  <TextInput
                    label="First Name"
                    id="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(value) => handleInputChange("firstName", value)}
                    isValid={!formErrors.firstName}
                    errorMessage={formErrors.firstName}
                  />
                  <TextInput
                    label="Last Name"
                    id="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(value) => handleInputChange("lastName", value)}
                    isValid={!formErrors.lastName}
                    errorMessage={formErrors.lastName}
                  />
                </div>
                <DateInput
                  label="Birth Date"
                  id="birthStartDate"
                  selected={formData.birthStartDate}
                  onChange={(date) => handleInputChange("birthStartDate", date)}
                  isValid={!formErrors.birthStartDate}
                />
              </div>
            </div>

            <div className="employeeEnterpriseInfo  formAddEmployee__sectionContainer">
              <p className="formTitle">Employee Information</p>
              <div className="formInfosGroup">
                <DateInput
                  label="StartDate"
                  id="hiringStartDate"
                  selected={formData.hiringStartDate}
                  onChange={(date) =>
                    handleInputChange("hiringStartDate", date)
                  }
                  isValid={!formErrors.hiringStartDate}
                />
                <Dropdown
                  label="Department"
                  id="department"
                  dropdownData={departments}
                  onChange={(selection) =>
                    handleInputChange("department", selection)
                  }
                />
              </div>
            </div>

            <div className="employeeAddressInfo  formAddEmployee__sectionContainer">
              <p className="formTitle">Employee Address</p>
              <div className="formInfosGroup">
                <Dropdown
                  label="State"
                  id="stateAdress"
                  dropdownData={stateArr}
                  onChange={(selection) =>
                    handleInputChange("stateAdress", selection)
                  }
                />
                <TextInput
                  label="Street"
                  id="street"
                  placeholder="Street"
                  value={formData.street}
                  onChange={(value) => handleInputChange("street", value)}
                  isValid={!formErrors.street}
                  errorMessage={formErrors.street}
                />
                <div className="cityZipContainer">
                  <TextInput
                    label="City"
                    id="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={(value) => handleInputChange("city", value)}
                    isValid={!formErrors.city}
                    errorMessage={formErrors.city}
                  />
                  <TextInput
                    label="Zipcode"
                    id="zipCode"
                    placeholder="Zipcode"
                    value={formData.zipCode}
                    onChange={(value) => handleInputChange("zipCode", value)}
                    isValid={!formErrors.zipCode}
                    errorMessage={formErrors.zipCode}
                  />
                </div>
              </div>
            </div>

            <div className="submitButtonContainer">
              <button type="submit" id="submitFormButton">
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
