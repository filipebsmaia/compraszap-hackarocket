import Market from '@app/entities/Market';
import AppError from '@app/errors/AppError';
import { getRepository } from 'typeorm';
import { hashProvider } from '../../providers/index';

interface IRequest {
  market_id: string;
  name: string;
  whatsapp: string;
  uf: string;
  city: string;
  district: string;
  old_password: string;
  password: string;
}

class UpdateProfileService {
  public async execute({
    market_id,
    name,
    whatsapp,
    uf,
    city,
    district,
    old_password,
    password,
  }: IRequest): Promise<Market> {
    const marketsRepository = getRepository(Market);
    const market = await marketsRepository.findOne({
      where: {
        whatsapp,
      },
    });

    if (!market) {
      throw new AppError('Market not found');
    }

    const marketWithUpdatedWhatsapp = await marketsRepository.findOne({
      where: {
        whatsapp,
      },
    });

    if (
      marketWithUpdatedWhatsapp &&
      marketWithUpdatedWhatsapp.id !== market_id
    ) {
      throw new AppError('Whatsapp already in use.');
    }

    market.name = name;
    market.whatsapp = whatsapp;
    market.uf = uf;
    market.city = city;
    market.district = district;

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await hashProvider.compareHash(
        old_password,
        market.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }
    }

    if (password) {
      market.password = await hashProvider.generateHash(password);
    }
    return marketsRepository.save(market);
  }
}

export default UpdateProfileService;
