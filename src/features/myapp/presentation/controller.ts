import { type NextFunction, type Request, type Response } from 'express';
import { type SuccessResponse } from '../../../core';
import { type MetaResponseEntity } from '../../shared';

export class MyAppController {
	public getMeta = (req: Request, res: Response<SuccessResponse<MetaResponseEntity>>, next: NextFunction): void => {
		throw new Error('Shit');

		res.json({
			data: {
				message: 'OK',
				code: req.code ?? 'noCode'
			}
		});
	};
}
