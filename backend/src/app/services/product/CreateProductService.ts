import { getRepository } from 'typeorm';
import Product from '@app/entities/Product';
import AppError from '@app/errors/AppError';
import Category from '../../entities/Category';

interface IRequest {
  market_id: string;
  name: string;
  category_id: string;
  quantity: number;
  price: number;
}

type IResponse = Product;

class CreateProductService {
  public async execute({
    market_id,
    name,
    category_id,
    quantity,
    price,
  }: IRequest): Promise<IResponse> {
    const productsRepository = getRepository(Product);
    const categoriesRepository = getRepository(Category);

    const categoryExists = await categoriesRepository.findOne(category_id);

    if (!categoryExists) {
      throw new AppError('Category does not exists');
    }

    const product = productsRepository.create({
      name,
      quantity,
      category_id,
      price,
      market_id,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
