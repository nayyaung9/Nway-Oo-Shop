import Layout from "@/components/layout/Layout";
import React, { useState } from "react";
import { useRef } from "react";
import {
  Container,
  Heading,
  FormControl,
  useToast,
  Avatar,
  Button,
  Divider,
  Box,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { all } from "@/middlewares/index";
import { fetchShopById } from "@/db/index";
import { InputControl, SubmitButton, TextareaControl } from "formik-chakra-ui";
import { shopInformationValidator } from "@/utils/form-validation";
import { Formik } from "formik";

const ShopSetting = ({ data }) => {
  const toast = useToast();
  const profileRef = useRef();
  const coverPhotoRef = useRef();

  const [state, setState] = useState({
    storeProfileLoading: false,
    storeCoverPhotoLoading: false,
  });

  const onStoreImageUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (profileRef.current.files[0]) {
      formData.append("storeProfile", profileRef.current.files[0]);
      formData.append("shopId", data?._id);

      setState({ ...state, storeProfileLoading: true });
      const res = await fetch("/api/image/storeProfile", {
        method: "PATCH",
        body: formData,
      });
      if (res.status === 200) {
        setState({ ...state, storeProfileLoading: false });
        toast({
          title: "Shop Profile Uploaded.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        // setMsg({ message: 'Profile updated' });
      } else {
        toast({
          title: "Shop Profile Uploaded Failed.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        setState({ ...state, storeProfileLoading: false });
      }
    }
  };

  const onStoreCoverPhotoUpload = async (e) => {
    e.preventDefault();
    console.log("yo");
    const formData = new FormData();

    if (coverPhotoRef.current.files[0]) {
      formData.append("storeCoverPhoto", coverPhotoRef.current.files[0]);
      formData.append("shopId", data?._id);

      setState({ ...state, storeCoverPhotoLoading: true });
      const res = await fetch("/api/image/storeCoverPhoto", {
        method: "PATCH",
        body: formData,
      });
      if (res.status === 200) {
        setState({ ...state, storeCoverPhotoLoading: false });
        toast({
          title: "Shop Cover Image Uploaded.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        // setMsg({ message: 'Profile updated' });
      } else {
        toast({
          title: "Shop Cover Image Uploaded Failed.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        setState({ ...state, storeCoverPhotoLoading: false });
      }
    }
  };

  return (
    <Layout>
      <Container mt="2">
        <Heading as="h4" size="md">
          Manage Your Shop
        </Heading>

        <div className="action-banner-dashed">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            {state.storeProfileLoading ? (
              <Spinner />
            ) : (
              <Avatar
                name="Dan Abrahmov"
                src={
                  data?.storeProfile ? data?.storeProfile : "/default/logo.png"
                }
              />
            )}

            <input
              type="file"
              name="file"
              id="file"
              class="inputfile"
              style={{ display: "none" }}
              ref={profileRef}
              onChange={onStoreImageUpload}
            />
            <label htmlFor="file" style={{ marginLeft: 8 }}>
              {" "}
              Click Here{" "}
            </label>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {state.storeCoverPhotoLoading ? (
              <Spinner />
            ) : (
              <Image
                boxSize="100px"
                objectFit="cover"
                src={
                  data?.storeCoverPhoto
                    ? data?.storeCoverPhoto
                    : "/default/logo.png"
                }
                alt="Shop Cover Photo"
              />
            )}

            <input
              type="file"
              name="coverPhoto"
              id="coverPhoto"
              class="inputfile"
              style={{ display: "none" }}
              ref={coverPhotoRef}
              onChange={onStoreCoverPhotoUpload}
            />
            <label htmlFor="coverPhoto" style={{ marginLeft: 8 }}>
              {" "}
              Change Shop Cover Photo{" "}
            </label>
          </div>
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
            shortBio: data?.shortBiom,
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
            <Box as={"form"} onSubmit={handleSubmit} mb="4">
              <FormControl id="shopName" mt="4">
                <InputControl name="shopname" label="Shop Name" />
              </FormControl>
              <FormControl id="shopContactNumbers" mt="4">
                <InputControl name="phoneNumber" label="Shop Contact Number" />
              </FormControl>

              <FormControl id="shortBio" mt="4">
                <TextareaControl
                  name="shortBio"
                  label="Short Bio about your shop"
                  textareaProps={{ placeholder: "shortBio" }}
                />
              </FormControl>
              <FormControl id="shopAddress" mt="4">
                <TextareaControl
                  name="shopAddress"
                  label="Shop Address"
                  textareaProps={{ placeholder: "ဆိုင် လိပ်စာ" }}
                />
              </FormControl>

              <FormControl id="orderSystem" mt="4">
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
