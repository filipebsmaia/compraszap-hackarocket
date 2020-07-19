import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #2d9cdb;
  padding-bottom: 60px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;

  > section {
    height: 144px;
    width: 100%;
    background: #2d9cdb;

    display: flex;
    align-items: center;
    justify-content: center;
    a {
      display: flex;
      align-items: center;
      color: #fff;
      text-decoration: none;
    }
    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #fff;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 30px;
  background-color: #efefef;
  border-radius: 10px;

  form {
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    width: 400px;
    text-align: center;

    h1 {
      font-size: 24px;
      margin: 16px auto;
      color: #4f4f4f;
      max-width: 300px;
    }
    p {
      font-size: 16px;
      color: #4f4f4f;
      margin: 16px auto 24px;
    }
  }

  @media (max-width: 500px) {
    width: 100%;
    height: 100vh;
    border-radius: 0;
    padding: 60px 30px;

    form {
      width: calc(100% - 30px);
    }
  }

  > a {
    color: #2d9cdb;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(0.2, '#2D9CDB')};
    }
    svg {
      margin-right: 16px;
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #2d9cdb;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #fff;
    }

    &:hover {
      background: ${shade(0.2, '#2d9cdb')};
    }
  }
`;
