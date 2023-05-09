import { baseUrl } from "Apiurl";
import axios from "axios";
import { useEffect, useState } from "react";

const RecList = () => {
  const [recList, setrecList] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
  };

  const member_id = localStorage.getItem("member_id");
  console.log(member_id);

  const getRecommendations = async () => {
    await axios
      .get(`${baseUrl}/recommend/${member_id}}`, config)
      .then((response) => setrecList(response.data))
      .then(console.log(response.data));
  };

  useEffect(() => {
    getRecommendations();
  }, []);

  return (
    <div className="container">
      {/* 인물 사진 존재의 유/무에 따른 사진 출력 */}
      {recList}
    </div>
  );
};

export default RecList;
