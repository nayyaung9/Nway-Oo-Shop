import ProductHorizontalList from "@/components/products/ProductHorizontalList";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import { Container } from "@chakra-ui/react";
import { useSWRInfinite } from "swr";
import fetcher from "@/lib/fetch";

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
        <Container maxW="container.xl">
          <ProductHorizontalList products={products} />
        </Container>
      </div>
    </Layout>
  );
}
