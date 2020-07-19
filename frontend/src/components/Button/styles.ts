import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #2d9cdb;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #efefef;
  width: 100%;
  font-weight: 500;
  margin-top: 24px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#2D9CDB')};
  }
`;
