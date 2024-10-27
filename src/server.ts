import express, { type Request, type Response, type Router, type NextFunction } from 'express';
import { AppError } from './core';
import { ExceptionMiddleware, expressEssentials, expressRateLimiter, LoggerMiddleware } from './features/shared';
import { makeUUID } from './core/common';

interface ServerOptions {
	port: number;
	apiPrefix: string;
	platform: string;
	routes: Router;
}

const loggerMiddleware = new LoggerMiddleware(makeUUID);

export class Server {
	private readonly app = express();
	private readonly port: number;
	private readonly platform: string;
	private readonly routes: Router;
	private readonly apiPrefix: string;

	constructor(options: ServerOptions) {
		const { port, platform, routes, apiPrefix } = options;
		this.port = port;
		this.platform = platform;
		this.routes = routes;
		this.apiPrefix = apiPrefix;
	}

	async start(): Promise<void> {
		//* Middlewares
		expressEssentials(this.app);
		expressRateLimiter(this.app);

		this.app.use(loggerMiddleware.writeRequest);

		this.app.use(this.apiPrefix, this.routes);

		//* Handle not found routes in /api/v1/* (only if 'Public content folder' is not available)
		this.routes.all('*', (req: Request, _: Response, next: NextFunction): void => {
			next(AppError.notFound(`Cant find ${req.originalUrl} on this app!`));
		});

		// Handle errors middleware
		this.routes.use(ExceptionMiddleware);

		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}...`);
		});
	}
}
