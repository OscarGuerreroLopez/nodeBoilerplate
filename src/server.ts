import express, { type Request, type Response } from 'express';
import rateLimit from 'express-rate-limit';

import { HttpCode, ONE_HUNDRED, ONE_THOUSAND, SIXTY } from './core/constants';

interface ServerOptions {
	port: number;
	apiPrefix: string;
	platform: string;
}

export class Server {
	private readonly app = express();
	private readonly port: number;
	private readonly platform: string;

	constructor(options: ServerOptions) {
		const { port, platform } = options;
		this.port = port;
		this.platform = platform;
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

		// Test rest api
		this.app.get('/', (_req: Request, res: Response) => {
			return res.status(HttpCode.OK).send({
				message: `Welcome to Initial API! \n ${this.platform} Endpoints available at http://localhost:${this.port}/`
			});
		});

		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}...`);
		});
	}
}
