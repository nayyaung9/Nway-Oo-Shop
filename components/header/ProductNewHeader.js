import React from "react";
import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { theme } from "@/utils/theme";
import { CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const ProductNewHeader = () => {
  const router = useRouter();

  return (
    <Box bg={theme.primaryColor} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          style={{ background: "transparent" }}
          icon={<CloseIcon />}
          aria-label="Back"
          display={{ md: "none" }}
          onClick={() => router.back()}
        />
        <Text
          fontFamily={"heading"}
          fontWeight="bold"
          color={theme.secondaryColor}
          style={{ flex: 1, marginLeft: 10 }}
        >
          New Product
        </Text>
        {/* <IconButton
          size={"md"}
          style={{ background: "transparent" }}
          icon={<CloseIcon />}
          aria-label="Back"
          display={{ md: "none" }}
          onClick={() => router.back()}
        /> */}
      </Flex>
    </Box>
  );
};

export default ProductNewHeader;
