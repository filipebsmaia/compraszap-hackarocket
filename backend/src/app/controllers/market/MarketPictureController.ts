import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import UpdateMarketPictureService from '@app/services/market/UpdateMarketPictureService';

export default class MarketPictureController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateMarketPicture = new UpdateMarketPictureService();

    const market = await updateMarketPicture.execute({
      market_id: request.market.id,
      file: request.file.filename,
    });

    return response.json(classToClass(market));
  }
}
