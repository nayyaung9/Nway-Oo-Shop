import Head from "next/head";
import Layout from "../components/layout/Layout";
import { Container } from "@chakra-ui/react";
import { useSWRInfinite } from "swr";
import fetcher from "@/lib/fetch";
import ShopList from "@/components/shop/ShopList";
import ProductGridList from "@/components/products/ProductGridList";
import { theme } from "@/utils/theme";
import ProductHorizontalList from "@/components/products/ProductHorizontalList";

export function useProducts() {
  return useSWRInfinite(
    () => {
      return `/api/products/lastest`;
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
        <meta
          property="og:url"
          content={`https://nweoo-snacks.vercel.app/`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={"Nweoo Snacks"}
        />
        <meta
          property="og:description"
          content="Nweoo Snacks is a small ecommerce website that provides CDMers and small home business"
        />
        <meta property="og:image" content="" />
      </Head>
      <div style={{ background: theme.bgGrayColor }}>
        <ShopList />
        <div style={{ background: "white" }}>
          <Container maxW="container.xl" pt="4" mb="8">
            <ProductGridList
              productListName="Lastest Products"
              products={products}
            />
          </Container>
        </div>

        <div style={{ background: "white" }}>
          <Container maxW="container.xl" pt="4" mb="8">
            <ProductHorizontalList
              title="စားသောက်ကုန်ပစ္စည်းများ"
              category="food-and-beverage"
            />
          </Container>
        </div>

        <div style={{ background: "white" }}>
          <Container maxW="container.xl" pt="4" mb="8">
            <ProductHorizontalList
              title="ဆေးဝါးဆိုင်ရာပစ္စည်းများ"
              category="health"
            />
          </Container>
        </div>

        <div style={{ background: "white" }}>
          <Container maxW="container.xl" pt="4" mb="8">
            <ProductHorizontalList title="အ၀တ်အထည်များ" category="apparel" />
          </Container>
        </div>
      </div>
    </Layout>
  );
}
