import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

// import singInBackgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2d9cdb;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px)

  }
  to {
    opacity: 1;
    transform: translateY(0)
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 30px;
  background-color: #efefef;
  border-radius: 10px;

  animation: ${appearFromUp} 1.5s;

  img {
    width: 150px;
  }

  form {
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

export const Background = styled.div`
  flex: 1;
  background-size: cover;
`;
