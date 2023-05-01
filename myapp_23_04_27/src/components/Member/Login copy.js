import { baseUrl } from "Apiurl";
import axios from "axios";
import React, { useState } from "react";

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
} from "reactstrap";

const Login = () => {
  const [inputs, setInputs] = useState({
    memberEmail: "",
    memberPass: "",
  });

  const { memberEmail, memberPass } = inputs;

  const handleValueChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const config = { headers: { "Content-Type": "application/json" } };

  //입력한 로그인 정보 보내기
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${baseUrl}/login`, inputs, config)
      .then((response) => {
        console.log("response: ", response.data);
        //let jwtToken = response.headers['Authorization'];
        let jwtToken = response.headers.get("Authorization");
        console.log(jwtToken);

        let jwtMemberName = response.data.memberName;
        let jwtMemberEmail = response.data.memberEmail;
        let jwtAuthRole = response.data.authRole;

        localStorage.setItem("Authorization", jwtToken);
        localStorage.setItem("memberEmail", jwtMemberEmail);
        localStorage.setItem("memberName", jwtMemberName);
        localStorage.setItem("authRole", jwtAuthRole);
        localStorage.setItem("isLogin", "true");

        setInputs({ memberEmail: "", memberPass: "" });
      })
      .then((response) => {
        //navigator('/'); 를 사용하려면 위에 const navigator = useNavigate(); 선언필요
        window.location.replace("/");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  return (
    <>
      {/* <IndexNavbar /> */}
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
        }}
      >
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">로그인</h3>
                <div className="social-line text-center"></div>
                <Form className="register-form">
                  <label>이메일</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      name="memberEmail"
                      onChange={handleValueChange}
                      value={memberEmail}
                    />
                  </InputGroup>
                  <label>비밀번호</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      name="memberPass"
                      onChange={handleValueChange}
                      value={memberPass}
                    />
                  </InputGroup>
                  <Button
                    block
                    className="btn-round"
                    color="danger"
                    onClick={onSubmit}
                  >
                    로그인
                  </Button>
                  <Button
                    block
                    className="btn-round"
                    color="danger"
                    href="/register"
                  >
                    회원가입
                  </Button>
                </Form>
                <div className="forgot">
                  <Button
                    className="btn-link"
                    color="danger"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    비밀번호를 잊으셨습니까?
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="footer register-footer text-center">
          <h6>
            © {new Date().getFullYear()}, made with{" "}
            <i className="fa fa-heart heart" /> by Creative Tim
          </h6>
        </div>
      </div>
    </>
  );
};

export default Login;
