/* eslint-disable @typescript-eslint/no-unused-vars */
import { type Request } from 'express';

interface RequestUser {
	fname: string;
	lname: string;
	email: string;
	role: RoleTypeEnum;
	password?: string;
	failedAttempts?: number;
	id: string;
}

declare module 'express' {
	export interface Request {
		code?: string; // Optional property
		user?: RequestUser; // Optional property
		clientIp?: string; // Optional property
	}
}
