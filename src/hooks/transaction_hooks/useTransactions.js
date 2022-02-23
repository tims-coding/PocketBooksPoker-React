import axios from "axios";
import { useQuery } from "react-query";

export default function useTransactions() {
  return useQuery("transactions", () =>
    axios.get("http://10.0.0.246:3002/transactions").then((res) => res.data)
  );
}
