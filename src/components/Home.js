import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/amrutcup.jpg";


const Home = () => {
  const navigate = useNavigate();

  const centers = [
    // { value: "Scarborough", label: "Scarborough" },
    // { value: "brandon", label: "Brandon" },
    // { value: "calgary", label: "Calgary" },
    // { value: "cambridge", label: "Cambridge" },
    // { value: "edmonton", label: "Edmonton" },
    // { value: "hamilton", label: "Hamilton" },
    // { value: "toronto", label: "Toronto" }
    // { value: "regina", label: "Regina" }
  ];

  const [selectedCenter, setSelectedCenter] = useState(centers[0]?.value); // Store selected center

  const handleCenterChange = (e) => {
    setSelectedCenter(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedCenter) {
      navigate(`/${selectedCenter}`);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url('/yogicup/b2.webp')`,
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <div className="w-full max-w-xl space-y-8">
        {/* Wrapper for logo and content */}
        <div className="flex flex-col items-center space-y-4">
          {/* Logo */}
          <img src={logo} alt="BAPS Canada Amrut Cup" className="h-56 w-auto" />


          {/* Box with welcome text */}
          <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-6 sm:p-8 w-full">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[rgb(1,55,100)]  text-center">
              Amrut Cup - Registration Portal<br />
            </h2>
            <div className="space-y-4">
              <p className="text-lg mb-4 text-gray-700 text-center">
                Please select event:
              </p>
              <select
                value={selectedCenter}
                // disabled
                onChange={handleCenterChange}
                className="w-full border border-gray-300 p-3 rounded-lg mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Event Center</option>
                {centers.map((center) => (
                  <option key={center.value} value={center.value}>
                    {center.label}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSubmit}
                className="w-full bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedCenter}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
