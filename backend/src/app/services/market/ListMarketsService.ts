import Market from '@app/entities/Market';
import { getRepository } from 'typeorm';

interface IRequest {
  city: string;
  district: string;
}

type IResponse = Market;

class ListMarketService {
  public async execute({ city, district }: IRequest): Promise<IResponse[]> {
    const marketsRepository = getRepository(Market);
    const markets = await marketsRepository.find({
      where: {
        city,
        district,
      },
    });

    return markets;
  }
}

export default ListMarketService;
