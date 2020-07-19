import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiLock, FiMap, FiMapPin, FiHome } from 'react-icons/fi';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer } from './styles';
import api from '../../services/api';

interface SingUpFormData {
  name: string;
  whatsapp: string;
  password: string;
  uf: string;
  city: string;
  district: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { singIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SingUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Whatsapp obrigatório'),
          whatsapp: Yup.string().required('Whatsapp obrigatóriao'),
          password: Yup.string().required('Senha obrigatória'),
          uf: Yup.string().required('Estado obrigatório'),
          city: Yup.string().required('Cidade obrigatória'),
          district: Yup.string().required('Bairro obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/markets', data);
        await singIn({
          whatsapp: data.whatsapp,
          password: data.password,
        });
        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });

        // disparar um toast
      }
    },
    [singIn, history, addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="ComprasZap" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro na plataforma.</h1>

            <Input
              name="name"
              icon={AiOutlineWhatsApp}
              placeholder="Nome do Mercado"
            />
            <Input
              name="whatsapp"
              icon={AiOutlineWhatsApp}
              placeholder="WhatsApp"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Input name="uf" icon={FiMap} placeholder="Estado" />
            <Input name="city" icon={FiHome} placeholder="Cidade" />
            <Input name="district" icon={FiMapPin} placeholder="Bairro" />
            <Button type="submit">Criar Conta</Button>
          </Form>
          <Link to="/">
            <FiLogIn />
            Voltar para o login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
export default SignUp;
