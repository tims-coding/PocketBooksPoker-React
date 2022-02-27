import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

export const fetchUser = (userId) =>
  axios
    .get(`http://10.0.0.247:3002/players/user/${userId}`)
    .then((res) => res.data);

export default function useUser(userId) {
  const queryClient = useQueryClient();
  return useQuery(["users", userId], () => fetchUser(userId), {
    initialData: () => {
      return queryClient.getQueryData("users")?.find((d) => d.id === userId);
    },
    initialStale: true,
  });
}
