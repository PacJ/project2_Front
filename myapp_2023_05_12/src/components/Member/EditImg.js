import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../Apiurl";
import { useNavigate } from "react-router-dom";

const EditImg = () => {
  const [file, setFile] = useState("");

  const formHeaders = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("Authorization"),
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]); // 선택한 파일을 state에 저장
    console.log(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // 이미지 파일을 서버로 전송하기 위한 FormData 객체 생성
    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", localStorage.getItem("email"));

    await axios.post(`${baseUrl}/profile/imgUpdate`, formData, {
      headers: formHeaders,
    });

    window.location.replace("/");
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="container">
          <h1>프로필 사진 변경</h1>

          <div className="form-group mb-1">
            <label htmlFor="profileImg">프로필 이미지</label>
            <input
              type="file"
              className="form-control-file"
              name="profileImg"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            회원정보 수정
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditImg;
