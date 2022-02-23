import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import stripePayment from "../../api/stripe/stripe_api";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState("Pay");
  const stripe = useStripe();
  const elements = useElements();
  let navigate = useNavigate();
  let button;
  toast.configure();

  const successMessage = () => {
    toast.success("Payment Successful!");
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await stripePayment({ id: id });

        console.log("Stripe 35 | data", response);
        if (response.data.success) {
          console.log("CheckoutForm.js 25 | payment successful!");
          successMessage();
          setLoading(false);
          setPayment("Successful!");
          setTimeout(function () {
            navigate("/");
          }, 2000);
        }
      } catch (error) {
        console.log("CheckoutForm.js 28 | ", error);
        toast.error(error);
        setLoading(false);
      }
    } else {
      console.log(error.message);
      toast.error(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    button = (
      <button>
        <ThreeDots color="#fff" height={11} />
      </button>
    );
  } else {
    button = <button>{payment}</button>;
  }

  return (
    <form className="CheckoutForm" onSubmit={handleSubmit}>
      <h2>Subscription</h2>
      <div className="personal-info">
        <div className="number">1</div>
        <h5>Personal Information</h5>
      </div>
      <div className="name-field">
        <div className="first-name">
          <input type="text" name="name" placeholder="first name" />
        </div>
        <div className="last-name">
          <input type="text" name="name" placeholder="last name" />
        </div>
      </div>
      <div className="email-field">
        <input type="email" name="email" placeholder="email" />
      </div>
      <div className="company-field">
        <input type="text" name="company" placeholder="company" />
      </div>
      <div className="game-field">
        <input type="text" name="game" placeholder="name of game" />
      </div>
      <div className="personal-info">
        <div className="number">2</div>
        <h5>Payment Details</h5>
      </div>
      <div className="card-field">
        <CardElement />
      </div>
      <div className="total-field">
        <p>Total</p>
        <h4>$100</h4>
      </div>
      {button}
    </form>
  );
};
