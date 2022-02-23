import axios from "axios";
import { useQuery } from "react-query";

export default function useUsers() {
  return useQuery("users", () =>
    axios.get("http://10.0.0.246:3002/players").then((res) => res.data)
  );
}
