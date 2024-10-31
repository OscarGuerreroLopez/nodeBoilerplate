import { type Response, type Request, type NextFunction } from 'express';
import { AppError, type ErrorResponse, HttpCode, logger, type ValidationType } from '../../../../core';

const logError = (message: string, req: Request): void => {
	logger.error(message, {
		file: 'exception.middleware.ts',
		code: req.code ?? 'no code',
		service: 'RBAC'
	});
};

const handleErrorResponse = (
	res: Response<ErrorResponse>,
	name: string,
	message: string,
	statusCode: number,
	stack?: string,
	validationErrors?: ValidationType[]
): void => {
	res.status(statusCode).json({ name, message, validationErrors, stack });
};

export const ExceptionMiddleware = (
	error: Error,
	req: Request,
	res: Response<ErrorResponse>,
	next: NextFunction
): void => {
	if (error instanceof AppError) {
		const { message, name, stack, validationErrors } = error;
		const statusCode = error.statusCode ?? HttpCode.INTERNAL_SERVER_ERROR;
		logError(message, req);
		handleErrorResponse(res, name, message, statusCode, stack, validationErrors);
	} else if (error instanceof Error) {
		const message = error.message;
		logError(message, req);
		handleErrorResponse(res, 'GenericError', message, HttpCode.INTERNAL_SERVER_ERROR, error.stack);
	} else {
		const message = JSON.stringify(error);
		logError(message, req);
		handleErrorResponse(res, 'InternalServerError', message, HttpCode.INTERNAL_SERVER_ERROR);
	}
	next();
};

export default ExceptionMiddleware;
