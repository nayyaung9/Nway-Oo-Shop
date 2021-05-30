import React from "react";
import { useSWRInfinite } from "swr";
import fetcher from "@/lib/fetch";
import { Avatar, Text } from "@chakra-ui/react";

export function useShops() {
  return useSWRInfinite(
    () => {
      return `/api/shops`;
    },
    fetcher,
    {
      refreshInterval: 10000, // Refresh every 10 seconds
    }
  );
}

const ShopList = () => {
  const { data } = useShops();
  const shops = data
    ? data.reduce((acc, val) => [...acc, ...val.shops], [])
    : [];

  console.log("shop", shops);

  return (
    <React.Fragment>
      <div className="scrolling-wrapper-flexbox">
        {shops &&
          shops.map((shop, i) => (
            <div className="shop-card">
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              <Text fontSize="lg" ml="4">{shop?.shopname}</Text>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default ShopList;
