import Head from "next/head";
import Layout from "../components/layout/Layout";
import { Container } from "@chakra-ui/react";
import { useSWRInfinite } from "swr";
import fetcher from "@/lib/fetch";
import ShopList from "@/components/shop/ShopList";
import ProductGridList from "@/components/products/ProductGridList";
import { theme } from "@/utils/theme";

export function useProducts() {
  return useSWRInfinite(
    () => {
      return `/api/products`;
    },
    fetcher,
    {
      refreshInterval: 10000, // Refresh every 10 seconds
    }
  );
}

export default function Home() {
  const { data } = useProducts();
  const products = data
    ? data.reduce((acc, val) => [...acc, ...val.products], [])
    : [];

  return (
    <Layout>
      <Head>
        <title>Newoo Snacks</title>
      </Head>
      <div style={{ background: theme.bgGrayColor }}>
        <ShopList />
        <Container maxW="container.xl" mt="8" pb="8">
          <ProductGridList products={products} />
        </Container>
      </div>
    </Layout>
  );
}
