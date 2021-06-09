import Layout from "@/components/layout/Layout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Heading, Image, Text, Center, Container } from "@chakra-ui/react";
import { textStringToUrl, capFirstWordFromString } from "@/utils/index";
import Link from "next/link";

const Search = () => {
  const router = useRouter();
  const { name } = router.query;
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function searchProducts() {
      setLoading(true);

      const res = await fetch(`/api/search/${name}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) {
        setLoading(false);

        const searcProducts = await res.json();
        setProducts(searcProducts.products);
      } else {
        setLoading(false);
      }
    }

    if (name) {
      searchProducts();
    }
  }, [name]);

  console.log(products);

  return (
    <Layout>
      {loading ? (
        <div>loading</div>
      ) : (
        <React.Fragment>
          <Container maxW={"7xl"} mt="4">
            <Heading as="h5" size="md" mb="8" noOfLines="1">
              {name}
            </Heading>
            {products &&
              Array.isArray(products) &&
              products.map((product, i) => (
                <Card key={i}>
                  <CardHorizontal>
                    <div class="img-square-wrapper">
                      <Image
                        src={
                          product?.productImages
                            ? product.productImages[0]
                            : "/default/logo.png"
                        }
                        alt={`${product?.title}-avatar`}
                        style={{
                          width: 120,
                          height: 120,
                        }}
                      />
                    </div>
                    <CardBody>
                      <Link
                        href={`/${product && product?._id}/${
                          product && textStringToUrl(product?.title)
                        }`}
                      >
                        <Heading as="h6" size="sm">
                          {product.title
                            ? capFirstWordFromString(product?.title)
                            : ""}
                        </Heading>
                      </Link>
                      <Text color={"gray.500"} isTruncated>
                        {product?.estimatedPrice ? product?.estimatedPrice : ""}
                      </Text>{" "}
                    </CardBody>
                  </CardHorizontal>
                </Card>
              ))}
          </Container>
        </React.Fragment>
      )}
    </Layout>
  );
};

const Card = styled.div`
  margin-bottom: 20px;
`;
const CardHorizontal = styled.div`
  display: flex;
  flex: 1 1 auto;
`;

const CardBody = styled.div`
  padding-left: 12px;
`;

export default Search;
