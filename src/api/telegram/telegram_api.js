import axios from "axios";

export default async function telegramMessage(messageData) {
  const res = await axios.post("http://10.0.0.246:3002/telegram", messageData);
  return res.data;
}
