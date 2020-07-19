import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';

import MarketsController from '@app/controllers/market/MarketsController';
import MarketPictureController from '@app/controllers/market/MarketPictureController';
import MarketProductController from '@app/controllers/market/MarketProductController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const marketProductController = new MarketProductController();

const upload = multer(uploadConfig.multer);

const marketsRouter = Router();
const marketsController = new MarketsController();
const marketPictureController = new MarketPictureController();

marketsRouter.get('/:id', marketsController.show);

marketsRouter.get(
  '/:id/products',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  marketProductController.index, // list products by market id
);

marketsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      whatsapp: Joi.string().required(),
      uf: Joi.string().required(),
      city: Joi.string().required(),
      district: Joi.string().required(),
      password: Joi.string(),
    },
  }),
  marketsController.create,
);

marketsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      whatsapp: Joi.string().required(),
      uf: Joi.string().required(),
      city: Joi.string().required(),
      district: Joi.string().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  ensureAuthenticated,
  marketsController.update,
);

marketsRouter.patch(
  '/picture',
  ensureAuthenticated,
  upload.single('file'),
  marketPictureController.update,
);

export default marketsRouter;
