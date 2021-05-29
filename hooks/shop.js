import useSWR from "swr";
import fetcher from "@/lib/fetch";

export function useOwnShop(userId) {
  const { data, mutate } = useSWR(`/api/shop/${userId}`, fetcher, {
    revalidateOnFocus: false,
  });
  const shop = data?.shop;
  return [shop, { mutate }];
}
