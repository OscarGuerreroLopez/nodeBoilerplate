import { type Express } from 'express';
import rateLimit from 'express-rate-limit';
import { ONE_THOUSAND, SIXTY, FIVE } from '../../../../core';

export const expressRateLimiter = (app: Express): void => {
	// use better rate limiter middleware
	app.use(
		rateLimit({
			windowMs: FIVE * SIXTY * ONE_THOUSAND, // 5 minutes
			max: 25 // limit each IP to 25 requests per windowMs
		})
	);
};
