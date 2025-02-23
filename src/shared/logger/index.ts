import { type NodeEnv, NodeEnvEnum, makeMicroLogger, makeMicroLoggerV2, sanitiser } from 'micro-library-ai';
import { envs } from '../../core';

export const logger =
	envs.NODE_ENV === NodeEnvEnum.DEVELOPMENT
		? makeMicroLogger(envs.NODE_ENV as NodeEnv, sanitiser)
		: makeMicroLoggerV2(envs.NODE_ENV as NodeEnv, sanitiser);
