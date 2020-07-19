import { Router } from 'express';
import marketsRouter from './markets.routes';
import productsRouter from './products.routes';
import sessionsRouter from './sessions.routes';
import categoriesRouter from './categories.routes';

const routes = Router();

routes.use('/markets', marketsRouter);
routes.use('/products', productsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/categories', categoriesRouter);

export default routes;
