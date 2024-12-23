import { type Response, type Request, type NextFunction } from 'express';
import { AppError, envs } from '../../core';
import { logger } from '../logger';
import { type ErrorResponse } from 'micro-library-ai';

export const credentialsMiddleware = (req: Request, _res: Response<ErrorResponse>, next: NextFunction): void => {
	const apiKey = req.headers['x-api-key'] as string;

	if (apiKey !== envs.API_KEY) {
		logger.warn(`Invalid apiKey ${apiKey}`, {
			service: 'RBAC',
			file: 'credentials.middleware.ts',
			code: req.code ?? 'no Code'
		});
		next(AppError.forbidden('Not Authorized'));
	}

	next();
};
