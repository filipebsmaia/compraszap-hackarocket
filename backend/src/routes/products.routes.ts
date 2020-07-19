import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ProductCategoriesController from '@app/controllers/product/ProductCategoriesController';
import MarketProductController from '@app/controllers/market/MarketProductController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const productsRouter = Router();
const productCategoriesController = new ProductCategoriesController();
const marketProductController = new MarketProductController();

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      quantity: Joi.number().required(),
      price: Joi.number().required(),
      category_id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticated,
  marketProductController.create, // market create product
);

productsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      quantity: Joi.number().required(),
      price: Joi.number().required(),
      category_id: Joi.string().uuid().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticated,
  marketProductController.update, // market edit product
);

productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticated,
  marketProductController.delete, // market edit product
);

productsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      city: Joi.string().required(),
      district: Joi.string().required(),
      categories: Joi.string().required(),
    },
  }),
  productCategoriesController.index, // list producs by city, district & categories
);

export default productsRouter;
