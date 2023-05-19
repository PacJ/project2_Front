import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { baseUrl } from 'Apiurl';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

// reactstrap components
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
import KakaoButton from './KakaoButton';
import NaverButton from './NaverButton';


const Login = () => {
  const passField = document.querySelector("Input[name='password']");
  const emailField = document.querySelector("Input[name='email']");
  const [submitted, setSubmitted] = useState(false);
  const [isvalid, setIsvalid] = useState();
  const [success, setSuccess] = useState(true);

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;

  const handleValueChange = (e) => {
    // 이메일 필드에 대한 유효성 검사와 중복 확인
    if (e.target.name === "email") {
      // 이메일 형식이 올바른지 검사
      console.log(isvalid);
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
    if (e.target.name === "password") {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
  };

  const urlReg = () => {
    window.location.replace('/register');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const config = { headers: { 'Content-Type': 'application/json' } };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //입력한 로그인 정보 보내기
  const onSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);
    if (!email || !password || !isvalid) {
      return;
    }

    const newInputs = {
      ...inputs,
      email: `user!$${inputs.email}`
    };

    await axios
      .post(`${baseUrl}/login`, newInputs, config)
      .then((response) => {
        setSuccess(true);
        console.log(response.data);
        if (response.data.type === "일반") {
          console.log("response: ", response.data);
          //let jwtToken = response.headers['Authorization'];
          let jwtToken = response.headers.get("Authorization");
          console.log(jwtToken);

          let jwtMemberId = response.data.member_id;
          let jwtMemberName = response.data.name;
          let jwtMemberNickname = response.data.nickname;
          let jwtMemberEmail = response.data.email;
          let jwtAuthRole = response.data.authRole;
          let jwtProfile_path = response.data.profile_path;
          let jwtGrade = response.data.grade;

          localStorage.setItem("Authorization", jwtToken);
          localStorage.setItem("member_id", jwtMemberId);
          localStorage.setItem("email", jwtMemberEmail);
          localStorage.setItem("name", jwtMemberName);
          localStorage.setItem("nickname", jwtMemberNickname);
          localStorage.setItem("authRole", jwtAuthRole);
          localStorage.setItem("isLogin", "true");
          localStorage.setItem("profile_path", jwtProfile_path);
          localStorage.setItem("grade", jwtGrade);

          // setInputs({ email: "", password: "" });
          window.location.replace("/");
        } else {
          alert("아이디와 비밀번호를 확인해주세요");
        }
      })
      .catch((err) => {
        console.error(err.message);
        setSuccess(false);
        console.log(success && success);
      });
  };

  const idcheck = async (e) => {
    await axios
      .post(
        `http://localhost:8090/emailcheck`,
        { email: e.target.value },
        config
      )
      .then((response) => {
        console.log(response.data);
        setIsvalid(validateEmail(e.target.value));
      })
      .catch((error) => console.error(error));
  };


  const [authShow, setAuthShow] = useState(false);
  const handleAuthClose = () => setAuthShow(false);
  const handleAuthShow = () => setAuthShow(true);


  return (
    <>
      {/* <IndexNavbar /> */}
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
              <Card
                className='card-register ml-auto mr-auto'
                style={{ backgroundColor: '#343a40' }}
              >
                <div style={{ textAlign: "center" }}>
                  <img alt='...' src={require('assets/img/logo.gif')} style={{ width: "180px", filter: "invert(0%)", marginBottom: '30px' }} />
                </div>
                <div className='social-line text-center'></div>
                <Form className='register-form'>
                  {/* <label>이메일</label> */}
                  <InputGroup className='form-group-no-border'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder='Email'
                      type='email'
                      name='email'
                      onChange={handleValueChange}
                      value={email}
                      onBlur={idcheck}
                    />
                  </InputGroup>
                  {isvalid === false && submitted === true && emailField && (
                    <span
                      style={{
                        color: "rgb(255,171, 154)",
                        animation: "glow 1s ease-in-out infinite",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      유효하지 않은 이메일입니다.
                    </span>
                  )}
                  {emailField &&
                    email.trim() === "" &&
                    submitted === true &&
                    !isvalid && (
                      <span
                        style={{
                          color: "rgb(255,171, 154)",
                          animation: "glow 1s ease-in-out infinite",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        이메일을 입력해주세요.
                      </span>
                    )}
                  <br></br>

                  {/* <label>비밀번호</label> */}
                  <InputGroup className='form-group-no-border'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <FontAwesomeIcon icon={faLock} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      className="text-Input-pw"
                      placeholder='Password'
                      type='password'
                      name='password'
                      onChange={handleValueChange}
                      value={password}
                      maxlength="13"
                    />
                  </InputGroup>
                  {passField &&
                    password.trim() === "" &&
                    submitted === true && (
                      <span
                        style={{
                          color: "rgb(255,171, 154)",
                          animation: "glow 1s ease-in-out infinite",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        비밀번호를 입력해주세요.
                      </span>
                    )}
                  {!success && success === false && (
                    <span
                      style={{
                        color: "rgb(255,171, 154)",
                        animation: "glow 1s ease-in-out infinite",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      이메일과 비밀번호를 확인해주세요.
                    </span>
                  )}

                  <button
                    className='btn-round'
                    color='danger'
                    onClick={onSubmit}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = '#d43f3f')
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = '#e75757')
                    }
                    style={{
                      height: '40px',
                      width: '100%',
                      marginTop: '20px',
                      color: 'white',
                      border: 0,
                      borderRadius: '5px',
                      backgroundColor: '#e75757',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease',
                      textAlign: 'center',
                      fontFamily: 'NanumSquare',
                    }}
                  >
                    로그인
                  </button>
                </Form>
                <button
                  className='btn-round'
                  color='danger'
                  onClick={urlReg}
                  // href='/register'
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = '#d43f3f')
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = '#e75757')
                  }
                  style={{
                    height: '40px',
                    width: '100%',
                    marginTop: '20px',
                    color: 'white',
                    border: 0,
                    borderRadius: '5px',
                    backgroundColor: '#e75757',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    textAlign: 'center',
                    fontFamily: 'NanumSquare',
                  }}
                >
                  회원가입
                </button>
                <div
                  className='login-API'
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    marginTop: '20px',
                  }}
                >
                  <NaverButton></NaverButton>
                  <KakaoButton></KakaoButton>

                  {/* 구글 로그인 버튼 */}
                  <img
                    alt='...'
                    src={require('assets/img/btnG_G.png')}
                    style={{ width: 65, cursor:"pointer" }}
                    onClick={handleAuthShow}
                  />
                  <Modal
                    isOpen={authShow}
                    onRequestClose={handleAuthClose}
                    contentLabel="Auth"
                    className="AuthModal"
                    overlayClassName="AuthOverlay"
                  >
                    <div>
                      <div className='d-flex justify-content-center'>
                        <h3>아직 준비중입니다~</h3>
                      </div>
                    </div>
                  </Modal>
                </div>

                <div className='forgot'>
                  <Button
                    className='btn-link'
                    color='danger'
                    href='#pablo'
                    onClick={(e) => e.preventDefault()}
                  >
                    비밀번호를 잊으셨습니까?
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className='footer register-footer text-center'></div>
      </div>
    </>
  );
};

export default Login;
