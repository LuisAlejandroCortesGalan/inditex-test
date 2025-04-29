import { useQuery } from "@tanstack/react-query";

import { fetchProductDetails } from "../services/productServices";

export const useProductDetails = (productId: string) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductDetails(productId),
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 2,
    enabled: !!productId,
  });
};
