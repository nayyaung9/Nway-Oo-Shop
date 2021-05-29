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
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import SocialInputs from "@/components/social/SocialInputs";
import MultipleFileUpload from "@/components/MultipleFileUpload/MultipleFileUpload";
import { useCurrentUser, useOwnShop } from "@/hooks/index";
import { useRouter } from "next/router";

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
    title: "",
    content: "",
    price: 0,
  });
  const [productImages, setProductImages] = useState([]);

  const [social, setSocial] = useState([
    {
      url: "",
    },
  ]);
  const onFormSubmit = async (e) => {
    const payload = {
      ...state,
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
    if (res.status === 200) {
      const userObj = await res.json();
      console.log("ans", userObj);
    } else {
      // setErrorMsg("Incorrect username or password. Try again!");
    }
  };
  return (
    <Layout>
      <Head>
        <title>Create Product | Nweoo Snaks</title>
      </Head>
      <Container maxW="container.lg">
        <Box w="100%" p={4}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                type="email"
                value={state.title}
                onChange={(e) => setState({ ...state, title: e.target.value })}
              />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Item Description</FormLabel>
              <Editor
                value={state.content}
                onChange={(e) => setState({ ...state, content: e })}
              />
              <FormHelperText>Fully describe about your item.</FormHelperText>
            </FormControl>

            <MultipleFileUpload
              productImages={productImages}
              setProductImages={setProductImages}
            />

            <Wrap>
              {productImages &&
                productImages.map((item, i) => {
                  return (
                    <WrapItem key={i}>
                      <Image
                        boxSize="100px"
                        objectFit="cover"
                        src={item}
                        alt="Segun Adebayo"
                      />
                    </WrapItem>
                  );
                })}
            </Wrap>

            <FormControl id="price" isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                type="email"
                value={state.price}
                onChange={(e) => setState({ ...state, price: e.target.value })}
              />
              <FormHelperText>Fully describe about your item.</FormHelperText>
            </FormControl>

            <FormControl id="social">
              <FormLabel>Social</FormLabel>
              <SocialInputs social={social} setSocial={setSocial} />
            </FormControl>

            <Button colorScheme="teal" size="sm" mt="4" onClick={onFormSubmit}>
              Create Product
            </Button>
          </Stack>
        </Box>
      </Container>
    </Layout>
  );
};

export default CreateProduct;
