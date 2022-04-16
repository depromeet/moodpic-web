import { setupServer, SetupServerApi } from 'msw/node';
import { handlers } from '@mocks/handlers';

export const server: SetupServerApi = setupServer(...handlers);
