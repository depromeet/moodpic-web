import { rest } from 'msw';

export const getPosts = [
  rest.get('/posts/all', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        code: 200,
        msg: 'SUCCESS',
        data: [
          {
            id: '1',
            firstCategory: 'UPSET',
            secondCategory: 'ANGRY',
            content: 'content1',
            tags: ['tag1', 'tag2'],
            disclosure: true,
            views: 0,
            createdAt: '2022-05-07 10:35:57',
          },
          {
            id: '2',
            firstCategory: 'UPSET',
            secondCategory: 'ANGRY',
            content: 'content2',
            tags: ['tag1', 'tag2'],
            disclosure: true,
            views: 0,
            createdAt: '2022-05-07 10:35:57',
          },
          {
            id: '3',
            firstCategory: 'UPSET',
            secondCategory: 'Unwritten',
            content: 'content3',
            tags: ['tag1', 'tag2'],
            disclosure: true,
            views: 0,
            createdAt: '2022-05-07 10:35:57',
          },
        ],
      }),
    );
  }),
];
