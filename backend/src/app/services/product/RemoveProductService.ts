import { getRepository } from 'typeorm';
import Product from '@app/entities/Product';
import AppError from '@app/errors/AppError';

interface IRequest {
  market_id: string;
  product_id: string;
}

type IResponse = Product;

class RemoveProductService {
  public async execute({ market_id, product_id }: IRequest): Promise<void> {
    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOne(product_id);
    if (!product) {
      throw new AppError('Product does not exists');
    }

    if (product.market_id !== market_id) {
      throw new AppError('You can remove only yours products');
    }

    await productsRepository.remove(product);
  }
}

export default RemoveProductService;
