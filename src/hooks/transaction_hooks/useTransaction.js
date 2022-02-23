import axios from "axios";
import { useQuery } from "react-query";

export default function useTransaction(userId) {
  return useQuery(["transactions", userId], () =>
    axios
      .get(`http://10.0.0.246:3002/transactions/${userId}`)
      .then((res) => res.data)
  );
}
