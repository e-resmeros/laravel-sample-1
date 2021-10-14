import styled, { withTheme } from 'styled-components';

const ContainerComponent = styled.div`
  height: 100%;
  border-radius: 8px;
  background-color: white;
`;

export const Container = withTheme(ContainerComponent);
