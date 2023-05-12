import React, { useState } from 'react';
import user from '../../assets/img/user.jpg';
import unlock from '../../assets/img/unlock.png';
import axios from 'axios';

import { baseUrl } from 'Apiurl';

import {
  Button,
  Card,
  Form,
  Input,
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';

function AdminEditInfo() {
  const lcname = localStorage.getItem('adminName');

  const [input, setInput] = useState({
    email: localStorage.getItem('adminEmail'),
    name: '',
    password: '',
  });
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('Authorization'),
    },
  };

  const handleValueChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 관리자 정보 업데이트 로직을 여기에 처리
    // 예를 들어, 새로운 관리자 이름과 비밀번호를 서버로 요청하여 업데이트
    await axios
      .post(`${baseUrl}/admin/update`, input, config)
      .then((response) => {
        setInput({
          name: localStorage.getItem('adminName'),
          password: '',
        });
      })

      .then((response) => {
        window.location.replace('/');
      })
      .catch((err) => {
        console.error(err.message);
      });

    console.log('관리자 이름:', input.name);
    console.log('관리자 비밀번호:', input.password);
    // 제출 후 폼 필드 초기화
    setInput({
      name: '',
      password: '',
    });
  };

  return (
    <Container>
      <Row>
        <Col className='ml-auto mr-auto' lg='4'>
          <Card className='card-register ml-auto mr-auto'>
            <h3 className='title mx-auto'>AdminEditInfo</h3>
            <Form className='register-form' onSubmit={handleSubmit}>
              <hr></hr>

              <InputGroup className='form-group-no-border'>
                <InputGroupText>
                  <img src={user} alt='' width='20' />
                  {/* 이름 모양 아이콘 */}
                </InputGroupText>

                <Input
                  placeholder='아이디'
                  type='text'
                  value={localStorage.getItem('adminEmail')}
                  readOnly
                />
              </InputGroup>

              <InputGroup className='form-group-no-border'>
                <InputGroupText>
                  <img src={user} alt='' width='20' />
                  {/* 이름 모양 아이콘 */}
                </InputGroupText>

                <Input
                  placeholder={localStorage.getItem('adminName')}
                  type='text'
                  name='name'
                  value={input.name}
                  onChange={handleValueChange}
                />
              </InputGroup>

              <InputGroup className='form-group-no-border'>
                <InputGroupText>
                  <img src={unlock} alt='' width='20' />
                </InputGroupText>
                <Input
                  placeholder=''
                  type='password'
                  name='password'
                  onChange={handleValueChange}
                />
              </InputGroup>

              <Button block className='btn-round' color='danger' type='submit'>
                정보 업데이트
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminEditInfo;
