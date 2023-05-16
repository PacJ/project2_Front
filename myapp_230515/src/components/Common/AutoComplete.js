import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import { baseUrl } from "Apiurl";
import axios from "axios";
import { useState, useEffect } from "react";
import { styled, lighten, darken } from "@mui/material/styles";

export default function ComboBox({ onQueryChange }) {
  const [allKeywords, setAllKeywords] = useState([]);
  const [query, setQuery] = useState("");
  const OPTIONS_LIMIT = 8;
  const defaultFilterOptions = createFilterOptions();

  const filterOptions = (options, state) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/selectAll`)
      .then((response) => {
        const names = response.data;
        setAllKeywords(names);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleOptionSelect = (event, value) => {
    if (value) {
      setQuery(value);
      onQueryChange(value);
    }
  };

  const GroupHeader = styled("div")(({ theme }) => ({
    position: "sticky",
    top: "-8px",
    padding: "4px 10px",
    color: theme.palette.primary.main,
  }));

  const GroupItems = styled("ul")({
    padding: 0,
  });
  return (
    <Autocomplete
      value={query}
      // disableClearable
      filterOptions={filterOptions}
      id="free-solo-2-demo"
      options={allKeywords}
      groupBy={(option) => option.key === "Popular Movies"}
      sx={{ width: 250 }}
      onChange={handleOptionSelect}
      renderInput={(params) => (
        <TextField
          {...params}
          label="검색어를 입력하세요"
          onChange={(event) => {
            const value = event.target.value;
            setQuery(value);
            onQueryChange(value);
          }}
        />
      )}
      freeSolo
      autoHighlight
      renderGroup={(params, idx) => (
        <li key={params.key}>
          <GroupHeader>인기 영화</GroupHeader>
          <GroupItems>
            {idx}
            {params.children}
          </GroupItems>
        </li>
      )}
    />
  );
}
