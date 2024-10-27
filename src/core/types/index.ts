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
	validationErrors?: ValidationType[];
	stack?: string;
}
