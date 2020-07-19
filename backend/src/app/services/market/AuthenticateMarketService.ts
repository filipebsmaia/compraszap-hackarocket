import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@app/errors/AppError';
import { getRepository } from 'typeorm';
import Market from '@app/entities/Market';
import { hashProvider } from '@app/providers';

interface IRequest {
  whatsapp: string;
  password: string;
}

interface IResponse {
  market: Market;
  token: string;
}

class AuthenticateUserSerivce {
  public async execute({ whatsapp, password }: IRequest): Promise<IResponse> {
    const marketsRepository = getRepository(Market);
    const market = await marketsRepository.findOne({
      where: {
        whatsapp,
      },
    });

    if (!market) {
      throw new AppError('Incorrect whatsapp/password combination.', 401);
    }

    const passwordMathced = await hashProvider.compareHash(
      password,
      market.password,
    );

    if (!passwordMathced) {
      throw new AppError('Incorrect whatsapp/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: market.id,
      expiresIn,
    });

    return {
      market,
      token,
    };
  }
}

export default AuthenticateUserSerivce;
