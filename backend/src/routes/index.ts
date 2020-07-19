import { Router } from 'express';
import marketsRouter from './markets.routes';
import productsRouter from './products.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/markets', marketsRouter);
routes.use('/products', productsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
