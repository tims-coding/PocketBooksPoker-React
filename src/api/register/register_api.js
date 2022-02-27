import axios from "axios";

export default async function attemptRegister(registerDetails) {
  const res = await axios.post(
    "http://10.0.0.247:3002/register",
    registerDetails
  );
  return res;
}
