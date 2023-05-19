//ProviderInfo.js//

import { Col, Container, Row } from 'reactstrap';

const ProviderInfo = ({ contents = {} }) => {
  const providers = Array.isArray(contents.providerDTO)
    ? contents.providerDTO
    : [];

  console.log(providers.name);

  return (
    <>
      <Container>
        <Row className='my-5'>
          <Col>
            <div className='movie-detail'>
              <h3>감상 가능한 곳</h3>
              {providers.map((provider, index) => (
                <img
                  key={index}
                  src={process.env.PUBLIC_URL + '/' + provider.name + '.png'}
                  alt={provider.name}
                  width='50'
                  height='50'
                  style={{ margin: 5 }}
                />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProviderInfo;