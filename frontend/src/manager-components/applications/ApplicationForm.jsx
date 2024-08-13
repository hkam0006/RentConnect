import React, { useState } from "react";
import "./ApplicationForm.css";
const ApplicationForm = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleViewClick = () => {
    setIsPopupVisible(true);
  };

  const handleCloseClick = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Application Details</h2>
        <form className="application-form">
          {/* Personal Information Section */}
          <div className="form-section">
            <h3>Personal Information</h3>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" />

            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" />

            <label htmlFor="mobileNumber">Mobile Number</label>
            <input type="tel" id="mobileNumber" name="mobileNumber" />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />

            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" name="dob" />
          </div>

          {/* Identity Documents Section */}
          <div className="form-section">
            <h3>Identity Documents</h3>
            {/* Passport */}
            <label htmlFor="passport">Passport</label>
            <input type="text" id="passport" name="passport" />

            {/* Birth Certificate */}
            <label htmlFor="birthCertificate">Birth Certificate</label>
            <input type="text" id="birthCertificate" name="birthCertificate" />
          </div>

          {/* Income Section */}
          <div className="form-section">
            <h3>Income</h3>
            <label htmlFor="salary">Salary</label>
            <input type="number" id="salary" name="salary" />

            <label htmlFor="rentalIncome">Rental Income</label>
            <input type="number" id="rentalIncome" name="rentalIncome" />
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleCloseClick}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
