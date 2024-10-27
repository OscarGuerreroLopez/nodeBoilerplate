import express, { type Request, type Response, type Router, type NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

import { ONE_HUNDRED, ONE_THOUSAND, SIXTY } from './core/constants';
import { AppError } from './core';

interface ServerOptions {
	port: number;
	apiPrefix: string;
	platform: string;
	routes: Router;
}

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
		this.app.use(express.json()); // parse json in request body (allow raw)
		this.app.use(express.urlencoded({ extended: true })); // allow x-www-form-urlencoded
		//  limit repeated requests to public APIs
		this.app.use(
			rateLimit({
				max: ONE_HUNDRED,
				windowMs: SIXTY * SIXTY * ONE_THOUSAND,
				message: 'Too many requests from this IP, please try again in one hour'
			})
		);

		this.app.use(this.apiPrefix, this.routes);

		//* Handle not found routes in /api/v1/* (only if 'Public content folder' is not available)
		this.routes.all('*', (req: Request, _: Response, next: NextFunction): void => {
			next(AppError.notFound(`Cant find ${req.originalUrl} on this server!`));
		});

		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}...`);
		});
	}
}
