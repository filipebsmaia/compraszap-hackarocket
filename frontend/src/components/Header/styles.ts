import styled from 'styled-components';

export const Container = styled.div`
  background-color: #2d9cdb;
`;

export const HeaderContainer = styled.div`
  height: 300px;
  background-color: #2d9cdb;
  margin: auto;
  max-width: 1600px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > img {
    height: 120px;
    margin-top: 60px;
    margin-left: 40px;
  }

  a {
    text-decoration: none;
    img {
      height: 120px;
      width: 120px;
      border-radius: 50%;
    }
  }

  button {
    height: 60px;
    margin-top: 60px;
    margin-right: 40px;

    padding: 20px;

    font-weight: 500;
    border-radius: 8px;
    border: 0;

    background: #39b100;
    color: #fff;

    display: flex;
    flex-direction: row;
    align-items: center;

    span {
      padding-right: 16px;
    }
  }
`;
