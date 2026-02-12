import React from "react";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";

const SquarePaymentForm = ({ center, onPaymentSubmit, onError }) => {
  const applicationId = process.env.REACT_APP_SQ_APP_ID;
  let locationIds = {};
  try {
    locationIds = JSON.parse(process.env.REACT_APP_SQ_LOCATIONS || "{}");
  } catch {
    locationIds = {};
  }
  const safeCenter = (center ?? "").toString().trim().toLowerCase();
  const SQLocationId = safeCenter ? (locationIds[safeCenter] || null) : null;

  const handlePaymentMethodSubmission = async (token, buyer) => {
    try {
      if (token.status === "OK") {
        onPaymentSubmit(token);
      } else {
        onError(new Error(token.errors?.[0]?.message ?? "Payment failed"));
      }
    } catch (error) {
      console.error("Payment error:", error);
      onError(error);
    }
  };

  // Don't render Square SDK when config is missing — it throws RenderErrorScreen
  if (!applicationId || !SQLocationId) {
    return (
      <div className="square-payment-form p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
        <p className="font-medium">
          Payment is not configured for this event location.
        </p>
        <p className="text-sm mt-1">
          Please contact your local BAPS center to complete registration or pay in person.
        </p>
      </div>
    );
  }

  return (
    <div className="square-payment-form">
      <PaymentForm
        applicationId={applicationId}
        locationId={SQLocationId}
        cardTokenizeResponseReceived={handlePaymentMethodSubmission}
      >
        <CreditCard />
      </PaymentForm>
    </div>
  );
};

export default React.memo(SquarePaymentForm);