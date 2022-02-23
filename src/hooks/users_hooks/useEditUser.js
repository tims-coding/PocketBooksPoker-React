import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

export default function useEditUser() {
  const queryClient = useQueryClient();
  return useMutation(
    (newUser) =>
      axios
        .put(`http://10.0.0.246:3002/players/edit/${newUser.id}`, newUser)
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
      onError: () => {
        console.log("error");
      },
    }
  );
}
