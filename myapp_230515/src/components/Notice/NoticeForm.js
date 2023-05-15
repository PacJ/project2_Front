import { useCallback, useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function NoticeForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [author, setAuthor] = useState('');
    const onDrop = useCallback((acceptedFile) => {
        setFile((file) => [...file, ...acceptedFile]);
    }, []);
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("Authorization"),
        },
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        // 공지사항을 서버에 전송하는 로직을 작성합니다.
        // 업로드한 파일 정보도 함께 전송할 수 있습니다.
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('file', file);
        formData.append('author', author)

        axios.post('http://localhost:8090/noticewrite', formData, config)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
                // 요청이 실패한 경우 실행될 코드
            });
        // fetch 또는 axios 등을 사용하여 formData를 전송합니다.
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="title">제목</Label>
                    <Input
                        type="text"
                        id="title"
                        value={title}
                        style={{ width: '600px' }}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="author">작성자</Label>
                    <Input
                        type="text"
                        id="author"
                        value={author}
                        style={{ width: '600px' }}
                        onChange={(event) => setAuthor(event.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="content">내용</Label>
                    <Input
                        type="textarea"
                        id="content"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="file">파일 업로드</Label>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {file ? <p>{file.name}</p> : <p>파일을 드래그하거나 클릭하여 업로드하세요.</p>}
                    </div>
                </FormGroup>
                <Button type="submit">작성</Button>
            </Form>
        </Container>
    );
}

export default NoticeForm;
