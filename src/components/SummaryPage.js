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

  const centerName = centreData.centreName;
  const registrationFee = centreData.amount;
  const lateFee = centreData.lateFee;

  // const calculateTotalFee = () => registrationFee;
  // const calculateTotalFee = () => {
  //   if (playerInfo.participantType === "volunteer-free") {
  //     return 0;
  //   }
  //   const currentDate = new Date();
  //   return currentDate <= regularRegistrationEndDate ? regularFee : lateFee;
  // };
  const calculateTotalFee = () => {
    if (centreData.lateFeeFeature) {
      const currentDate = new Date();
      const lateFeeStartDate = new Date(centreData.lateFeeStart);

      if (currentDate >= lateFeeStartDate) {
        return lateFee;
      } else {
        return registrationFee;
      }
    }
    return registrationFee;
  }

  // const totalFee = 30;
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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-[rgb(1,55,100)]">
        Registration Summary
      </h2>

      {/* Player Section */}
      <section className="mb-8 border-b pb-6">
        <h3 className="text-2xl font-semibold mb-4 text-[rgb(1,55,100)]">
          Player Information
        </h3>
        <div className="border rounded-lg p-6 bg-gray-50 shadow-md">
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
        <div className="flex justify-center mt-6">
          <button
            onClick={onEdit}
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition duration-300"
            disabled={
              paymentStatus === "success" || paymentStatus === "processing"
            }
          >
            Edit Information
          </button>
        </div>
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
                  Payment is Secured with SQUARE Payment. BAPS Inc does
                  not store Credit Card information.
                </p>
              </>
            )}
            {paymentStatus === "processing" && (
              <p className="text-blue-500">Processing payment...</p>
            )}
            {paymentStatus === "success" && (
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4 text-green-600">
                  Registration Successful!
                </h3>
                <p className="text-lg">
                  Your confirmation ID is:{" "}
                  <span className="font-bold">{confirmationId}</span>
                </p>
                <p className="mt-2">Please save this ID for your records.</p>
                <button
                  onClick={() => window.open(receiptUrl, "_blank")}
                  className="mt-6 bg-[rgb(1,55,100)] text-white px-6 py-2 rounded hover:from-orange-400 hover:to-slate-700 transition duration-300"
                >
                  Click Here for Payment Confirmation
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
