import React from "react";
import {
  Input,
  InputGroup,
  Button,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { theme } from '@/utils/theme';

const SocialInputs = ({ social, setSocial }) => {
  const onAddRowToSocial = () => {
    const payload = {
      url: "",
    };

    setSocial([...social, payload]);
  };

  const onSocialUrlChange = (e, i) => {
    const { name, value } = e.target;
    console.log(e.target);
    const list = [...social];
    list[i][name] = value;
    setSocial(list);
  };

  const onRemoveRowFromSocial = (index) => {
    const updates = social.filter((list, cIndex) => cIndex !== index);
    setSocial(updates);
  };

  return (
    <React.Fragment>
      {social &&
        social.map((socialItem, i) => (
          <HStack spacing={8} key={i} mb="3">
            <div style={{ flex: 1 }}>
              <InputGroup size="sm" key={i}>
                <Input
                  placeholder="Social Media Link"
                  value={socialItem[i]?.url}
                  name="url"
                  onChange={(e) => onSocialUrlChange(e, i)}
                />
              </InputGroup>
            </div>
            {social.length !== 1 && (
              <IconButton
                colorScheme="red"
                aria-label="Delete Social"
                size="sm"
                isRound
                onClick={() => onRemoveRowFromSocial(i)}
                icon={<DeleteIcon />}
              />
            )}
          </HStack>
        ))}
      {social && social.length >= 3 && (
        <p style={{ color: "red" }}>Maximun Social Link is up to 3.</p>
      )}
      <Button
        bg={theme.secondaryColor}
        size="sm"
        mt="4"
        onClick={onAddRowToSocial}
        disabled={social && social.length >= 3 ? true : false}
      >
        Add Social
      </Button>
    </React.Fragment>
  );
};

export default SocialInputs;
