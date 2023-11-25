import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePets = () => {

    // if(search === "" || !search){ search = "?qa=all"}

  const {
    isLoading,
    error,
    data: pets = [],
    refetch,
  } = useQuery({
    queryKey: ["all-pets"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:4200/all-pets`);
      return response.data;
    },
  });

  return {isLoading, error, pets, refetch};
};

export default usePets;
