import styled, { withTheme } from 'styled-components';

const CardTitleComponent = styled.span`
  color: ${prop => prop.theme.colorHeader};
  font-family: ${prop => prop.theme.fontPrimary};
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  display: block;
`;

export const CardTitle = withTheme(CardTitleComponent);
