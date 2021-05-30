import Layout from "@/components/layout/Layout";
import React, { useState, useEffect } from "react";
import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  Button,
  Textarea,
  FormErrorMessage,
  FormHelperText,
  Divider,
} from "@chakra-ui/react";
import { all } from "@/middlewares/index";
import { fetchShopById } from "@/db/index";
import { useCurrentUser } from "@/hooks/index";
import { useRouter } from "next/router";

const ShopSetting = ({ data }) => {
  const router = useRouter();

  const [shop, setShop] = useState({});
  const [user] = useCurrentUser();

  useEffect(() => {
    const payload = {
      ...data,
      address: "",
      orderSystem: "",
    };
    setShop(payload);
  }, [data]);

  useEffect(() => {
    // if (shop && shop?.shopOwnerId !== user && user?._id) {
    //   router.back();
    // }

    console.log("user", user);
  }, [user]);

  // const shop = JSON.parse(data);

  return (
    <Layout>
      <Container mt="2">
        <Heading as="h4" size="md">
          Manage Your Shop
        </Heading>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: "20px auto",
          }}
        >
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />

          <Button colorScheme="teal" size="sm" variant="outline" ml="4">
            Change Shop Profile
          </Button>
        </div>

        <Divider />

        <FormControl id="shopName" isRequired mt="4">
          <FormLabel>Shop Name</FormLabel>
          <Input
            type="text"
            value={shop?.shopname}
            name="shopname"
            onChange={(e) => setShop({ ...shop, shopname: e.target.value })}
          />
        </FormControl>
        <FormControl id="shopContactNumbers" isRequired mt="4">
          <FormLabel>Shop Contact Numbers</FormLabel>
          <Input
            type="text"
            value={shop?.phoneNumber}
            name="phoneNumber"
            onChange={(e) => setShop({ ...shop, phoneNumber: e.target.value })}
          />
        </FormControl>
        <FormControl id="shopAddress" isRequired mt="4">
          <FormLabel>Shop Address</FormLabel>
          <Textarea
            value={shop?.address}
            onChange={(e) => setShop({ ...shop, address: e.target.value })}
            placeholder="ဆိုင် လိပ်စာ"
            size="sm"
          />
        </FormControl>

        <FormControl id="orderSystem" isRequired mt="4">
          <FormLabel>order တင်ယူနည်း</FormLabel>
          <Input
            value={shop?.orderSystem}
            onChange={(e) => setShop({ ...shop, orderSystem: e.target.value })}
            placeholder="order တင်ယူနည်း"
            size="sm"
          />
        </FormControl>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  await all.run(context.req, context.res);
  console.log(context.params);
  const shop = await fetchShopById(context.req.db, context.params.shopId);
  if (!shop) context.res.statusCode = 404;
  return { props: { data: shop } };
}

export default ShopSetting;
