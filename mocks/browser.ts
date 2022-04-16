import { setupWorker, SetupWorkerApi } from 'msw';
import { handlers } from './handlers';

export const worker: SetupWorkerApi = setupWorker(...handlers);
