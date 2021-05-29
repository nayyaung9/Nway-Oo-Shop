import React from "react";
import {
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Code,
  Icon,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";

import { useRef } from "react";

const MultipleFileUpload = () => {
  const inputRef = useRef();

  return (
    <FormControl isRequired>
      <FormLabel htmlFor="writeUpFile">Product Images</FormLabel>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={DownloadIcon} />}
        />
        <input
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
        ></input>
        <Input
          placeholder={"Your file ..."}
          onClick={() => inputRef.current.click()}
          // value={value}
        />
      </InputGroup>
      {/* <FormErrorMessage>
        {invalid}
      </FormErrorMessage> */}
    </FormControl>
  );
};

export default MultipleFileUpload;
