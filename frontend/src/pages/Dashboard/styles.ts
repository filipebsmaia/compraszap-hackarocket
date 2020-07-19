import styled from 'styled-components';

export const Container = styled.div`
  margin: auto;
`;

export const ProductContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  margin-top: -60px;

  display: grid;

  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
`;
