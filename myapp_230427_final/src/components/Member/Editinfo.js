import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../Apiurl";
import { useNavigate } from "react-router-dom";

const EditInfo = () => {
  const [member, setMember] = useState({
    password: "",
    name: "",
  });

  const { password, name } = member;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const info = async () => {
    return await axios
      .get(`${baseUrl}/member/editinfo/${localStorage.email}`, config)
      .then((response) => {
        setMember({ ...response.data, password: "" });
      });
  };

  useEffect(() => {
    info();
  }, []);

  const [passwordCheck, setPasswordCheck] = useState("");

  const passChange = (e) => {
    e.preventDefault();
    if (password !== e.target.value) setPasswordCheck("비밀번호 불일치");
    else setPasswordCheck("비밀번호 일치");
  };

  const handleValueChange = (e) => {
    e.preventDefault();
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      alert("비밀번호를 입력하세요.");
      return;
    }

    await axios.post(`${baseUrl}/profile/update`, member, config);
    localStorage.setItem("name", name);
    //navigator('/');
    window.location.replace("/");
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="container">
          <h1>회원가입</h1>
          <div className="form-group mb-1">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="이메일"
              value={localStorage.email}
              readOnly
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="비밀번호"
              value={password}
              onChange={handleValueChange}
            />
          </div>

          <div className="form-group mb-1">
            <input
              type="password"
              className="form-control"
              name="password2"
              placeholder="비밀번호 확인"
              onChange={passChange}
            />
            <span>{passwordCheck}</span>
          </div>

          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="이름"
              value={name}
              onChange={handleValueChange}
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

export default EditInfo;
