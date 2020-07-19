import React, { useState } from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container, Content, ContentInfo, ContentFooter } from './styles';
import ProductProps from '../../dtos/Product';

interface Props {
  product: ProductProps;
  handleDeleteProduct: (id: string) => {};
  handleEditProduct: (product: ProductProps) => void;
}

const Product: React.FC<Props> = ({
  product,
  handleDeleteProduct,
  handleEditProduct,
}: Props) => {
  function setEditingFood(): void {
    handleEditProduct(product);
  }

  return (
    <Container>
      <Content>
        <header>
          <img src={product.picture_url} alt={product.name} />
        </header>
        <ContentInfo>
          <h2>{product.name}</h2>
          <span>
            R$ <b>{product.price}</b>
          </span>
        </ContentInfo>
        <ContentFooter>
          <div>
            <button
              type="button"
              className="icon"
              onClick={() => setEditingFood()}
            >
              <FiEdit3 size={20} />
            </button>

            <button
              type="button"
              className="icon"
              onClick={() => handleDeleteProduct(product.id)}
            >
              <FiTrash size={20} />
            </button>
          </div>
          <p>{product.quantity} dísponiveis!</p>
        </ContentFooter>
      </Content>
    </Container>
  );
};

export default Product;
