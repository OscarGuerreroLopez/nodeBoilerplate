import { type Response, type NextFunction, type Request } from 'express';
import { type IObjectLiteral } from 'micro-library-ai';
import { AppError } from '../../core';
import { logger } from '../logger';

export class LoggerMiddleware {
	makeUUID: () => string;

	constructor(uuidMaker: () => string) {
		this.makeUUID = uuidMaker;
	}

	public writeRequest = (req: Request, res: Response, next: NextFunction): void => {
		try {
			req.code = this.makeUUID();
			const startTime = new Date().getTime();

			const originalSend = res.send.bind(res);

			let responseBody: IObjectLiteral;

			res.send = (body: string | IObjectLiteral): Response => {
				if (typeof body === 'string') {
					responseBody = JSON.parse(body);
				} else {
					responseBody = body;
				}

				return originalSend(body); // Call the original `send` method
			};

			if (req.path && !req.path.includes('meta')) {
				logger.info('init request', {
					service: 'boilerplate',
					file: 'logger.ts',
					property: 'LoggerMiddleware',
					code: req.code ?? 'noCode',
					body: req.body,
					headers: req.headers,
					method: `Method: ${req.method}, path: ${req.path}, host:${req.hostname}`
				});

				const logRequestTime = (): void => {
					const endTime = new Date().getTime();
					const elapsedTime = endTime - startTime;

					logger.info(`Request time: ${elapsedTime}ms`, {
						service: 'boilerplate',
						file: 'logger.ts',
						property: 'LoggerMiddleware',
						code: req.code ?? 'noCode',
						body: responseBody,
						headers: req.headers,
						method: `Method: ${req.method}, path: ${req.path}, host:${req.hostname}`
					});
				};

				res.on('finish', logRequestTime);
			}

			next();
		} catch (error) {
			next(AppError.internalServer(`${error instanceof Error ? error.message : JSON.stringify(error)}`));
		}
	};
}
