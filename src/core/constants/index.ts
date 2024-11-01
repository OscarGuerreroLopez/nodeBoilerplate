/* eslint-disable @typescript-eslint/no-magic-numbers */

export const SIXTY = 60 as const;
export const ONE_HUNDRED = 100 as const;
export const ONE_THOUSAND = 1000 as const;
export const FIVE = 5 as const;

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

export enum NodeEnvEnum {
	DEVELOPMENT = 'development',
	TEST = 'test',
	PROD = 'prod'
}

export enum Severity {
	DEBUG = 'debug',
	INFO = 'info',
	WARN = 'warn',
	ERROR = 'error'
}
