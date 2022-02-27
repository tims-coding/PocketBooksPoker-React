import axios from "axios";
import { useQuery } from "react-query";
import { useContext } from "react";
import { Context } from "../../store/store";

export default function useUsers() {
  const [token] = useContext(Context);
  return useQuery("users", () =>
    axios
      .get(`http://10.0.0.247:3002/players/${token.token}`)
      .then((res) => res.data)
  );
}
