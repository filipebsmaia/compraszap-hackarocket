import React, { useCallback, useRef, ChangeEvent } from 'react';
import {
  FiMail,
  FiUser,
  FiLock,
  FiCamera,
  FiArrowLeft,
  FiMap,
  FiHome,
  FiMapPin,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AvatarInput, AnimationContainer } from './styles';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  whatsapp: string;
  uf: string;
  city: string;
  district: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { market, updateMarket } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          whatsapp: Yup.string().required('Whatsapp obrigatorio'),
          uf: Yup.string().required('Estado obrigatório'),
          city: Yup.string().required('Cidade obrigatória'),
          district: Yup.string().required('Bairro obrigatório'),

          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string()
              .required('Campo obrigatório')
              .min(6, 'No minimo 6 digitos'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string()
                .required('Campo obrigatório')
                .min(6, 'No minimo 6 digitos'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), ''], 'Confirmação incorreta'),
        });

        console.log('11', data);
        await schema.validate(data, {
          abortEarly: false,
        });
        console.log('22');

        const {
          name,
          whatsapp,
          uf,
          city,
          district,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          whatsapp,
          uf,
          city,
          district,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/markets', formData);

        updateMarket(response.data);

        history.push('/');
        addToast({
          type: 'success',
          title: 'Perfil atualizado',
          description:
            'Suas informações do perfil foram atualizadas com sucesso!',
        });
      } catch (err) {
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao atualizar o perfil, tente novamente.',
        });
      }
    },
    [addToast, history, updateMarket],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();
        data.append('file', e.target.files[0]);

        api.patch('/markets/picture', data).then(response => {
          updateMarket(response.data);
          addToast({
            type: 'success',
            title: 'Avatar atualizado!',
          });
        });
      }
    },
    [addToast, updateMarket],
  );

  return (
    <Container>
      <Content>
        <section>
          <div>
            <Link to="/dashboard">
              <FiArrowLeft />
              <span>Voltar</span>
            </Link>
          </div>
        </section>
        <AnimationContainer>
          <Form
            initialData={{
              ...market,
            }}
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <AvatarInput>
              <img src={market.picture_url} alt={market.name} />

              <label htmlFor="avatar">
                <FiCamera />

                <input type="file" id="avatar" onChange={handleAvatarChange} />
              </label>
            </AvatarInput>
            <h1>Meu perfil</h1>

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
              containerStyle={{ marginTop: 24 }}
              name="uf"
              icon={FiMap}
              placeholder="Estado"
            />
            <Input name="city" icon={FiHome} placeholder="Cidade" />
            <Input name="district" icon={FiMapPin} placeholder="Bairro" />
            <Input
              containerStyle={{ marginTop: 24 }}
              name="old_password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmar senha"
            />
            <Button type="submit">Alterar Dados</Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
export default Profile;
