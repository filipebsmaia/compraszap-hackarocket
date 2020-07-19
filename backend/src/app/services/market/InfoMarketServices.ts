import Market from '@app/entities/Market';
import { getRepository } from 'typeorm';
import AppError from '@app/errors/AppError';

interface IRequest {
  id: string;
}

type IResponse = Market;

class MarketInfoSerivce {
  public async execute({ id }: IRequest): Promise<IResponse> {
    const marketsRepository = getRepository(Market);
    const market = await marketsRepository.findOne(id);

    if (!market) {
      throw new AppError('Market does not exists');
    }

    return market;
  }
}

export default MarketInfoSerivce;
