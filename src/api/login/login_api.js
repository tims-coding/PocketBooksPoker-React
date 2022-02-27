import axios from "axios";

export default async function attemptLogin(loginDetails) {
  const res = await axios.post("http://10.0.0.247:3002/login", loginDetails);
  return res;
}
