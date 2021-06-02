import { useSWRInfinite } from "swr";
import fetcher from "@/lib/fetch";
import useSWR from "swr";

export function useParentCategories() {
  return useSWRInfinite(
    () => {
      return `/api/category/parent`;
    },
    fetcher,
    {
      refreshInterval: 10000, // Refresh every 10 seconds
    }
  );
}

export function useCategoryProducts(productCategoryId) {
  const { data } = useSWR(`/api/category/products/${productCategoryId}`, fetcher, {
    revalidateOnFocus: false,
  });

  return data?.products;
}
