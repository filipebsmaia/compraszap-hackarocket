import { getRepository } from 'typeorm';
import Product from '@app/entities/Product';
import Market from '@app/entities/Market';

interface IRequest {
  city?: string;
  district?: string;
  categories?: string[];
}

type IResponse = Product[];

class ProductListService {
  public async execute({
    city,
    district,
    categories,
  }: IRequest): Promise<IResponse> {
    const marketsRepository = getRepository(Market);
    const products: Product[] = [];

    const markets = await marketsRepository.find({
      relations: ['products'],
      where: {
        city,
        district,
      },
    });

    markets.forEach(foundMarket => {
      foundMarket.products.forEach(product => {
        if (categories?.includes(product.category.title)) {
          products.push(product);
        }
      });
    });

    return products;
  }
}

export default ProductListService;
