import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateMarketService from '@app/services/market/CreateMarketService';
import InfoMarketServices from '@app/services/market/InfoMarketServices';
import ListMarketsService from '@app/services/market/ListMarketsService';
import UpdateProfileService from '../../services/market/UpdateMarketService';

export default class MarketsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { city, district } = request.query;

    const listMarketsService = new ListMarketsService();
    const market = await listMarketsService.execute({
      city: String(city),
      district: String(district),
    });

    return response.json(classToClass(market));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const infoMarketServices = new InfoMarketServices();
    const market = await infoMarketServices.execute({ id });

    return response.json(classToClass(market));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, whatsapp, password, uf, city, district } = request.body;

    const createMarket = new CreateMarketService();
    const market = await createMarket.execute({
      name,
      password,
      whatsapp,
      uf,
      city,
      district,
    });

    return response.json(classToClass(market));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      whatsapp,
      uf,
      city,
      district,
      old_password,
      password,
    } = request.body;
    const market_id = request.market.id;

    const updateProfileService = new UpdateProfileService();
    const market = await updateProfileService.execute({
      market_id,
      name,
      whatsapp,
      uf,
      city,
      district,
      password,
      old_password,
    });

    return response.json(classToClass(market));
  }
}
