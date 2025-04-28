import { useQuery } from "@tanstack/react-query";

import { fetchProducts } from "../Api/services";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 2,
  });
};
