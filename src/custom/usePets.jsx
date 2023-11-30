import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePets = () => {

  const {
    isLoading,
    error,
    data: pets = [],
    refetch,
  } = useQuery({
    queryKey: ["all-pets"],
    queryFn: async () => {
      const response = await axios.get(`https://purrfect-server.vercel.app/all-pets`);
      return response.data;
    },
  });

  return {isLoading, error, pets, refetch};
};

export default usePets;
