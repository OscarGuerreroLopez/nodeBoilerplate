/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type IObjectLiteral } from 'micro-library-ai';
import { logger } from '../logger';

export const SanitiseBody = (unsanitisedBody: IObjectLiteral): IObjectLiteral => {
	try {
		const maskEmail = (email: string): string => {
			const [username, domain] = email.split('@');
			const maskedUsername = username.slice(0, 2) + '*'.repeat(username.length - 2);
			const domainParts = domain.split('.');
			const maskedDomain =
				domainParts.length > 1
					? domainParts
							.slice(0, -1)
							.map(() => '*')
							.join('.') +
						'.' +
						domainParts[domainParts.length - 1]
					: domain;
			return `${maskedUsername}@${maskedDomain}`;
		};

		const sanitizeObject = (obj: IObjectLiteral): IObjectLiteral => {
			const sanitizedObj: IObjectLiteral = {};

			for (const [key, value] of Object.entries(obj)) {
				if (typeof value === 'object' && value !== null) {
					sanitizedObj[key] = sanitizeObject(value as IObjectLiteral);
				} else {
					if (key.toLowerCase() === 'password') {
						sanitizedObj[key] = '********'; // Mask value if key is "password"
					} else if (key.toLowerCase() === 'email') {
						sanitizedObj[key] = maskEmail(value as string); // Mask value if key is "email"
					} else if (key.toLowerCase() === 'lname') {
						sanitizedObj[key] = '********';
					} else {
						sanitizedObj[key] = value;
					}
				}
			}

			return sanitizedObj;
		};

		return sanitizeObject(unsanitisedBody);
	} catch (error) {
		logger.error(error instanceof Error ? error.message : JSON.stringify(error), {
			file: 'bodySanitation.ts',
			service: 'common library',
			code: ''
		});

		const sanitizedObj = { ...unsanitisedBody };
		delete sanitizedObj.body.email;
		delete sanitizedObj.body.password;
		delete sanitizedObj.body.lname;

		return sanitizedObj;
	}
};
