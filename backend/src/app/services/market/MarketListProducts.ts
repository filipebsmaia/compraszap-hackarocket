import Market from '@app/entities/Market';
import { getRepository } from 'typeorm';
import AppError from '@app/errors/AppError';
import Product from '@app/entities/Product';

interface IRequest {
  id: string;
}

type IResponse = Product[];

class MarketListProducts {
  public async execute({ id }: IRequest): Promise<IResponse> {
    const marketsRepository = getRepository(Market);
    const market = await marketsRepository.findOne({
      relations: ['products'],
      where: {
        id,
      },
    });

    if (!market) {
      throw new AppError('Market does not exists');
    }

    return market.products;
  }
}

export default MarketListProducts;
