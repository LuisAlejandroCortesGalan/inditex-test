import { useQuery } from "@tanstack/react-query";

import { fetchProductDetails } from "../services/productServices";
import { Product } from "../types/index";

export const useProductDetails = (productId: string) =>
  useQuery<Product, Error>({
    queryKey: ["product", productId],
    queryFn: () => fetchProductDetails(productId),
    staleTime: 1000 * 60 * 60, // 1 hora
    gcTime: 1000 * 60 * 60, // 1 hora
    retry: 2,
    enabled: !!productId,
  });
