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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

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
        localStorage.setItem('adminName', input.name);
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
    <div
      className='page-header'
      style={{
        backgroundImage: 'url(' + require('assets/img/login-image.jpg') + ')',
        marginTop: '70px',
      }}
    >
    <Container>
      <Row>
        <Col className='ml-auto mr-auto' lg='4'>
          <Card className='card-register ml-auto mr-auto'>
            <h3 className='title mx-auto'>관리자 정보 수정</h3>
            <Form className='register-form' onSubmit={handleSubmit}>
              {/* <hr></hr> */}

              <label>Email</label>
              <InputGroup className='form-group-no-border'>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <FontAwesomeIcon icon={faEnvelope}/>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder='아이디'
                  type='text'
                  value={localStorage.getItem('adminEmail')}
                  readOnly
                />
              </InputGroup>

              <label>Name</label>
              <InputGroup className='form-group-no-border'>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <FontAwesomeIcon icon={faCircleUser}/>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder={localStorage.getItem('adminName')}
                  type='text'
                  name='name'
                  value={input.name}
                  onChange={handleValueChange}
                />
              </InputGroup>

              <label>Password</label>
              <InputGroup className='form-group-no-border'>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <FontAwesomeIcon icon={faLock}/>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder='****'
                  type='password'
                  name='password'
                  onChange={handleValueChange}
                />
              </InputGroup>

              <Button block className='btn-square my-5' color='danger' type='submit'>
                정보 업데이트
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default AdminEditInfo;
