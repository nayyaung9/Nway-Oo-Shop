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
  Button,
  Select,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import ProductDetailLayout from "@/components/layout/ProductDetailLayout";
import { Formik } from "formik";
import { InputControl, SubmitButton, TextareaControl } from "formik-chakra-ui";
import MultipleFileUpload from "@/components/MultipleFileUpload/MultipleFileUpload";
import SocialInputs from "@/components/social/SocialInputs";

import { all } from "@/middlewares/index";
import { fetchProductById, fetchShopById } from "@/db/index";
import { numberWithCommas, removeTags } from "@/utils/index";
import { SearchIcon } from "@chakra-ui/icons";
import { theme } from "@/utils/theme";
import { productValidator } from "@/utils/form-validation";
import dynamic from "next/dynamic";
import { useParentCategories } from "@/hooks/index";
import ImageSliderEdit from "@/components/image/ImageSliderEdit";

const Editor = dynamic(() => import("@/components/editor/Editor"), {
  ssr: false,
});

const EditProduct = ({ data }) => {
  const product = JSON.parse(data);

  const { data: categories } = useParentCategories();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const parentCategory = categories
    ? categories.reduce((acc, val) => [...acc, ...val.catelogs], [])
    : [];

  const [state, setState] = useState({
    content: "",
    hasCategories: true,
    hasChildrenCatelogs: false,
    categoryPath: "",
    childrenCatelogs: [],
    categoryName: "",
  });
  const [productImages, setProductImages] = useState([]);
  const [productImageLoading, setProductImageLoading] = useState(false);

  const [social, setSocial] = useState([
    {
      url: "",
    },
  ]);

  useEffect(() => {
    setState({ ...state, ...product });
    setProductImages([...product?.productImages]);
  }, []);

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

  console.log("t", state);

  return (
    <>
      <ProductDetailLayout>
        <Head>
          <title>Edit Product | Nweoo Snaks</title>
        </Head>
        <Container maxW="container.lg" mt="4" pb="12">
          <Formik
            enableReinitialize
            initialValues={{
              userId: product?.userId,
              shopId: product?.shopId,
              title: product?.title,
              delivery: product?.delivery,
              payment: product?.payment,
              price: product?.price,
              estimatedPrice: product?.estimatedPrice,
              customerService: product?.customerService,
            }}
            validationSchema={productValidator}
            onSubmit={async (values) => {
              const payload = {
                ...values,
                content: state.content,
                social,
                productImages,
                categories: [state.categoryPath],
                categoryName: state.categoryName,
              };

              console.log("payload", payload);
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

                      <div className="flex-between" style={{ alignItems: 'center' }}>
                        <FormLabel htmlFor="writeUpFile">
                          Product Images
                        </FormLabel>
                        <Button onClick={onOpen}>Edit Images</Button>
                      </div>
                      <div className="product-image-banner">
                        {productImages && productImages.length >= 5 && (
                          <p style={{ color: "red" }}>
                            Maximum product images are up to 5.
                          </p>
                        )}
                        <MultipleFileUpload
                          type="edit"
                          productImages={productImages}
                          setProductImages={setProductImages}
                          setProductImageLoading={setProductImageLoading}
                        />
                        <ImageSliderEdit
                          images={productImages}
                          setProductImages={setProductImages}
                          isOpen={isOpen}
                          onClose={onClose}
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
                            placeholder:
                              "Type how you service for your customer",
                          }}
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
                    </React.Fragment>
                  )}
                </Stack>
              </Box>
            )}
          </Formik>
        </Container>
      </ProductDetailLayout>
    </>
  );
};

export async function getServerSideProps(context) {
  await all.run(context.req, context.res);
  const product = await fetchProductById(
    context.req.db,
    context.params.productId
  );

  if (!product) context.res.statusCode = 404;

  return { props: { data: JSON.stringify(product) } };
}

export default EditProduct;
