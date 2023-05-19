import { baseUrl } from 'Apiurl';
import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-modal';
import { FormGroup } from 'reactstrap';

Modal.setAppElement('#root');

const EditImgModal = ({ isOpen, onRequestClose, memberInfo }) => {
  const [file, setFile] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const formHeaders = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("Authorization"),
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]); // 선택한 파일을 state에 저장
    encodeFileToBase64(e.target.files[0]);
  };

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
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

    window.location.replace(`/profile/${localStorage.getItem("member_id")}`);
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
              {imageSrc && (
                <FormGroup
                  style={{ width: "100px", height: "100px", left: "150px" }}
                >
                  <img
                    src={imageSrc}
                    alt="preview-img"
                    style={{ width: "100%", height: "100%" }}
                  />
                </FormGroup>
              )}
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