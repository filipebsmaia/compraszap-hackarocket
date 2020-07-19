import Market from '@app/entities/Market';
import { getRepository } from 'typeorm';
import AppError from '@app/errors/AppError';
import { hashProvider } from '@app/providers/index';

interface IRequest {
  name: string;
  password: string;
  whatsapp: string;
  uf: string;
  city: string;
  district: string;
}

type IResponse = Market;

class CreateMarketSerivce {
  public async execute({
    name,
    password,
    whatsapp,
    uf,
    city,
    district,
  }: IRequest): Promise<IResponse> {
    const marketsRepository = getRepository(Market);
    const marketExists = await marketsRepository.findOne({
      where: {
        whatsapp,
      },
    });

    if (marketExists) {
      throw new AppError('Whatsapp number already used');
    }

    const hashedPassowrd = await hashProvider.generateHash(password);

    const market = marketsRepository.create({
      name,
      password: hashedPassowrd,
      whatsapp,
      uf,
      city,
      district,
    });
    await marketsRepository.save(market);

    return market;
  }
}

export default CreateMarketSerivce;
