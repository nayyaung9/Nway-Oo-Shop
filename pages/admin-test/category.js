import React, { useState } from "react";
import { Input, Button, Select } from "@chakra-ui/react";
import { useSWRInfinite } from "swr";
import fetcher from "@/lib/fetch";

export function useCategories() {
  return useSWRInfinite(
    () => {
      return `/api/category/parent`;
    },
    fetcher,
    {
      refreshInterval: 10000, // Refresh every 10 seconds
    }
  );
}

const CategoryTest = () => {
  const { data } = useCategories();
  const categories = data
    ? data.reduce((acc, val) => [...acc, ...val.catelogs], [])
    : [];
  console.log(categories)

  const [state, setState] = useState({
    name: "",
    parent: "/",
    path: "/",
  });

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const { name, parent, path } = state;
    const payload = {
      name: name?.toLowerCase(),
      parent: parent?.toLowerCase(),
      path: `${parent === "/" ? "" : parent?.toLowerCase()}${
        name ? `/${name?.toLowerCase().replace(/\s/g, "-")}` : "/"
      }`,
    };
    console.log("state", payload);

    const res = await fetch("/api/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.status === 201) {
      const { newCatelog } = await res.json();

      console.log("newCatelog", newCatelog);
    } else {
      // setErrorMsg("Incorrect username or password. Try again!");
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 30 }}>
        <Input
          placeholder="Basic usage"
          value={state.name}
          onChange={(e) => setState({ ...state, name: e.target.value })}
        />

        <Select
          placeholder="Select option"
          value={state.parent}
          onChange={(e) => setState({ ...state, parent: e.target.value })}
        >
          {categories && categories.map((item, i) => (
          <option key={i} value={`/${item.name}`}>{item.name}</option>

          ))}

        </Select>

        <Button onClick={onFormSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default CategoryTest;
