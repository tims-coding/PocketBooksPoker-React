import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

export default function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation(
    (newUser) =>
      axios
        .post("http://10.0.0.246:3002/players/post", newUser)
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
}

// export default function useCreatePost() {
//   return useMutation(
//     (values) =>
//       axios
//         .post("http://10.0.0.246:3002/users/post", values)
//         .then((res) => res.data),
//     {
//       onMutate: (newPost) => {
//         const oldPosts = queryCache.getQueryData("users");

//         if (queryCache.getQueryData("users")) {
//           queryCache.setQueryData("users", (old) => [...old, newPost]);
//         }

//         return () => queryCache.setQueryData("users", oldPosts);
//       },
//       onError: (error, _newPost, rollback) => {
//         console.error(error);
//         if (rollback) rollback();
//       },
//       onSettled: () => {
//         queryCache.invalidateQueries("users");
//       },
//     }
//   );
// }
