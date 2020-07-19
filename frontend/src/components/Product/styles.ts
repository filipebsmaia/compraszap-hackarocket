import styled, { css } from 'styled-components';

export const Container = styled.div``;

export const Content = styled.div`
  max-width: 350px;
  background: #f0f0f5;
  border-radius: 10px;

  header {
    background: #2d9cdb;
    border-radius: 10px 10px 10px 10px;
    height: 192px;
    overflow: hidden;
    transition: 0.3s opacity;
    text-align: center;

    img {
      pointer-events: none;
      user-select: none;
      max-width: 350px;
    }
  }
`;

export const ContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 30px;

  h2 {
    color: #3d3d4d;
  }

  p {
    color: #3d3d4d;

    margin-top: 16px;
  }

  span {
    font-style: normal;
    font-size: 24px;
    line-height: 34px;
    color: #39b100;

    b {
      font-weight: 600;
    }
  }
`;
export const ContentFooter = styled.div`
  flex: 1;
  padding: 20px 30px 20px;
  background: #e4e4eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;

  p {
    color: #3d3d4d;
  }

  div {
    display: flex;

    button {
      background: #fff;
      padding: 10px;
      border-radius: 8px;
      display: flex;
      border: none;
      transition: 0.1s;

      svg {
        color: #3d3d4d;
      }

      & + button {
        margin-left: 6px;
      }
    }
  }
`;
