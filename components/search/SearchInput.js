import React, { useState } from "react";
import styled from "styled-components";
import { SearchIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const SearchInput = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  return (
    <SearchArea>
      <SearchInputTerm type="text" placeholder="What are you looking for?" 
      value={searchInput} onChange={e => setSearchInput(e.target.value)} />
      <SearchButton
        type="button"
        onClick={() =>
          router.push({
            pathname: "/search",
            query: { name: searchInput },
          })
        }
      >
        <SearchIcon />
      </SearchButton>
    </SearchArea>
  );
};

const SearchArea = styled.div`
  width: 40%;
  position: relative;
`;

const SearchInputTerm = styled.input`
  border-width: 0;
  border-radius: 25px;
  position: relative;
  height: 41px;
  width: 100%;
  border: 2px solid #fed700;
  border-radius: 25px;
  height: 36px;
  box-shadow: none;
  padding-left: 20px;
`;

const SearchButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 100%;
  line-height: 19px;
  border-width: 0 0 0 1px;
  border-style: solid;
  border-color: #fed700;
  border-radius: 0 25px 25px 0;
  cursor: pointer;
  opacity: 1;
  padding: 0;
  background-color: #fed700;
`;
export default SearchInput;
