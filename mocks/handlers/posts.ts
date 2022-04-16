import { rest } from 'msw';

export const getPosts = [
  rest.get('/posts', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, title: '제목1' },
        { id: 2, title: '제목2' },
      ]),
    );
  }),
];
