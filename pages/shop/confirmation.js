import React from "react";
import Head from "next/head";
import {
  Box,
  Flex,
  Text,
  Alert,
  Avatar,
  AlertTitle,
  AlertDescription,
  Button,
  Container,
  Stack,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { theme } from "@/utils/theme";
import { useRouter } from "next/router";

const ShopConfirmation = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Nweoo Snacks - Shop Confirmation</title>
        <meta name="theme-color" content={theme.primaryColor} />
      </Head>
      <Box bg="#fdc830" px={4}>
        <Flex
          h={16}
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          alignItems="center"
        >
          <Text
            textAlign={"center"}
            fontFamily={"heading"}
            fontWeight="bold"
            color={theme.secondaryColor}
          >
            Nweoo Snacks
          </Text>
        </Flex>
      </Box>

      <Box p={4}>
        <Alert
          style={{
            border: `1px solid ${theme.secondaryColor}`,
            borderRadius: 4,
            background: "white",
          }}
          status="success"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Avatar
            size="2xl"
            src="/default/logo.png"
            alt="Newoo-Snacks-App-Logo"
          />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Application submitted!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Thanks for submitting your online store. Our team will verify your
            shop.
          </AlertDescription>
          <Button
            borderColor={theme.secondaryColor}
            color={theme.secondaryColor}
            size="sm"
            variant="outline"
            mt="6"
            mb="6"
            onClick={() => router.push("/")}
          >
            Visit Stores
          </Button>
          <AlertDescription maxWidth="sm">
            If your shop is not verify within 24 hours, please directly contact
            to us.
          </AlertDescription>
          <a href="https://www.facebook.com/nweoosnacks/">
            <Button colorScheme="facebook" mt="8">
              Facebook Page
            </Button>{" "}
          </a>
        </Alert>
      </Box>

      <Box
        bg={theme.primaryColor}
        w="full"
        style={{
          position: "fixed",
          bottom: 0,
        }}
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Avatar
            size="lg"
            src="/default/logo.png"
            alt="Newoo-Snacks-App-Logo"
          />
          <Text>© 2020. All rights reserved</Text>
        </Container>
      </Box>
    </>
  );
};

export default ShopConfirmation;
