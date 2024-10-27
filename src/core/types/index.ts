/* eslint-disable @typescript-eslint/no-magic-numbers */

export interface SuccessResponse<T> {
	data?: T;
}

export interface ValidationType {
	fields: string[];
	constraint: string;
}

export enum HttpCode {
	OK = 200,
	CREATED = 201,
	NO_CONTENT = 204,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	INTERNAL_SERVER_ERROR = 500
}

export interface ErrorResponse {
	name: string;
	message: string;
	validationErrors?: ValidationType[];
	stack?: string;
}
