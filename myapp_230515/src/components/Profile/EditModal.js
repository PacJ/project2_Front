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
    localStorage.setItem('nickname', nickname);
    //navigator('/');
    window.location.replace("/");
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