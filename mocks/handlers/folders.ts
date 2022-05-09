import { rest } from 'msw';

export const foldersHandlers = [
  rest.get('/folders', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        code: 200,
        msg: 'SUCCESS',
        data: {
          folders: [
            {
              folderId: 1,
              folderName: 'folder name',
              coverImg:
                'https://firebasestorage.googleapis.com/v0/b/cardna-29f5b.appspot.com/o/20220317_172729_412500527401_720x720.png?alt=media',
              postCount: 1,
            },
            {
              folderId: 2,
              folderName: 'folder name2',
              coverImg:
                'https://firebasestorage.googleapis.com/v0/b/cardna-29f5b.appspot.com/o/20220317_172729_412500527401_720x720.png?alt=media',
              postCount: 0,
            },
          ],
          postsThumbnail: [
            'https://firebasestorage.googleapis.com/v0/b/cardna-29f5b.appspot.com/o/20220317_172729_412500527401_720x720.png?alt=media',
            'https://firebasestorage.googleapis.com/v0/b/cardna-29f5b.appspot.com/o/20220330_073908_966740019233_720x720.jpg?alt=media',
            'https://firebasestorage.googleapis.com/v0/b/cardna-29f5b.appspot.com/o/20220330_073908_966740019233_720x720.jpg?alt=media',
            'https://firebasestorage.googleapis.com/v0/b/cardna-29f5b.appspot.com/o/20220330_073908_966740019233_720x720.jpg?alt=media',
          ],
        },
      }),
    );
  }),
  rest.get('/folders/posts/1?page=1&size=20', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        code: 200,
        msg: 'SUCCESS',
        data: {
          totalCount: 1,
          posts: [
            {
              postId: '1',
              firstCategory: 'UPSET',
              secondCategory: 'ANGRY',
              tags: ['tag1', 'tag2'],
              content: 'post content',
              createdDate: '2022-05-07 10:36:00',
            },
          ],
        },
      }),
    );
  }),
];
