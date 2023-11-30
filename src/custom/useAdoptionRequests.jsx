import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAdoptionRequests = () => {

  const {
    isLoading,
    error,
    data: requests = [],
    refetch,
  } = useQuery({
    queryKey: ["adoption-requests"],
    queryFn: async () => {
      const response = await axios.get(`https://purrfect-server.vercel.app/adoption-requests`);
      return response.data;
    },
  });

  return {isLoading, error, requests, refetch};
};

export default useAdoptionRequests;
