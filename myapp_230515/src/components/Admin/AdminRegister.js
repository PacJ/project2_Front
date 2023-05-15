import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from 'Apiurl';
import React from 'react';
import user from '../../assets/img/user.jpg';
import style from '../../assets/css/adminHeader.module.css';

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

function AdminRegister() {
  // 함수 기능
  const [result, setResult] = useState();
  const navigator = useNavigate();
  const [a, setA] = useState();
  const [admin, setadmin] = useState({
    email: '',
    password: '',
    name: '',
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const onSubmit = async (e) => {
    //스프링으로 쏘는 데이터쏨
    e.preventDefault();
    if (admin.email == '') {
      setA(1);
      alert('이메일을 확인하세요');

      return false;
    }
    if (admin.name == '') {
      setA(1);
      alert('이름을 확인하세요');
      return false;
    }
    if (admin.password == '') {
      setA(1);
      alert('비밀번호를 확인하세요');
      return false;
    } else {
      setA(0);
    }
    if (result > 0) {
      return false;
    }
    if (a === 0 && result === 0) {
      await axios
        .post(`${baseUrl}/adminregister`, admin, config)
        .then((response) => {
          setadmin({
            email: '',
            password: '',
            name: '',
          });
        })
        .then((response) => {
          navigator('/adminpage');
        })
        .catch((err) => {
          console.error(err.message);
        });
    } else {
      alert('입력을 확인해주세요');
    }
  };
  const handleValueChange = (e) => {
    //radio버튼에서는 e.preventDefault()를 하면 더블 클릭을 해줘야 한다.
    //e.preventDefault();

    setadmin({ ...admin, [e.target.name]: e.target.value });
    if (admin.email == '') {
      setA(1);
      alert('이메일을 확인하세요');
    }
  };

  const handleEmailChange = async (e) => {
    //radio버튼에서는 e.preventDefault()를 하면 더블 클릭을 해줘야 한다.
    //e.preventDefault();
    e.preventDefault();
    await axios
      .post(`${baseUrl}/admin/idcheck`, e.target.value, config)
      .then((response) => {
        setadmin({
          email: '',
          password: '',
          name: '',
        });

        console.log(response.data);
        if (response.data > 0) {
          // 중복이 있을 경우에  어떻게 처리 해야할 것들 1. 값을 비우고 포커스를 하고 가입 버튼을 눌러도 진행되지 않게 막아야한다.
          // 그리고 값이 비어있을 경우에 가입버튼을 눌러도 가입이 진행되지 않고 반드시 입력을 하게 만들어야 된다.
          // 2. 숨겨진 span을 넣어서 response.data ===1 일 경우에 출력되게 만든다. ex> "사용이 불가능한 이메일입니다."
          // 3. 이메일이나 비밀번호에 규칙을 걸어서 어느정도 구조나 형식을 요구해서 그 요구사항에 맞지 않으면 가입이 안되게 막는다.
          alert('사용불가');
          setResult(1);
        } else {
          setResult(0);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
    setadmin({ ...admin, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
      className='page-header'
      style={{
        backgroundImage: 'url(' + require('assets/img/login-image.jpg') + ')',
        marginTop: '88px',
      }}
    >
      <div className='filter' />
      <Container>
      <Row>
        <Col className='ml-auto mr-auto' lg='4'>
          <Card className='card-register ml-auto mr-auto'>
            <h3 className='title mx-auto'>관리자 회원가입</h3>
            <Form className='register-form' onSubmit={onSubmit}>
              <label>Email</label>
              <InputGroup className='form-group-no-border'>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <FontAwesomeIcon icon={faEnvelope}/>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder='이메일'
                  type='text'
                  name='email'
                  className='form-control'
                  // placeholder='이메일'
                  maxLength='20'
                  onChange={handleEmailChange}
                />
              </InputGroup>
              {result > 0 && <span>중복된 이메일입니다.</span>} <br />
              
              <label>Name</label>
              <InputGroup className='form-group-no-border mb-3'>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <FontAwesomeIcon icon={faCircleUser}/>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder='이름'
                  type='text'
                  name='name'
                  className='form-control'
                  // placeholder='이메일'
                  maxLength='20'
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
                  placeholder='비밀번호'
                  type='password'
                  name='password'
                  className='form-control'
                  // placeholder='이메일'
                  maxLength='20'
                  onChange={handleValueChange}
                />
              </InputGroup>
              <Button block className='btn-square my-5' color='danger'>
                Register
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
    </>
  );
}

export default AdminRegister;
