import { getRepository } from 'typeorm';
import Product from '@app/entities/Product';
import randomColor from 'randomcolor';
import Category from '@app/entities/Category';

interface IRequest {
  market_id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
}

type IResponse = Product;

class CreateProductService {
  public async execute({
    market_id,
    name,
    category: categoryName,
    quantity,
    price,
  }: IRequest): Promise<IResponse> {
    const productsRepository = getRepository(Product);
    const categoriesRepository = getRepository(Category);

    let category = await categoriesRepository.findOne({
      where: {
        title: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
      },
    });

    if (!category) {
      category = categoriesRepository.create({
        color: randomColor(),
        title: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
      });
      await categoriesRepository.save(category);
    }

    const product = productsRepository.create({
      name,
      quantity,
      category_id: category.id,
      price,
      market_id,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
