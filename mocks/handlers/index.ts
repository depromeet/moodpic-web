import { postsHandlers } from './posts';
import { foldersHandlers } from './folders';

export const handlers = [...postsHandlers, ...foldersHandlers];
