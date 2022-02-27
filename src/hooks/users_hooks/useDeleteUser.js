import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

export default function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation(
    (id) =>
      axios
        .delete(`http://10.0.0.247:3002/players/delete/${id}`, id)
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
}
