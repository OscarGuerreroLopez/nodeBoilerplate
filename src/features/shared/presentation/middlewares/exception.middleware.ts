import { type Response, type Request, type NextFunction } from 'express';
import { AppError, type ErrorResponse, HttpCode } from '../../../../core';

export const ExceptionMiddleware = (
	error: Error,
	_: Request,
	res: Response<ErrorResponse>,
	next: NextFunction
): void => {
	if (error instanceof AppError) {
		const { message, name, stack, validationErrors } = error;
		const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
		res.statusCode = statusCode;
		res.json({ name, message, validationErrors, stack });
	} else {
		const name = 'InternalServerError';
		const message = 'An internal server error occurred';
		const statusCode = HttpCode.INTERNAL_SERVER_ERROR;
		res.statusCode = statusCode;
		res.json({ name, message });
	}
	next();
};
export default ExceptionMiddleware;
