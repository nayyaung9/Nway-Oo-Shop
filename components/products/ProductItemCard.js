import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Link,
} from "@chakra-ui/react";

export default function ProductItemCard({ product }) {
  return (
    <div style={{ padding: 8 }}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        style={{
          boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)",
        }}
        maxW="100%"
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        rounded={"lg"}
      >
        <Box rounded={"lg"} height={"230px"}>
          <Image
            height={230}
            width={"full"}
            objectFit={"cover"}
            src={product?.productImages[0]}
            borderTopRightRadius="lg"
            borderTopLeftRadius="lg"
          />
        </Box>
        <Stack p={6} pt={4}>
          <Heading as="h6" size="xs">
            <Link href={`/p/12345/product-name`} className="linkHref">
              {product?.title}
            </Link>
          </Heading>

          <Stack direction={"row"} align={"center"}>
            <Text color="gray.500" fontSize="sm">
              Vegetarian • Indian • Pure veg
            </Text>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}
