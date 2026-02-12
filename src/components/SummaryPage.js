import React, { useState } from "react";
import SquarePaymentForm from "./SquarePaymentForm";

const SummaryPage = ({
  centreData,
  playerInfo,
  liabilityData,
  onConfirm,
  onEdit,
}) => {
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [errorMessage, setErrorMessage] = useState("");
  const [receiptUrl, setReceiptUrl] = useState("");
  const [confirmationId, setConfirmationId] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const centerName = centreData?.centreName ?? centreData?.centre ?? "";
  const regularRegistrationEndDate = new Date(centreData?.lateFeeStart || 0);
  const regularFee = centreData?.amount ?? 0;
  const lateFee = centreData?.lateFee;

  const calculateTotalFee = () => {
    if (playerInfo.participantType === "volunteer-free") {
      return 0;
    }
    const currentDate = new Date();
    if (lateFee != null && currentDate > regularRegistrationEndDate) {
      return lateFee;
    }
    return regularFee;
  };

  const totalFee = calculateTotalFee();

  const backendHost = process.env.REACT_APP_BACKENDHOST;

  const handlePaymentSubmit = async (token) => {
    token = token.token;
    setPaymentStatus("processing");
    try {
      const response = await fetch(`${backendHost}/registration/amrutcup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          amount: totalFee * 100,
          playerInfo,
          liabilityData,
          centerName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPaymentStatus("success");
        setConfirmationId(data.confirmationId);
        onConfirm(data.registrationId);
        setReceiptUrl(data.receiptUrl);
      } else if (response.status === 400) {
        setPaymentStatus("error");
        setErrorMessage(
          data.error ||
            "Invalid payment request. Please check your information and try again."
        );
      } else {
        throw new Error(data.error || "Payment processing failed");
      }
    } catch (error) {
      setPaymentStatus("error");
      setErrorMessage(handleSQPaymentError(error));
    }
  };

  const handleSubmit = async () => {
    setPaymentStatus("processing");
    try {
      const response = await fetch(`${backendHost}/registration/yogicup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 0,
          playerInfo,
          liabilityData,
          centerName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPaymentStatus("success");
        setConfirmationId(data.confirmationId);
        onConfirm(data.registrationId);
        // setReceiptUrl(data.receiptUrl);
      } else if (response.status === 400) {
        setPaymentStatus("error");
        setErrorMessage(
          data.error || "Please check your information and try again."
        );
      } else {
        throw new Error(
          data.error || "Something went wrong, please try again!"
        );
      }
    } catch (error) {
      setPaymentStatus("error");
      setErrorMessage(handleSQPaymentError(error));
    }
  };

  function handleSQPaymentError(error) {
    let userMessage = "We're unable to process your payment. Please try again.";
    return userMessage;
  }

  const handleRetry = () => {
    setPaymentStatus("pending");
    setErrorMessage("");
    setRetryCount((prev) => prev + 1);
  };

  const handlePaymentError = (error) => {
    setPaymentStatus("error");
    setErrorMessage(error.message);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-white/95 backdrop-blur shadow-2xl rounded-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white bg-gradient-to-r from-[rgb(1,55,100)] to-[rgb(1,75,130)] p-4 rounded-xl shadow-lg flex items-center justify-center gap-3">
        <span className="text-2xl">💳</span>
        Registration Summary
      </h2>

      {/* Player Section */}
      <section className="mb-8 pb-6">
        <h3 className="text-xl font-semibold mb-4 text-[rgb(1,55,100)] flex items-center gap-2">
          <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">👤</span>
          Player Information
        </h3>
        <div className="rounded-xl p-6 bg-gradient-to-br from-gray-50 to-gray-100 shadow-inner border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8">
            <div className="flex flex-col">
              <span className="font-semibold text-[rgb(1,55,100)]">
                Full Name
              </span>
              <span className="text-gray-800">
                {playerInfo.firstName} {playerInfo.lastName}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[rgb(1,55,100)]">
                Cell Phone
              </span>
              <span className="text-gray-800">{playerInfo.mobileNumber}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[rgb(1,55,100)]">Email</span>
              <span className="text-gray-800">{playerInfo.email}</span>
            </div>
            {/* <div className="flex flex-col">
              <span className="font-semibold text-[rgb(1,55,100)]">Mandal</span>
              <span className="text-gray-800">{playerInfo.mandal}</span>
            </div> */}
            <div className="flex flex-col">
              <span className="font-semibold text-[rgb(1,55,100)]">
                Tshirt Size
              </span>
              <span className="text-gray-800">
                {playerInfo?.tshirtSize || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[rgb(1,55,100)]">
                Player Skill
              </span>
              <span className="text-gray-800">
                {playerInfo?.volleyballSkill || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[rgb(1,55,100)]">
                Liability Agreed By
              </span>
              <span className="text-gray-800">
                {liabilityData?.signature || "Not provided"}
              </span>
            </div>
            {/* <div className="flex flex-col">
              <span className="font-semibold text-[rgb(1,55,100)]">
                Is Minor (Under 18)?
              </span>
              <span className="text-gray-800">
                {playerInfo?.minor ? playerInfo.minor.toUpperCase() : "Not provided"}
              </span>
            </div> */}
            {/* <div className="flex flex-col">
              <span className="font-semibold text-[rgb(1,55,100)]">
                Transportation
              </span>
              <span className="text-gray-800">
                {playerInfo?.trasportationOption || "Not provided"}
              </span>
            </div> */}
          </div>
        </div>
        {(paymentStatus === "pending" || paymentStatus === "error") && (
          <div className="flex justify-center mt-6">
            <button
              onClick={onEdit}
              className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition duration-300 disabled:opacity-50"
              disabled={paymentStatus === "processing"}
            >
              Edit Information
            </button>
          </div>
        )}
      </section>

      <section className="mb-8">
        {totalFee > 0 && (
          <>
            {paymentStatus === "pending" && (
              <>
                <h3 className="text-2xl font-semibold mb-4 text-[rgb(1,55,100)]">
                  Credit Card Information
                </h3>
                <SquarePaymentForm
                  key={`payment-form-${retryCount}`}
                  center={centerName}
                  onPaymentSubmit={handlePaymentSubmit}
                  onError={handlePaymentError}
                />
                <p className="text-sm text-gray-600 mt-2">
                  Payment is Secured with SQUARE Payment. BAPS Charities does
                  not store Credit Card information.
                </p>
              </>
            )}
            {paymentStatus === "processing" && (
              <p className="text-blue-500">Processing payment...</p>
            )}
            {paymentStatus === "success" && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-green-600">
                  Registration Successful! 🎉
                </h3>
                <p className="text-lg text-gray-700 mb-2">
                  Your confirmation ID is:
                </p>
                <p className="text-2xl font-bold text-[rgb(1,55,100)] bg-gray-100 inline-block px-6 py-2 rounded-lg mb-4">
                  {confirmationId}
                </p>
                <p className="text-gray-500 mb-6">Please save this ID for your records.</p>
                <button
                  onClick={() => window.open(receiptUrl, "_blank")}
                  className="bg-gradient-to-r from-[rgb(1,55,100)] to-[rgb(1,75,130)] text-white px-8 py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Payment Receipt
                </button>
              </div>
            )}
            {paymentStatus === "error" && (
              <div className="text-center">
                <h3 className="text-red-600 font-semibold">Payment Failed</h3>
                <p className="text-red-500">{errorMessage}</p>
                <button
                  onClick={handleRetry}
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                  Retry Payment
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Free */}
      <section className="mb-8">
        {paymentStatus === "pending" && totalFee === 0 && (
          <>
            <h3 className="text-2xl font-semibold mb-4 text-[rgb(1,55,100)]">
              Credit Card Information
            </h3>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Submit Registration
            </button>
          </>
        )}
        {paymentStatus === "processing" && totalFee === 0 && (
          <p className="text-blue-500">Processing payment...</p>
        )}
        {paymentStatus === "success" && totalFee === 0 && (
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4 text-green-600">
              Registration Successful!
            </h3>
            <p className="text-lg">
              Your confirmation ID is:{" "}
              <span className="font-bold text-[rgb(1,55,100)]">
                {confirmationId}
              </span>
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default SummaryPage;
