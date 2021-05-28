import ProductHorizontalList from "@/components/products/ProductHorizontalList";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import { Container } from "@chakra-ui/react";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Newoo Snacks</title>
      </Head>
      <div style={{ background: "#f5f5f5" }}>
        <Container maxW="container.lg">
          <ProductHorizontalList />
        </Container>
      </div>
    </Layout>
  );
}
