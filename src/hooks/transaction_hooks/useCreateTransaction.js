import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

export default function useCreateTransaction() {
  const queryClient = useQueryClient();
  return useMutation(
    (newTransaction) =>
      axios
        .post("http://10.0.0.246:3002/transactions/post", newTransaction)
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("transactions");
      },
    }
  );
}
