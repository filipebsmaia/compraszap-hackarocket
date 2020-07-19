import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

import ProductProps from '../../dtos/Product';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateProduct: (
    product: Omit<ProductProps, 'id' | 'available' | 'category'>,
  ) => void;
  editingProduct: ProductProps;
}

interface EditProductData {
  name: string;
  quantity: number;
  price: number;
  picture_url: string;
}

const ModalEditProduct: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  editingProduct,
  handleUpdateProduct,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: EditProductData) => {
      await handleUpdateProduct(data);
      setIsOpen();
    },
    [handleUpdateProduct, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingProduct}>
        <h1>Editar Produto</h1>
        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />
        <Input name="quantity" placeholder="Quantidade, Ex: 250" />

        <button type="submit">
          <div>Editar Produto</div>
          <div>
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditProduct;
