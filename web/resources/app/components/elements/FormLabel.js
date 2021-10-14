import styled, { withTheme } from 'styled-components';

const FormLabelComponent = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #7a7a7a;
  font-family: ${props => props.theme.fontPrimary};
  font-size: 13px;
`;

export const FormLabel = withTheme(FormLabelComponent);
