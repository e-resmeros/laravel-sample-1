import styled, {withTheme} from 'styled-components';

export const InputComponent = styled.input`
  width: 100%;
  margin-bottom: 15px;
  padding-bottom: 5px;
  padding-right: 50px;
  background-color: ${props => (props.transparent ? 'transparent' : 'white')};
  color: #232323;
  border: 0;
  border-bottom: 2px solid #d1d1d1;
  font-family: ${props => props.theme.fontPrimary};
  font-size: 16px;
  outline: none;

  &:-webkit-autofill {
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export const Input = withTheme(InputComponent);
