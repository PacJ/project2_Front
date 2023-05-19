import { baseUrl } from 'Apiurl';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const EditModal = ({ isOpen, onRequestClose}) => {
  const [member, setMember] = useState({
    password: "",
    name: "",
    nickname: "",
    visibility: "",
  });

  const [input, setInput] = useState({
    password: "",
  });

  const { password, name, nickname } = member;

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
  const passField = document.querySelector("input[name='password2']");

  const passChange = (e) => {
    e.preventDefault();
    if (password !== e.target.value) setPasswordCheck("비밀번호 불일치");
    else setPasswordCheck("비밀번호 일치");
  };

  const handleValueChange = (e) => {
    // e.preventDefault();
    //추가한 부분
    if (e.target.name === "password") {
      setInput({ ...input, [e.target.name]: e.target.value });
    }
    let value = e.target.value;
    if (e.target.type === "radio") {
      value = parseInt(value);
    }

    setMember({ ...member, [e.target.name]: e.target.value });
    console.log(member.visibility);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password === "") {
      alert("비밀번호를 입력하세요.");
      return;
    }
    if (password !== passField.value) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    await axios.post(`${baseUrl}/profile/update`, member, config);
    localStorage.setItem("nickname", nickname);
    //navigator('/');
    //window.location.replace("/");
    window.location.replace(`/profile/${localStorage.getItem("member_id")}`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit"
      className="EditModal"
      overlayClassName="EditOverlay"
    >
      <div className="container">
        <form onSubmit={onSubmit}>
          <div className="container">
            <h3 className='mb-4'>회원 정보 수정</h3>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="이메일"
                value={localStorage.email}
                readOnly
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="비밀번호"
                value={password}
                onChange={handleValueChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                name="password2"
                placeholder="비밀번호 확인"
                onChange={passChange}
              />
              <span>{passwordCheck}</span>
            </div>

            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                name="nickname"
                placeholder="닉네임"
                value={nickname}
                onChange={handleValueChange}
              />
            </div>

            <div className="form-group mb-4">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="이름"
                value={name}
                onChange={handleValueChange}
              />
            </div>

            <div style={{ marginTop: "25px" }}>
              <div
                className="form-check-radio"
                style={{ color: "white" }}
              >
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="visibility"
                    id="exampleRadios1"
                    value="1"
                    checked={member.visibility === "1"} // 수정된 부분
                    onChange={handleValueChange}
                  />
                  프로필 공개
                  <span className="form-check-sign"></span>
                </label>
              </div>
              <div
                className="form-check-radio"
                style={{ color: "white" }}
              >
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="visibility"
                    id="exampleRadios2"
                    value="2"
                    checked={member.visibility === "2"} // 수정된 부분
                    onChange={handleValueChange}
                  />
                  프로필 비공개
                  <span className="form-check-sign"></span>
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              회원정보 수정
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default EditModal;