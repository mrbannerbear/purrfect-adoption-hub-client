import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUsers = () => {

  const {
    isLoading,
    error,
    data: users = [],
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get(`https://purrfect-server.vercel.app/users`);
      return response.data;
    },
  });

  return {isLoading, error, users, refetch};
};

export default useUsers;
