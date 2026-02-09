import React  from 'react';
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';

const SquarePaymentForm = ({ center, onPaymentSubmit, onError }) => {
    const locationIds  = JSON.parse(process.env.REACT_APP_SQ_LOCATIONS || '{}');
    const SQLocationId = locationIds[center.toLowerCase()] || null;
      const handlePaymentMethodSubmission = async (token, buyer) => {
        try {
            if (token.status === 'OK') {
                onPaymentSubmit(token);
            } else {
                onError(new Error(token.errors[0].message));
              }
        } catch (error) {
          console.error("Payment error:", error);
          onError(error);
        }
      };

    return (
        <div className="square-payment-form">
            <PaymentForm
                applicationId={process.env.REACT_APP_SQ_APP_ID}
                locationId={SQLocationId}
                cardTokenizeResponseReceived={handlePaymentMethodSubmission}
            >
                <CreditCard />
            </PaymentForm>

        </div>
    );
};

export default React.memo(SquarePaymentForm);