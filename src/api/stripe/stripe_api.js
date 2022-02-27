import axios from "axios";

export default async function stripePayment(paymentDetails) {
  const res = await axios.post(
    "http://10.0.0.247:3002/stripe/charge",
    paymentDetails
  );
  return res;
}
