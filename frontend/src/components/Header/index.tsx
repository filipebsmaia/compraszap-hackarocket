import React from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { Container, HeaderContainer } from './styles';
import logoImg from '../../assets/logo-header.svg';

interface Props {
  openModal: () => void;
}

const Header: React.FC<Props> = ({ openModal }) => {
  const { market } = useAuth();
  return (
    <Container>
      <HeaderContainer>
        <img src={logoImg} alt="ComprasZap" />
        <Link to="/profile">
          <img src={market.picture_url} alt={market.name} />
        </Link>
        <button type="submit" onClick={openModal}>
          <span>Adicionar Prato</span>
          <FiCheckSquare size={24} />
        </button>
      </HeaderContainer>
    </Container>
  );
};

export default Header;
