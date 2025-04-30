import { useQuery } from "@tanstack/react-query";

import { fetchProducts } from "../services/productServices";
import { Product } from "../types/index";

export const useProducts = () =>
  useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
    retry: 2,
  });
