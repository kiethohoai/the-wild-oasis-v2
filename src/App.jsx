import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyle';
import Button from './ui/Button';
import Input from './ui/Input';

const H1 = styled.h1`
  font-size: 48px;
  font-weight: 600;
  background-color: yellow;
`;

const StyledApp = styled.div`
  background-color: red;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The Wild Oasis</H1>

        <Button onClick={() => alert('Chekc in')}>Check In</Button>
        <Button onClick={() => alert('Check out')}>Check Out</Button>

        <div>
          <Input type="number" placeholder="Number of guest..." />
          <Input type="number" placeholder="Number of guest..." />
        </div>
      </StyledApp>
    </>
  );
}

export default App;
