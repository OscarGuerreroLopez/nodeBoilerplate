/* eslint-disable @typescript-eslint/no-magic-numbers */

export interface SuccessResponse<T> {
	data?: T;
}

export interface ValidationType {
	fields: string[];
	constraint: string;
}

export interface ErrorResponse {
	name: string;
	message: string;
	code: string;
	validationErrors?: ValidationType[];
	stack?: string;
}

export type IObjectLiteral = Record<string, any>;

export interface LoggerData {
	service: string;
	file: string;
	method?: string;
	code: string;
	[key: string]: unknown;
}
