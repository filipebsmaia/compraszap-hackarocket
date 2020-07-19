import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import MarketListProducts from '@app/services/market/MarketListProducts';
import CreateProductService from '@app/services/product/CreateProductService';
import UpdateProductService from '../../services/product/UpdateProductService';
import RemoveProductService from '../../services/product/RemoveProductService';

export default class MarketProductController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const marketListProducts = new MarketListProducts();
    const product = await marketListProducts.execute({ id });

    return response.json(classToClass(product));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const market_id = request.market.id;
    const { name, quantity, price, category } = request.body;

    const createProductService = new CreateProductService();
    const product = await createProductService.execute({
      market_id,
      name,
      quantity,
      price,
      category,
    });

    return response.json(classToClass(product));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const market_id = request.market.id;
    const { id } = request.params;
    const { name, quantity, price } = request.body;

    const updateProductService = new UpdateProductService();
    const product = await updateProductService.execute({
      market_id,
      product_id: id,
      name,
      quantity,
      price,
    });

    return response.json(classToClass(product));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const market_id = request.market.id;
    const { id } = request.params;

    const removeProductService = new RemoveProductService();
    await removeProductService.execute({ market_id, product_id: id });

    return response.status(204).send();
  }
}
