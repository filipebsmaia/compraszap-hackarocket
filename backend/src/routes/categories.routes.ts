import { Router } from 'express';

import CategoriesController from '@app/controllers/categories/CategoriesController';

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.get('/', categoriesController.index);

export default categoriesRouter;
