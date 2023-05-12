import { baseUrl } from 'Apiurl';
import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const EditImgModal = ({ isOpen, onRequestClose }) => {
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
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit"
      className="EditImgModal"
      overlayClassName="EditImgOverlay"
    >
      <div className="container">
        <form onSubmit={onSubmit}>
          <div className="container">
            <h3 className='mb-4'>프로필 사진 변경</h3>

            <div className="form-group mb-3">
              <label htmlFor="profileImg">프로필 이미지를 선택해주세요.</label>
              <input
                type="file"
                className="form-control-file"
                name="profileImg"
                onChange={handleFileChange}
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

export default EditImgModal;