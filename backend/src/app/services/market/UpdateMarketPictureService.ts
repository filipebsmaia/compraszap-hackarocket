import Market from '@app/entities/Market';
import { getRepository } from 'typeorm';
import AppError from '@app/errors/AppError';
import { storageProvider } from '@app/providers';

interface IRequest {
  market_id: string;
  file: string;
}

type IResponse = Market;

class CreateUserSerivce {
  public async execute({ market_id, file }: IRequest): Promise<IResponse> {
    const marketsRepository = getRepository(Market);

    const market = await marketsRepository.findOne(market_id);

    if (!market) {
      throw new AppError('Only authenticated markets can change avatar', 401);
    }

    if (market.picture) {
      await storageProvider.deleteFile(market.picture);
    }

    const filename = await storageProvider.saveFile(file);

    market.picture = filename;

    await marketsRepository.save(market);

    return market;
  }
}

export default CreateUserSerivce;
