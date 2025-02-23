import { type NextFunction, type Request, type Response } from 'express';
import { type SuccessResponse, type MetaResponseDto } from 'micro-library-ai';
import { envs } from '../../core';

export class MyAppController {
	public getMeta = (req: Request, res: Response<SuccessResponse<MetaResponseDto>>, next: NextFunction): void => {
		res.json({
			data: {
				message: 'OK',
				code: req.code ?? 'noCode',
				platform: envs.PLATFORM,
				environment: envs.NODE_ENV
			}
		});
	};
}
