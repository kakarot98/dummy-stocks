import React, { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  Select,
  Box,
  MenuItem,
  InputLabel,
  Autocomplete,
  Stack,
} from "@mui/material";
import axios from "axios";
import StockDetails from "./details/StockDetails";

function SearchBar({fetchTransactions}) {
  // const API_KEY = "17948866-a8bea270ce16ae94ad9ee0846";

  const [searchText, setSearchText] = useState("");
  const [stock, setStock] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [openInfo, setopenInfo] = useState(false);

  useEffect(() => {
    //function to fetch list of stocks whenever text in search bar updates
    const fetchApi = () => {
      if (searchText && searchText !== "") {
        axios
          .get(`https://api.twelvedata.com/symbol_search?symbol=${searchText}`)
          .then((res) => {
            console.log(res.data.data);
            setSuggestions(res.data.data);
          })
          .catch((err) => console.log(err));
      }
      if (searchText === "") {
        setSuggestions([]);
      }
    };
    fetchApi();
  }, [searchText]);

  //call when user submits the form or presses enter
  // const handleSubmit = e => {
  //   e.preventDefault()
  // }

  //call when an option from the list of options under search bar is selected
  const handleSelect = (value) => {
    setStock(value);
    console.log(value);
    if (value) setopenInfo(true);
  };

  return (
    <div>
      <Box>
      <Typography sx={{paddingRight:"1rem", paddingLeft: "1rem", fontFamily:"monospace"}}>Search for a company listed in the below search bar</Typography>
      <Box mx={1} sx={{marginTop: "2rem", marginBottom:"2rem"}}>

        <Autocomplete
          id="stock-search"
          freeSolo
          onInputChange={(e) => setSearchText(e.target.value)}
          onChange={(event, value) => handleSelect(value)}
          //options={suggestions && suggestions.map(option => option.instrument_name+" ("+option.symbol+")  -  "+ option.exchange)}
          options={suggestions || []}
          getOptionLabel={(option) => option.instrument_name}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.symbol + option.exchange}>
                {option.instrument_name}
              </li>
            );
          }}
          renderInput={(params) => <TextField {...params} label="Search" />}
          sx={{fontFamily:"monospace"}}
        />

        {/*----- opens dialog box with stock details when stock is selected ----*/}
        {stock && (
          <StockDetails
          fetchTransactions={fetchTransactions}
            openInfo={openInfo}
            setopenInfo={setopenInfo}
            stockInfo={stock}
          />
        )}
      </Box>
      </Box>
    </div>
  );
}

export default SearchBar;
