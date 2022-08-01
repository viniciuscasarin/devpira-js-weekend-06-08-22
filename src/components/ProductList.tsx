import { useState } from "react";

import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";

import Card from "../components/Card";
import { ProductType } from "../types/product";

type Props = {
  list: ProductType[];
};

function ProductList({ list }: Props) {
  const [filterString, setFilterString] = useState("");
  const [filteredList, setFilteredList] = useState<ProductType[]>(list);

  function handleInputChange(string: string) {
    setFilterString(string);
    setFilteredList(getFilteredList(string));
  }

  function getFilteredList(string: string) {
    return list.filter((item) => {
      return item.name.toLowerCase().indexOf(string) !== -1;
    });
  }

  return (
    <>
      <FormControl sx={{ width: "100%" }} variant="standard">
        <InputLabel htmlFor="input-search">Pesquisar lanches</InputLabel>
        <Input
          id="input-search"
          type="text"
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
          value={filterString}
          onChange={({ target }) =>
            handleInputChange(target.value.toLowerCase())
          }
        />
      </FormControl>
      <Stack spacing={1} pt={2}>
        {filteredList?.map((item) => (
          <Card
            key={item.id}
            name={item.name}
            price={item.price}
            thumb={item.thumb}
            href={`/comidinha/${item.id}`}
          />
        ))}
      </Stack>
    </>
  );
}

export default ProductList;
