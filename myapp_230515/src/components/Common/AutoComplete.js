import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import { baseUrl } from "Apiurl";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ComboBox({ onQueryChange }) {
  //   DB에 있는 모든 영화 이름, 배우 이름, 감독 이름
  const [allKeywords, setAllKeywords] = useState([]);

  //   검색을 할 쿼리
  const [query, setQuery] = useState("");

  //   옵션 출력 갯수
  const OPTIONS_LIMIT = 5;
  const defaultFilterOptions = createFilterOptions();

  //    옵션 출력 갯수(10개(OPTIONS_LIMIT값)만 출력해줘)
  const filterOptions = (options, state) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };

  useEffect(() => {
    axios
      //selectAll에 get요청
      //모든 배우,감독,영화 이름을 List<String>으로 가져온다.
      .get(`${baseUrl}/selectAll`)
      .then((response) => {
        const names = response.data;
        //가져온 String들을 키워드로 set한다.
        setAllKeywords(names);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //   출력 되는 옵션을 클릭 했을 시 검색 할 쿼리값 변경
  const handleOptionSelect = (event, value) => {
    if (value) {
      // 쿼리값을 선택한 옵션의 value로 줌.
      setQuery(value);

      // 쿼리값이 변경될시에 상위(IndexNavbar.js) 전달할 query값 변경.
      onQueryChange(value);
    }
  };

  return (
    <Autocomplete
      value={query}
      // x 표시 없애기
      disableClearable
      //   한번에 출력되는 option 수 제한
      filterOptions={filterOptions}
      id='free-solo-2-demo'
      //   모든 영화,배우,감독 이름이 있다.
      options={allKeywords}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      sx={{ width: 250 }}
      //   입력값이 변경 될 시에 쿼리값 두 종류도 변경.
      onChange={handleOptionSelect}
      renderInput={(params) => (
        <TextField
          {...params}
          label='검색어를 입력하세요'
          onChange={(event) => {
            const value = event.target.value;
            setQuery(value);
            onQueryChange(value);
          }}
          style={{}}
        />
      )}
      // 아래화살표 표시 없애기
      freeSolo
      autoHighlight
    />
  );
}
