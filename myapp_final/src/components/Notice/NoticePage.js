import { useCallback, useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Col, Row } from 'reactstrap';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { } from 'reactstrap';
import { baseUrl } from 'Apiurl';

function NoticePage() {
    const [imageSrc, setImageSrc] = useState('');

    const author = localStorage.getItem("adminName")

    const [notices, setNotices] = useState({
        admin_id: localStorage.getItem("adminId"),
        title: '',
        content: '',
    });

    const onDrop = useCallback((acceptedFiles) => {
        // 파일이 업로드될 때 실행되는 콜백 함수입니다.
        // 업로드된 파일 객체를 upload 상태값에 저장합니다.
        setNotices({
            ...notices,
            upload: acceptedFiles[0], // 여러 개의 파일을 업로드하려면 for문 등을 사용해야 합니다.
        });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleValueChange = (e) => {
        //radio버튼에서는 e.preventDefault()를 하면 더블 클릭을 해줘야 한다.
        //e.preventDefault();
        setNotices({ ...notices, [e.target.name]: e.target.value });
    };

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem("Authorization"),
        },
    };

    const [file, setFile] = useState("");

    const formHeaders = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("Authorization"),
    };

    const handleFileChange = (e) => {
        e.preventDefault();
        if (e.target.files[0] === null) {
            setFile(null);
        }
        setFile(e.target.files[0]); // 선택한 파일을 state에 저장
        console.log(e.target.files[0]);
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

    const onSubmit2 = async (e) => {
        e.preventDefault();

        // 이미지 파일을 서버로 전송하기 위한 FormData 객체 생성
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", notices.title);

        formData.append("content", notices.content);
        formData.append("admin_id", notices.admin_id);

        await axios.post(`${baseUrl}/noticefileupdate`, formData, {
            headers: formHeaders,
        }).then(
            alert("등록되었습니다"),
            window.location.replace("/admineditnotice")
        );
    };

    return <>
        <Container className="d-flex justify-content-center align-items-center" style={{ marginTop: '20px', height: '100vh', width: 1200 }}>
            <div>
                <Row>
                    <Col style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <h2>공지사항 작성</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>

                        <Form onSubmit={onSubmit2}>

                            <FormGroup>
                                <Label for="title">제목</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    onChange={handleValueChange}
                                    style={{ width: '600px' }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="author">작성자</Label>
                                <Input
                                    type="text"
                                    name="author"

                                    style={{ width: '600px' }}
                                    defaultValue={author}
                                    readOnly
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="content">내용</Label>
                                <Input
                                    type="textarea"
                                    rows="10"
                                    name="content"
                                    onChange={handleValueChange}

                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>첨부 이미지</Label>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    name="profileImg"
                                    onChange={handleFileChange}
                                />
                            </FormGroup>

                            {imageSrc && (
                                <FormGroup style={{ width: "100px", height: "100px" }}>
                                    <img src={imageSrc} alt="preview-img" style={{ width: "100%", height: "100%" }} />
                                </FormGroup>
                            )}

                            <FormGroup>
                                <button type="submit" className="btn btn-primary">
                                    저장하기
                                </button>
                            </FormGroup>

                        </Form>
                    </Col>
                </Row>
            </div >
        </Container >
    </>
}

export default NoticePage;
