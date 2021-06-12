import Link from "next/link";
import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import { capFirstWordFromString, numberWithCommas } from "@/utils/index";

export default function ProductItemCard({ product }) {
  return (
    <Box
      h="full"
      maxW="100%"
      w={"189px"}
      minH="189px"
      bg={useColorModeValue("white", "gray.800")}
      rounded={"lg"}
    >
      <Box height={"180px"}>
        <Image
          height="full"
          width={"full"}
          objectFit={"center"}
          src={product?.productImages[0]}
        />
      </Box>
      <Stack p={2}>
        <Heading as="h6" size="xs" isTruncated>
          <Link
            href={`/p/${product?._id}/${product.title
              .replace(/\s/g, "-")
              .toLowerCase()}`}
          >
            {capFirstWordFromString(product?.title)}
          </Link>
        </Heading>

        <Stack direction={"row"} align={"center"}>
          <Text color="gray.700" fontSize="sm">
            {numberWithCommas(
              product?.estimatedPrice ? product?.estimatedPrice : 0
            )}{" "}
            Ks
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
