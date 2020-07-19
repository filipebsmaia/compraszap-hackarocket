import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionsController from '@app/controllers/market/MarketSessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      whatsapp: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);
export default sessionsRouter;
