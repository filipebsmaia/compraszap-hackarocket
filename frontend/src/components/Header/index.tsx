import React from 'react';

import { Container, HeaderContainer } from './styles';
import logoImg from '../../assets/logo-header.svg';

interface Props {
  leftContent?: object;
}
const Header: React.FC<Props> = ({ leftContent }) => {
  return (
    <Container>
      <HeaderContainer>
        <div>
          <img src={logoImg} alt="ComprasZap" />
          {leftContent}
        </div>
      </HeaderContainer>
    </Container>
  );
};

export default Header;
