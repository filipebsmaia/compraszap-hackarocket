import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import CategoriesListService from '@app/services/categories/CategoriesListService';

export default class CategoriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const categoriesListService = new CategoriesListService();
    const categories = await categoriesListService.execute();
    return response.json(classToClass(categories));
  }
}
