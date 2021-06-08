import React, { useState, useEffect } from "react";
import Link from 'next/link';
import {
  Flex,
  Box,
  FormControl,
  Stack,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCurrentUser } from "@/hooks/index";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import { loginValidator } from "@/utils/form-validation";
import { Formik } from "formik";

export default function Login() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [user, { mutate }] = useCurrentUser();

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.push("/");
  }, [user]);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginValidator}
          onSubmit={async (values) => {
            const res = await fetch("/api/auth", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            });
            if (res.status === 200) {
              const userObj = await res.json();
              console.log("ans", userObj);
              mutate(userObj);
            } else {
              setErrorMsg("Incorrect username or password. Try again!");
            }
          }}
        >
          {({ handleSubmit, values, errors }) => (
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
              as={"form"}
              onSubmit={handleSubmit}
            >
              <Stack spacing={4}>
                {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null}

                <FormControl id="email">
                  <InputControl name="email" label="Email" type="email" />
                </FormControl>
                <FormControl id="password">
                  <InputControl
                    name="password"
                    label="Password"
                    type="password"
                    inputProps={{ type: "password " }}
                  />
                </FormControl>

                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                  mt="4"
                >
                  <Link href="/register">
                    Are you a new member?
                  </Link>
                </Stack>

                <Stack spacing={10}>
                  <SubmitButton
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Sign in
                  </SubmitButton>
                </Stack>
              </Stack>
            </Box>
          )}
        </Formik>
      </Stack>
    </Flex>
  );
}
