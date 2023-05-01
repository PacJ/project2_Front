import { Container } from 'reactstrap';
import RegisterScreen from './RegisterScreen';

const Register = () => {
  return (
    <>
      <div
        className='page-header'
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
        }}
      >
        <div className='filter' style={{ zIndex: -1 }} />
        <Container>
          <RegisterScreen />
        </Container>

        <div className='footer register-footer text-center'></div>
      </div>
    </>
  );
};

export default Register;
