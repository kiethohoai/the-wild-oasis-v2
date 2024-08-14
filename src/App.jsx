import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyle';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';
import Row from './ui/Row';

const StyledApp = styled.div`
  /* background-color: red; */
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type="hor">
            <Heading as="h1">The Wild Oasis</Heading>
            <div>
              <Heading as="h2">Check in & out</Heading>
              <Button onClick={() => alert('Chekc in')}>Check In</Button>
              <Button
                variations="secondary"
                sizes="medium"
                onClick={() => alert('Check out')}
              >
                Check Out
              </Button>
            </div>
          </Row>
          <Row>
            <Heading as="h3">Form</Heading>
            <form>
              <Input type="number" placeholder="Number of guest..." />
              <Input type="number" placeholder="Number of guest..." />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
