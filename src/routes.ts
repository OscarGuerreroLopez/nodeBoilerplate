import { Router } from 'express';
import { MyAppRoutes } from './myapp';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use('/', MyAppRoutes.routes);

		// rest of routes
		// ...

		return router;
	}
}
