import { getPosts } from './posts';
import { getFolders } from './folders';

export const handlers = [...getPosts, ...getFolders];
