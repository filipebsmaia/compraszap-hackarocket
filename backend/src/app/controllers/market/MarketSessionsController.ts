import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import AuthenticateMarketService from '@app/services/market/AuthenticateMarketService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { whatsapp, password } = request.body;

    const authenticateMarketService = new AuthenticateMarketService();

    const { market, token } = await authenticateMarketService.execute({
      whatsapp,
      password,
    });

    return response.json({ market: classToClass(market), token });
  }
}
