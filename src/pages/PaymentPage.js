import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "../components/payments/CheckoutForm";

const PUBLIC_KEY =
  "pk_test_51KW0J1Gpf3FKB6kYbMNUc3XXooJIBa0RbZRubEKt4JS0UYOcdRTK7BgOM6Lm4HMf0l7nfntPD5wdKRaxQ7e3KLO500ekaYSap0";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const PaymentPage = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentPage;
