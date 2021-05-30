import Layout from "@/components/layout/Layout";
import React, { useState, useEffect } from "react";
import {
  Container,
  Heading,
  FormControl,
  useToast,
  Avatar,
  Button,
  Divider,
  Box,
} from "@chakra-ui/react";
import { all } from "@/middlewares/index";
import { fetchShopById } from "@/db/index";
import { InputControl, SubmitButton, TextareaControl } from "formik-chakra-ui";
import { shopInformationValidator } from "@/utils/form-validation";
import { Formik } from "formik";

const ShopSetting = ({ data }) => {
  const toast = useToast();

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

        <Formik
          enableReinitialize
          initialValues={{
            _id: data?._id,
            shopname: data?.shopname,
            phoneNumber: data?.phoneNumber,
            shopAddress: data?.shopAddress,
            orderSystem: data?.orderSystem,
          }}
          validationSchema={shopInformationValidator}
          onSubmit={async (values) => {
            await fetch(`/api/shop/${values?._id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            })
              .then(async (res) => {
                toast({
                  title: "Shop updated.",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                  position: "top",
                });
              })
              .catch((err) => {
                toast({
                  title: "Shop Cannot Update right now :(",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                  position: "top",
                });
              });
          }}
        >
          {({ handleSubmit, values, errors }) => (
            <Box as={"form"} onSubmit={handleSubmit}>
              <FormControl id="shopName" isRequired mt="4">
                <InputControl name="shopname" label="Shop Name" />
              </FormControl>
              <FormControl id="shopContactNumbers" isRequired mt="4">
                <InputControl name="phoneNumber" label="Shop Contact Number" />
              </FormControl>
              <FormControl id="shopAddress" isRequired mt="4">
                <TextareaControl
                  name="shopAddress"
                  label="Shop Address"
                  textareaProps={{ placeholder: "ဆိုင် လိပ်စာ" }}
                />
              </FormControl>

              <FormControl id="orderSystem" isRequired mt="4">
                <InputControl
                  name="orderSystem"
                  label="order တင်ယူနည်း"
                  inputProps={{ placeholder: "order တင်ယူနည်း" }}
                />
              </FormControl>

              <SubmitButton size="sm" mt="3">
                Update Shop
              </SubmitButton>
            </Box>
          )}
        </Formik>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  await all.run(context.req, context.res);
  const shop = await fetchShopById(context.req.db, context.params.shopId);
  if (!shop) context.res.statusCode = 404;
  return { props: { data: shop } };
}

export default ShopSetting;
