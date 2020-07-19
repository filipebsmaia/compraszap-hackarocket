import { getRepository } from 'typeorm';
import Category from '@app/entities/Category';

type IResponse = Category[];

class ProductListService {
  public async execute(): Promise<IResponse> {
    const categoriesRepository = getRepository(Category);
    const categories = await categoriesRepository.find();

    return categories;
  }
}

export default ProductListService;
