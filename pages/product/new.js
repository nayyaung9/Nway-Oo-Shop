// Components
import React, { useState, useEffect } from "react";
import ProductNewHeader from "@/components/header/ProductNewHeader";
import Head from "next/head";
import dynamic from "next/dynamic";
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
  Select,
  HStack,
} from "@chakra-ui/react";
import { InputControl, SubmitButton, TextareaControl } from "formik-chakra-ui";
import MultipleFileUpload from "@/components/MultipleFileUpload/MultipleFileUpload";
import { Formik } from "formik";

// Utils & Hooks
import { useCurrentUser, useOwnShop } from "@/hooks/index";
import { useRouter } from "next/router";
import { productValidator } from "@/utils/form-validation";
import { theme } from "@/utils/theme";
import { useParentCategories } from "@/hooks/index";

const Editor = dynamic(() => import("@/components/editor/Editor"), {
  ssr: false,
});

const CreateProduct = () => {
  const router = useRouter();
  const toast = useToast();

  const [user, { mutate }] = useCurrentUser();
  const [shop] = useOwnShop(user?._id);
  const { data } = useParentCategories();

  const parentCategory = data
    ? data.reduce((acc, val) => [...acc, ...val.catelogs], [])
    : [];

  useEffect(() => {
    // redirect to home if user is not authenticated
    if (user === null) router.push("/");
  }, [user]);

  const [state, setState] = useState({
    content: "",
    hasCategories: false,
    hasChildrenCatelogs: false,
    categoryPath: "",
    childrenCatelogs: [],
    categoryName: "",
  });
  const [productImages, setProductImages] = useState([]);
  const [productImageLoading, setProductImageLoading] = useState(false);

  const onSelectParentCategory = async (e) => {
    const category = e.target.value;

    const res = await fetch(`/api/category/${category}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 200) {
      const { childCategories } = await res.json();
      if (childCategories.length === 0) {
        setState({
          ...state,
          hasCategories: true,
          hasChildrenCatelogs: false,
          categoryPath: `/${category}`,
          categoryName: category, // laster this will use for category products
        });
      } else {
        setState({
          ...state,
          hasChildrenCatelogs: true,
          categoryPath: category,
          childrenCatelogs: childCategories,
          categoryName: category,
        });
      }
    }
  };

  return (
    <>
      <ProductNewHeader />
      <div style={{ minHeight: 64 }} />

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
            customerService: "",
          }}
          validationSchema={productValidator}
          onSubmit={async (values) => {
            const payload = {
              ...values,
              content: state.content,
              userId: user?._id,
              shopId: shop?._id,
              // userId: '62yGi9A8O-0a',
              // shopId: 'TQIF5QDfngrt',
              productImages,
              categories: [state.categoryPath],
              categoryName: state.categoryName,
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
              toast({
                title: "Product edited failed.",
                description: "Please try agin later",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
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

                <FormLabel>Select Product Category</FormLabel>

                <HStack>
                  <FormControl id="catelogs" isRequired>

                    <Select
                      placeholder="Select Category"
                      onChange={onSelectParentCategory}
                    >
                      {parentCategory &&
                        parentCategory.map((category, i) => (
                          <option key={i} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                  {state.hasChildrenCatelogs && (
                    <FormControl id="catelogs" isRequired>
                      <Select
                        placeholder="Select Child Category"
                        onChange={(e) =>
                          setState({
                            ...state,
                            categoryPath: e.target.value,
                            hasCategories: true,
                          })
                        }
                      >
                        {state.childrenCatelogs &&
                          state.childrenCatelogs.map((category, i) => (
                            <option key={i} value={category.path}>
                              {category.name}
                            </option>
                          ))}
                      </Select>
                    </FormControl>
                  )}
                </HStack>

                {state.hasCategories && (
                  <React.Fragment>
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
                        textareaProps={{
                          placeholder: "Delivery for this product",
                        }}
                      />
                    </FormControl>

                    <FormControl id="payment" isRequired>
                      <TextareaControl
                        name="payment"
                        label="Payment"
                        textareaProps={{
                          placeholder: "Payment for this product",
                        }}
                      />
                    </FormControl>

                    <FormControl id="customerService" isRequired>
                      <TextareaControl
                        name="customerService"
                        label="Customer Service"
                        textareaProps={{
                          placeholder: "Type how you service for your customer",
                        }}
                      />
                    </FormControl>
                    <SubmitButton bg={theme.secondaryColor} size="sm" mt="4">
                      Create Product
                    </SubmitButton>
                  </React.Fragment>
                )}
              </Stack>
            </Box>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default CreateProduct;
