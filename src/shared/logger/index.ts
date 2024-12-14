import * as winston from 'winston';

import { type LoggerData, NodeEnvEnum, Severity } from 'micro-library-ai';
import { SanitiseBody } from '../../shared';
import { envs } from '../../core';

const { combine, timestamp, prettyPrint } = winston.format;

const WinstonLogger = winston.createLogger({
	// level: "info",
	format: combine(timestamp(), prettyPrint()),

	// in a more professional app this will be logged to elasticsearch (kibana) or something alike
	// for this test we just log into a file

	transports: [
		new winston.transports.File({
			filename: './logs/debug.log',
			level: Severity.DEBUG
		}),
		new winston.transports.File({
			filename: './logs/info.log',
			level: Severity.INFO
		}),
		new winston.transports.File({
			filename: './logs/warn.log',
			level: Severity.WARN
		}),
		new winston.transports.File({
			filename: './logs/error.log',
			level: Severity.ERROR
		})
	]
});

WinstonLogger.on('error', (error) => {
	console.error('!!!!!!!!!!!!!!!!Logger Error caught', error);
});

if (envs.NODE_ENV === NodeEnvEnum.DEVELOPMENT || envs.NODE_ENV === NodeEnvEnum.TEST) {
	WinstonLogger.add(
		new winston.transports.Console({
			format: winston.format.simple()
		})
	);
}

export const logger = {
	debug: (message: string, data: LoggerData): void => {
		WinstonLogger.debug(message, SanitiseBody(data));
	},
	info: (message: string, data: LoggerData): void => {
		WinstonLogger.info(message, SanitiseBody(data));
	},
	warn: (message: string, data: LoggerData): void => {
		WinstonLogger.warn(message, SanitiseBody(data));
	},
	error: (message: string, data: LoggerData): void => {
		WinstonLogger.error(message, SanitiseBody(data));
	}
};
