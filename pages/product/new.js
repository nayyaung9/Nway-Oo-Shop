import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import {
  Container,
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Wrap,
  WrapItem,
  Image,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import SocialInputs from "@/components/social/SocialInputs";
import MultipleFileUpload from "@/components/MultipleFileUpload/MultipleFileUpload";
import { useCurrentUser, useOwnShop } from "@/hooks/index";
import { useRouter } from "next/router";
import { InputControl, SubmitButton, TextareaControl } from "formik-chakra-ui";
import { productValidator } from "@/utils/form-validation";
import { Formik } from "formik";

const Editor = dynamic(() => import("@/components/editor/Editor"), {
  ssr: false,
});

const CreateProduct = () => {
  const router = useRouter();

  const [user, { mutate }] = useCurrentUser();
  const [shop] = useOwnShop(user?._id);

  useEffect(() => {
    // redirect to home if user is not authenticated
    if (user === null) router.push("/");
  }, [user]);

  const [state, setState] = useState({
    content: "",
  });
  const [productImages, setProductImages] = useState([]);
  const [productImageLoading, setProductImageLoading] = useState(false);

  const [social, setSocial] = useState([
    {
      url: "",
    },
  ]);

  return (
    <Layout>
      <Head>
        <title>Create Product | Nweoo Snaks</title>
      </Head>
      <Container maxW="container.lg" mt="4" mb="8">
        <Formik
          initialValues={{
            title: "",
            delivery: "",
            payment: "",
            price: "",
            estimatedPrice: 0,
          }}
          validationSchema={productValidator}
          onSubmit={async (values) => {
            const payload = {
              ...values,
              content: state.content,
              social,
              userId: user?._id,
              shopId: shop?._id,
              productImages,
            };

            const res = await fetch("/api/product", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            if (res.status === 201) {
              const { newShop } = await res.json();
              router.push(
                `/p/${newShop?._id}/${newShop?.title
                  .replace(/\s/g, "-")
                  .toLowerCase()}`
              );
            } else {
              // setErrorMsg("Incorrect username or password. Try again!");
            }
          }}
        >
          {({ handleSubmit, values, errors }) => (
            <Box w="100%" as={"form"} onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <InputControl name="title" label="Title" type="text" />

                  <FormHelperText>
                    Please describe your item name.
                  </FormHelperText>
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Item Description</FormLabel>
                  <Editor
                    value={state.content}
                    onChange={(e) => setState({ ...state, content: e })}
                  />
                  <FormHelperText>
                    Fully describe about your item.
                  </FormHelperText>
                </FormControl>

                <FormLabel htmlFor="writeUpFile">Product Images</FormLabel>

                <div className="product-image-banner">
                  {productImages && productImages.length >= 5 && (
                    <p style={{ color: "red" }}>
                      Maximum product images are up to 5.
                    </p>
                  )}
                  <MultipleFileUpload
                    productImages={productImages}
                    setProductImages={setProductImages}
                    setProductImageLoading={setProductImageLoading}
                  />

                  <Wrap mt="4">
                    {productImages &&
                      productImages.map((item, i) => {
                        return (
                          <React.Fragment>
                            <WrapItem key={i}>
                              <Image
                                boxSize="100px"
                                objectFit="cover"
                                src={item}
                                alt="Segun Adebayo"
                              />
                            </WrapItem>
                          </React.Fragment>
                        );
                      })}
                    {productImageLoading && <Spinner />}
                  </Wrap>
                </div>

                <FormControl id="estimatedPrice" isRequired>
                  <InputControl
                    name="estimatedPrice"
                    label="Estimated Price"
                    inputProps={{ placeholder: "Estimated Price" }}
                  />
                </FormControl>

                <FormControl id="price" isRequired>
                  <TextareaControl
                    name="price"
                    label="Price"
                    textareaProps={{ placeholder: "Price" }}
                  />
                </FormControl>

                <FormControl id="delivery" isRequired>
                  <TextareaControl
                    name="delivery"
                    label="Delivery"
                    textareaProps={{ placeholder: "Delivery for this product" }}
                  />
                </FormControl>

                <FormControl id="payment" isRequired>
                  <TextareaControl
                    name="payment"
                    label="Payment"
                    textareaProps={{ placeholder: "Payment for this product" }}
                  />
                </FormControl>

                <div className="product-image-banner">
                  <FormControl id="social">
                    <FormLabel>Social</FormLabel>
                    <SocialInputs social={social} setSocial={setSocial} />
                  </FormControl>
                </div>

                <SubmitButton colorScheme="teal" size="sm" mt="4">
                  Create Product
                </SubmitButton>
              </Stack>
            </Box>
          )}
        </Formik>
      </Container>
    </Layout>
  );
};

export default CreateProduct;
