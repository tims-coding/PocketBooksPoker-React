import axios from "axios";
import { useQuery } from "react-query";
import { useContext } from "react";
import { Context } from "../../store/store";

export default function useTransactions() {
  const [token] = useContext(Context);
  return useQuery("transactions", () =>
    axios
      .get(`http://10.0.0.247:3002/transactions/${token.token}`)
      .then((res) => res.data)
  );
}
