import { platform } from 'os';
import { envs } from './core/config/env';
import { Server } from './server';

(() => {
	main();
})();

function main(): void {
	const server = new Server({
		port: envs.PORT,
		apiPrefix: envs.API_PREFIX,
		platform: envs.PLATFORM
	});
	void server.start();
}
