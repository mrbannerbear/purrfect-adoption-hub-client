import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useDonations = () => {

  const {
    isLoading,
    error,
    data: donations = [],
    refetch,
  } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:4200/donations`);
      return response.data;
    },
  });

  return {isLoading, error, donations, refetch};
};

export default useDonations;
