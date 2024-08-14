import styled from 'styled-components';

const H1 = styled.h1`
  font-size: 48px;
  font-weight: 600;
  background-color: yellow;
`;

const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: 7px;
  background-color: purple;
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;

const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
`;

const StyledApp = styled.div`
  background-color: red;
  padding: 20px;
`;

function App() {
  return (
    <StyledApp>
      <H1>The Wild Oasis</H1>
      <Button onClick={() => alert('Chekc in')}>Check In</Button>
      <Button onClick={() => alert('Check out')}>Check Out</Button>
      <Input type="number" placeholder="Number of guest..." />
    </StyledApp>
  );
}

export default App;
