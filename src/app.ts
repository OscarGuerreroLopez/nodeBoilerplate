import { envs } from './core/config/env';
import { AppRoutes } from './routes';
import { Server } from './server';

(() => {
	main();
})();

function main(): void {
	const server = new Server({
		port: envs.PORT,
		apiPrefix: envs.API_PREFIX,
		platform: envs.PLATFORM,
		routes: AppRoutes.routes
	});
	void server.start();
}
