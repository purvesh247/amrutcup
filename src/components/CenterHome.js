import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Player from "./player";
import logo from "../assets/amrutcup.jpg";

function CenterHome() {
  const location = useLocation();

  // Get config from router state (passed from Home.js)
  const centerInfo = location.state?.config;
  const [currentStep, setCurrentStep] = useState(1);

  if (!centerInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Event Not Found</h2>
          <p className="text-gray-600">The event you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const { title, amount, eventInfo } = centerInfo;

  const steps = [
    { number: 1, label: "Event Info", icon: "📋" },
    { number: 2, label: "Registration", icon: "✍️" },
    { number: 3, label: "Payment", icon: "💳" },
  ];

  return (
    <div className="min-h-screen py-6 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Hero Section */}
        <div className="relative mb-8 transform transition-all duration-700 animate-slide-down">
          <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur rounded-2xl shadow-2xl overflow-hidden">
            {/* Banner Image */}
            <div className="relative h-48 sm:h-56 overflow-hidden">
              <img
                src={logo}
                alt="Amrut Cup 2025"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgb(1,55,100)]/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
                  {title}
                </h1>
              </div>
            </div>

            {/* Step Indicator */}
            <div className="px-6 py-4 bg-gray-50/80 border-b">
              <div className="flex items-center justify-center gap-2 sm:gap-4">
                {steps.map((step, index) => (
                  <React.Fragment key={step.number}>
                    <div className={`flex items-center gap-2 transition-all duration-300 ${
                      currentStep >= step.number
                        ? 'text-[rgb(1,55,100)]'
                        : 'text-gray-400'
                    }`}>
                      <div className={`
                        w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base
                        transition-all duration-300 transform
                        ${currentStep === step.number
                          ? 'bg-[rgb(1,55,100)] text-white scale-110 shadow-lg'
                          : currentStep > step.number
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }
                      `}>
                        {currentStep > step.number ? '✓' : step.number}
                      </div>
                      <span className="hidden sm:block text-sm font-medium">{step.label}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-8 sm:w-16 h-1 rounded-full transition-all duration-500 ${
                        currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Event Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 transform transition-all duration-700 delay-100 animate-slide-up">
          {/* Date Card */}
          <div className="bg-white/95 backdrop-blur rounded-xl shadow-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-1">Event Date</p>
                <p className="text-[rgb(1,55,100)] font-bold">{eventInfo.date}</p>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-white/95 backdrop-blur rounded-xl shadow-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-1">Location</p>
                <p className="text-[rgb(1,55,100)] font-bold text-sm leading-tight">{eventInfo.location}</p>
              </div>
            </div>
          </div>

          {/* Fee Card */}
          <div className="bg-white/95 backdrop-blur rounded-xl shadow-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-1">Registration Fee</p>
                <p className="text-[rgb(1,55,100)] font-bold text-2xl">${amount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form Section */}
        <div className="transform transition-all duration-700 delay-200 animate-slide-up">
          <Player
            centreData={centerInfo}
            onStepChange={(step) => setCurrentStep(step)}
          />
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-white/70 text-sm">
            Questions? Contact your local BAPS center for assistance.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CenterHome;
