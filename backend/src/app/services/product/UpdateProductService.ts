import { getRepository } from 'typeorm';
import Product from '@app/entities/Product';
import AppError from '@app/errors/AppError';
import Category from '@app/entities/Category';

interface IRequest {
  market_id: string;
  product_id: string;
  name: string;
  category_id: string;
  quantity: number;
  price: number;
}

type IResponse = Product;

class UpdateProductService {
  public async execute({
    market_id,
    product_id,
    name,
    category_id,
    quantity,
    price,
  }: IRequest): Promise<IResponse> {
    const productsRepository = getRepository(Product);
    const categoriesRepository = getRepository(Category);

    const product = await productsRepository.findOne(product_id);
    if (!product) {
      throw new AppError('Product does not exists');
    }

    const categoryExists = await categoriesRepository.findOne(category_id);

    if (!categoryExists) {
      throw new AppError('Category does not exists');
    }

    if (product.market_id !== market_id) {
      throw new AppError('You can edit only yours products');
    }

    product.name = name;
    product.category_id = category_id;
    product.quantity = quantity;
    product.price = price;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
