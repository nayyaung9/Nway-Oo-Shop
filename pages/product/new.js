import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Container,
  Box,
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
  Wrap,
  WrapItem,
  Image,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import TagsInput from "react-tagsinput";

import dynamic from "next/dynamic";
import SocialInputs from "@/components/social/SocialInputs";
import MultipleFileUpload from "@/components/MultipleFileUpload/MultipleFileUpload";
import { useCurrentUser, useOwnShop } from "@/hooks/index";
import { useRouter } from "next/router";
import { InputControl, SubmitButton, TextareaControl } from "formik-chakra-ui";
import { productValidator } from "@/utils/form-validation";
import { Formik } from "formik";
import { theme } from '@/utils/theme';
import "react-tagsinput/react-tagsinput.css";
import ProductNewHeader from "@/components/header/ProductNewHeader";

const Editor = dynamic(() => import("@/components/editor/Editor"), {
  ssr: false,
});

const CreateProduct = () => {
  const router = useRouter();
  const toast = useToast();

  const [user, { mutate }] = useCurrentUser();
  const [shop] = useOwnShop(user?._id);

  useEffect(() => {
    // redirect to home if user is not authenticated
    if (user === null) router.push("/");
  }, [user]);

  const [state, setState] = useState({
    content: "",
    tags: [],
  });
  const [productImages, setProductImages] = useState([]);
  const [productImageLoading, setProductImageLoading] = useState(false);

  const [social, setSocial] = useState([
    {
      url: "",
    },
  ]);

  return (
    <>
    <ProductNewHeader />
      <Head>
        <title>Create Product | Nweoo Snaks</title>
      </Head>
      <Container maxW="container.lg" mt="4" pb="12">
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
              tags: state.tags,
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
              toast({
                title: "Product created successfully.",
                description: "You will redirect to your product soon.",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
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

                <FormControl id="tags">
                  <FormLabel>Tags</FormLabel>
                  <TagsInput
                    value={state.tags}
                    onChange={(tags) => setState({ ...state, tags })}
                  />

                  <FormHelperText>
                    Describe the category your product belongs to
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

                <SubmitButton bg={theme.secondaryColor} size="sm" mt="4">
                  Create Product
                </SubmitButton>
              </Stack>
            </Box>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default CreateProduct;
