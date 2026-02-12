


import React, { useState, useEffect } from "react";
import LiabilityForm from "./LiabilityForm";
import SummaryPage from "./SummaryPage";

const Player = ({ centreData, onStepChange }) => {
  // Set initial step to 2 (Registration) when component mounts
  useEffect(() => {
    if (onStepChange) onStepChange(2);
  }, [onStepChange]);
  const [playerInfo, setPlayerInfo] = useState({
    centre: centreData?.centreName ?? centreData?.centre ?? "",
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    ageGroup: "",
    address: "",
    city: "",
    postalCode: "",
    tshirtSize: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    remarks: "",
    volleyballSkill: "",
  });
  const [liabilityData, setLiabilityData] = useState({});
  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  // eslint-disable-next-line
  const [resetLiabilityForm, setResetLiabilityForm] = useState(0);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMobileNumber = (number) => /^\d{10}$/.test(number);

  const validateForm = () => {
    const newErrors = {};
    if (!playerInfo.firstName.trim())
      newErrors.firstName = "First Name is required";
    if (!playerInfo.lastName.trim())
      newErrors.lastName = "Last Name is required";
    if (!validateEmail(playerInfo.email))
      newErrors.email = "Invalid email format";
    if (!validateMobileNumber(playerInfo.mobileNumber))
      newErrors.mobileNumber = "Mobile Number must be 10 digits";
    if (!playerInfo.ageGroup) newErrors.ageGroup = "Age Group is required";
    if (!liabilityData.signature)
      newErrors.liability = "Signature is required for the liability form";
    if (!playerInfo.address.trim()) newErrors.address = "Address is required";
    if (!playerInfo.city.trim()) newErrors.city = "City is required";
    if (!playerInfo.postalCode.trim())
      newErrors.postalCode = "Postal Code is required";
    if (!playerInfo.tshirtSize.trim())
      newErrors.tshirtSize = "T-Shirt Size is required";
    if (!playerInfo.emergencyContactName.trim())
      newErrors.emergencyContactName =
        "Emergency Contact Person Name is required";
    if (!playerInfo.emergencyContactNumber.trim())
      newErrors.emergencyContactNumber =
        "Emergency Contact Phone Number is required";
    if (!playerInfo.volleyballSkill)
      newErrors.volleyballSkill = "Volleyball Skill Level is required";
    // if (!playerInfo.centre.trim()) newErrors.centre = "Centre is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPlayerInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors({ ...errors, [name]: "" });
  };

  const handleLiabilitySubmit = (liabilityData) => {
    setLiabilityData(liabilityData);
    setErrors({ ...errors, liability: "" });
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (onStepChange) onStepChange(3); // Move to payment step
      setShowSummary(true);
    }
  };

  const handleConfirmSubmit = () => {};

  const handleEditInformation = () => {
    if (onStepChange) onStepChange(2); // Back to registration step
    setShowSummary(false);
  };

  if (showSummary) {
    return (
      <SummaryPage
        centreData={centreData}
        playerInfo={playerInfo}
        liabilityData={liabilityData}
        onConfirm={handleConfirmSubmit}
        onEdit={handleEditInformation}
      />
    );
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-white bg-orange-500 p-1 rounded-lg shadow-lg text-center">
        Participant Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Centre */}
        {/* <div>
          <label className="block font-semibold mb-2 text-[rgb(1,55,100)]">
            Centre <span className="text-red-500">*</span>
          </label>
          <select
            name="centre"
            value={playerInfo.centre}
            onChange={handleInputChange}
            className={`border rounded-lg p-2 w-full ${
              errors.centre ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Centre</option>
            <option value="Toronto">Toronto</option>
            <option value="Scarborough">Scarborough</option>
            <option value="Hamilton">Hamilton</option>
            <option value="Cambridge">Cambridge</option>
          </select>
          {errors.centre && (
            <p className="text-red-500 text-sm mt-1">{errors.centre}</p>
          )}
        </div> */}

        {/* First Name */}
        <div>
          <label className="block font-semibold mb-2 text-[rgb(1,55,100)]">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={playerInfo.firstName}
            onChange={handleInputChange}
            className={`border rounded-lg p-2 w-full ${
              errors.firstName ? "border-red-500" : ""
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-semibold mb-2 text-[rgb(1,55,100)]">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={playerInfo.lastName}
            onChange={handleInputChange}
            className={`border rounded-lg p-2 w-full ${
              errors.lastName ? "border-red-500" : ""
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-2 text-[rgb(1,55,100)]">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={playerInfo.email}
            onChange={handleInputChange}
            className={`border rounded-lg p-2 w-full ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block font-semibold mb-2 text-[rgb(1,55,100)]">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="mobileNumber"
            value={playerInfo.mobileNumber}
            onChange={handleInputChange}
            className={`border rounded-lg p-2 w-full ${
              errors.mobileNumber ? "border-red-500" : ""
            }`}
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
          )}
        </div>

        {/* Age Group */}
        <div>
          <label className="block font-semibold mb-2 text-[rgb(1,55,100)]">
            Age Group <span className="text-red-500">*</span>
          </label>
          <select
            name="ageGroup"
            value={playerInfo.ageGroup}
            onChange={handleInputChange}
            className={`border rounded-lg p-2 w-full ${
              errors.ageGroup ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Age Group</option>
            <option value="14-17">14-17</option>
            <option value="18-20">18-20</option>
            <option value="21-30">21-30</option>
            <option value="31-40">31-40</option>
            <option value="41-50">41-50</option>
            <option value="51-100">51-100</option>
          </select>
          {errors.ageGroup && (
            <p className="text-red-500 text-sm mt-1">{errors.ageGroup}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block font-semibold mb-2 text-[rgb(1,55,100)]">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="address"
            value={playerInfo.address}
            onChange={handleInputChange}
            className={`border rounded-lg p-2 w-full ${
              errors.address ? "border-red-500" : ""
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block font-semibold mb-2 text-[rgb(1,55,100)]">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={playerInfo.city}
            onChange={handleInputChange}
            className={`border rounded-lg p-2 w-full ${
              errors.city ? "border-red-500" : ""
            }`}
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>

        {/* Postal Code */}
        <div>
          <label className="block font-semibold mb-2 text-[rgb(1,55,100)]">
            Postal Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="postalCode"
            value={playerInfo.postalCode}
            onChange={handleInputChange}
            maxLength={7}
            className={`border rounded-lg p-2 w-full ${
              errors.postalCode ? "border-red-500" : ""
            }`}
          />
          {errors.postalCode && (
            <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
          )}
        </div>

        {/* T-Shirt Size */}
        <div>
          <label className="block font-semibold mb-2 text-[rgb(1,55,100)]">
            T-Shirt Size <span className="text-red-500">*</span>
          </label>
          <select
            name="tshirtSize"
            value={playerInfo.tshirtSize}
            onChange={handleInputChange}
            className={`border rounded-lg p-2 w-full ${
              errors.tshirtSize ? "border-red-500" : ""
            }`}
          >
            <option value="">Select T-Shirt Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="X-Large">X-Large</option>
            <option value="XX-Large">XX-Large</option>
          </select>
          {errors.tshirtSize && (
            <p className="text-red-500 text-sm mt-1">{errors.tshirtSize}</p>
          )}
        </div>

        {/* Emergency Contact Person Name */}
        <div>
          <label className="block font-semibold mb-2 text-[rgb(1,55,100)]">
            Emergency Contact Person Full Name{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="emergencyContactName"
            value={playerInfo.emergencyContactName}
            onChange={handleInputChange}
            className={`border rounded-lg p-2 w-full ${
              errors.emergencyContactName ? "border-red-500" : ""
            }`}
          />
          {errors.emergencyContactName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.emergencyContactName}
            </p>
          )}
        </div>

        {/* Emergency Phone Number */}
        <div>
          <label className="block font-semibold mb-2 text-[rgb(1,55,100)]">
            Emergency Contact Phone Number{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="emergencyContactNumber"
            value={playerInfo.emergencyContactNumber}
            onChange={handleInputChange}
            className={`border rounded-lg p-2 w-full ${
              errors.emergencyContactNumber ? "border-red-500" : ""
            }`}
          />
          {errors.emergencyContactNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.emergencyContactNumber}
            </p>
          )}
        </div>

        {/* Allergy */}
        <div className="col-span-1 text-[rgb(1,55,100)]">
          <label className="block font-semibold mb-2">Allergies/Comments</label>
          <input
            type="text"
            name="remarks"
            value={playerInfo.remarks}
            onChange={handleInputChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>

        {/* Volleyball Skill Level */}
        <div className="col-span-1 md:col-span-2">
          <label className="block font-semibold mb-2 text-[rgb(1,55,100)]">
            Volleyball Skill Level <span className="text-red-500">*</span>
          </label>
          <select
            name="volleyballSkill"
            value={playerInfo.volleyballSkill}
            onChange={handleInputChange}
            className={`border rounded-lg p-2 w-full ${
              errors.volleyballSkill ? "border-red-500" : ""
            }`}
          >
            <option value="">Select</option>
            <option value="Just for fun">Just for fun</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Professional">Professional</option>
          </select>
          {errors.volleyballSkill && (
            <p className="text-red-500 text-sm mt-1">{errors.volleyballSkill}</p>
          )}
        </div>
      </div>

      {/* Liability Form */}
      <div className="mt-4">
        <LiabilityForm
          key={resetLiabilityForm}
          onSubmit={handleLiabilitySubmit}
          playerInfo={playerInfo}
          eventInfo={{
            eventName: centreData.centreName,
            eventDate: centreData.eventInfo.date,
            location: centreData.eventInfo.location,
          }}
        />
        {errors.liability && (
          <p className="text-red-500 text-sm mt-1">{errors.liability}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 text-white bg-orange-500 rounded-lg shadow-lg hover:bg-orange-600"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Player;