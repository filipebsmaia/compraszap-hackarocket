import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip/index';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #fff;
  color: #828282;

  transition: color 0.2s, border-color 0.2s;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }


  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #2d9cdb;
      border-color: #2d9cdb;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #2d9cdb;
    `}

  input {
    flex: 1;
    background: transparent !important;
    border: 0;
    color: #4F4F4F;

    &:-webkit-autofill {
      -webkit-text-fill-color: #4F4F4F;
      -webkit-box-shadow: 0 0 0px 1000px #fff inset;

    }

    &::placeholder {
      color: #828282;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin-right: 0;
  }

  span {
    background: #c53030;
    color: #efefef;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
