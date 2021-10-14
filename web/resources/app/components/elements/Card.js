import styled, { withTheme } from 'styled-components';

const CardComponent = styled.div`
  width: ${props => (props.block ? '100%' : 'auto')};
  height: 100%;
  display: ${props => (props.block ? 'block' : 'inline-block')};
  border-radius: ${props => props.theme.borderRadiusDefault};
  margin-bottom: 5px;
  background-color: white;
  padding: 25px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  word-wrap: break-word;
`;

export const Card = withTheme(CardComponent);
