import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/amrutcup.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [selectedCenter, setSelectedCenter] = useState("");
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Fetch centers from API on mount (no frontend hardcoding)
  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKENDHOST}/registration/amrutcup/centres`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const formatted = data.map((item) => ({
          value: item.centre,
          label: item.data?.title || item.centre,
          config: item.data,
        }));

        setCenters(formatted);
        if (formatted.length > 0) {
          setSelectedCenter(formatted[0].value);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCenters();
  }, []);

  const handleCenterChange = (e) => {
    setSelectedCenter(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedCenter) {
      const selectedConfig = centers.find(
        (c) => c.value === selectedCenter
      )?.config;
      navigate(`/${selectedCenter}`, { state: { config: selectedConfig } });
    }
  };

  // Background Component
  const Background = ({ children }) => (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgb(1,45,80)] via-[rgb(1,55,100)] to-[rgb(1,35,70)]" />

      {/* Animated Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-400/5 rounded-full blur-3xl" />
      </div>

      {/* Volleyball Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-6xl">🏐</div>
        <div className="absolute top-40 right-20 text-4xl">🏐</div>
        <div className="absolute bottom-32 left-1/4 text-5xl">🏐</div>
        <div className="absolute bottom-20 right-10 text-3xl">🏐</div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );

  // Loading State
  if (loading) {
    return (
      <Background>
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-white/20 rounded-full mx-auto" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-white/80 font-medium mt-6 text-lg">Loading events...</p>
        </div>
      </Background>
    );
  }

  // Error State
  if (error) {
    return (
      <Background>
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md text-center transform transition-all duration-500 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Something Went Wrong</h2>
          <p className="text-gray-600 mb-6">We couldn't load the events. Please try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
          >
            Try Again
          </button>
        </div>
      </Background>
    );
  }

  // No Events Available
  if (centers.length === 0) {
    return (
      <Background>
        <div className="w-full max-w-lg">
          <div className={`flex flex-col items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <img
              src={logo}
              alt="BAPS Canada Amrut Cup"
              className="h-48 w-auto rounded-2xl shadow-2xl mb-8 ring-4 ring-white/20"
            />
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[rgb(1,55,100)] mb-3">No Events Available</h2>
              <p className="text-gray-600">There are currently no events open for registration. Please check back later.</p>
            </div>
          </div>
        </div>
      </Background>
    );
  }

  // Main Content
  return (
    <Background>
      <div className="w-full max-w-lg">
        <div className={`flex flex-col items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Logo with glow effect */}
          <div className="relative mb-8 group">
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            <img
              src={logo}
              alt="BAPS Canada Amrut Cup"
              className="relative h-48 sm:h-56 w-auto rounded-2xl shadow-2xl ring-4 ring-white/20 transform group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>

          {/* Main Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full transform transition-all duration-500 hover:shadow-3xl">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                <span className="text-lg">🏐</span>
                <span>Volleyball Tournament</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[rgb(1,55,100)] leading-tight">
                Amrut Cup
              </h1>
              <p className="text-gray-500 mt-2">Registration Portal</p>
            </div>

            {/* Event Selection */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[rgb(1,55,100)] mb-2">
                  Select Your Event
                </label>
                <div className="relative">
                  <select
                    value={selectedCenter}
                    onChange={handleCenterChange}
                    className="w-full appearance-none bg-gray-50 border-2 border-gray-200 p-4 pr-12 rounded-xl text-gray-700 font-medium focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 cursor-pointer"
                  >
                    <option value="">Choose an event...</option>
                    {centers.map((center) => (
                      <option key={center.value} value={center.value}>
                        {center.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Info Note */}
              <div className="flex items-start gap-3 bg-blue-50 rounded-xl p-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-blue-700">
                  If your event doesn't appear in the list, registration may have reached capacity.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleSubmit}
                  disabled={!selectedCenter}
                  className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-400 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group enabled:hover:shadow-xl enabled:hover:-translate-y-0.5"
                >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Continue to Registration
                  <svg className="w-5 h-5 transform group-enabled:group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 opacity-0 group-enabled:group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              Questions? Contact your local BAPS center
            </p>
            <p className="text-white/40 text-xs mt-2">
              BAPS Swaminarayan Sanstha Canada
            </p>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default Home;
