import { Request, Response } from 'express';
import ProductListService from '@app/services/product/ProductListService';
import { classToClass } from 'class-transformer';

export default class ProductCategoriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { city, district, categories } = request.query;
    const parsedCategories = String(categories)
      .split(',')
      .map(category => category.trim());

    const productListService = new ProductListService();

    const products = await productListService.execute({
      city: String(city),
      district: String(district),
      categories: categories === '' ? undefined : parsedCategories,
    });

    return response.json(classToClass(products));
  }
}
