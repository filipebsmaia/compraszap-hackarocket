import React, { useState, useEffect } from 'react';

import { useAuth } from '../../hooks/auth';
import Header from '../../components/Header';
import Product from '../../components/Product';

import api from '../../services/api';

import ProductProps from '../../dtos/Product';

import ModalAddProduct from '../../components/ModalAddFood';
import ModalEditProduct from '../../components/ModalEditFood/index';

import { Container, ProductContainer } from './styles';

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [editingProduct, setEditingProduct] = useState<ProductProps>(
    {} as ProductProps,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { market } = useAuth();

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      api
        .get<ProductProps[]>(`/markets/${market.id}/products`)
        .then(response => {
          setProducts(response.data);
        });
    }

    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleAddProduct(
    product: Omit<ProductProps, 'id' | 'available'>,
  ): Promise<void> {
    try {
      api.post('/products', product).then(response => {
        setProducts([...products, response.data]);
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateProduct(
    product: Omit<ProductProps, 'id' | 'available' | 'category'>,
  ): Promise<void> {
    const response = await api.put<ProductProps>(
      `/products/${editingProduct.id}`,
      product,
    );

    const updatedProducts = products.filter(
      filterFood => filterFood.id !== editingProduct.id,
    );
    setProducts([...updatedProducts, response.data]);
  }

  async function handleDeleteProduct(id: string): Promise<void> {
    await api.delete(`/products/${id}`);

    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditProduct(product: ProductProps): void {
    setEditingProduct(product);
    toggleEditModal();
  }
  return (
    <Container>
      <Header openModal={toggleModal} />
      <ModalAddProduct
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddProduct={handleAddProduct}
      />
      <ModalEditProduct
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingProduct={editingProduct}
        handleUpdateProduct={handleUpdateProduct}
      />
      <ProductContainer>
        {products &&
          products.map(product => (
            <Product
              product={product}
              handleDeleteProduct={handleDeleteProduct}
              handleEditProduct={handleEditProduct}
            />
          ))}
      </ProductContainer>
    </Container>
  );
};

export default Dashboard;
