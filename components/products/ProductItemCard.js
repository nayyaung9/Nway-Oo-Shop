import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";


export default function ProductItemCard({ id, image }) {
  return (
    <Center py={12}>
      <Box
        mr="2"
        ml="2"
        borderWidth="1px"
        borderRadius="lg"
        style={{
          boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)",
        }}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        rounded={"lg"}
      >
        <Box rounded={"lg"} height={"230px"}>
          <Image
            height={230}
            width={"full"}
            objectFit={"cover"}
            src={image}
            borderTopRightRadius="lg"
            borderTopLeftRadius="lg"
          />
        </Box>
        <Stack p={6} pt={10} align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            {id}
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            Nice Chair, pink
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Text fontWeight={800} fontSize={"xl"}>
              $57
            </Text>
            <Text textDecoration={"line-through"} color={"gray.600"}>
              $199
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
