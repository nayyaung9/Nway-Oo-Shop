import ProductHorizontalList from "@/components/products/ProductHorizontalList";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import { Container } from "@chakra-ui/react";
import { useSWRInfinite } from "swr";
import fetcher from "@/lib/fetch";
import ShopList from "@/components/shop/ShopList";
import ProductGridList from "@/components/products/ProductGridList";

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
      <div style={{ background: "#f5f5f5" }}>
        <ShopList />
        <Container maxW="container.xl" mt="8" mb="8">
          <ProductGridList products={products} />
        </Container>
      </div>
    </Layout>
  );
}
