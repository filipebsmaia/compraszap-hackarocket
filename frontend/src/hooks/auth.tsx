import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface Market {
  id: string;
  name: string;
  whatsapp: string;
  picture_url: string;
}

interface AuthState {
  token: string;
  market: Market;
}

interface SingInCredentials {
  whatsapp: string;
  password: string;
}

interface AuthContextData {
  market: Market;
  singIn(credentials: SingInCredentials): Promise<void>;
  singOut(): void;
  updateMarket(market: Market): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@ComprasZap:token');
    const market = localStorage.getItem('@ComprasZap:market');

    if (token && market) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, market: JSON.parse(market) };
    }

    return {} as AuthState;
  });

  const singIn = useCallback(async ({ whatsapp, password }) => {
    const response = await api.post<AuthState>('sessions', {
      whatsapp,
      password,
    });

    const { token, market } = response.data;

    localStorage.setItem('@ComprasZap:token', token);
    localStorage.setItem('@ComprasZap:market', JSON.stringify(market));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({
      token,
      market,
    });
  }, []);

  const singOut = useCallback(() => {
    localStorage.removeItem('@ComprasZap:token');
    localStorage.removeItem('@ComprasZap:market');

    setData({} as AuthState);
  }, []);

  const updateMarket = useCallback(
    (market: Market) => {
      localStorage.setItem('@ComprasZap:market', JSON.stringify(market));

      setData({
        token: data.token,
        market,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ market: data.market, singIn, singOut, updateMarket }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
