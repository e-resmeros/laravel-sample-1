import styled, { withTheme } from 'styled-components';

const CardDescriptionComponent = styled.p`
  color: ${prop => prop.theme.colorDescription};
  font-family: ${prop => prop.theme.fontPrimary};
  font-weight: 300;
  font-size: 13px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const CardDescription = withTheme(CardDescriptionComponent);
