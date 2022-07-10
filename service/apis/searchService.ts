import fetcher from '@/shared/utils/fetcher';

const searchService = {
  getSearchedPostsByPopularity: async (searchedTag: string) => {
    const { data } = await fetcher('get', '/api/v1/search/tag', {
      params: {
        keyword: searchedTag,
      },
    });

    return data.posts;
  },

  getSearchedPostsByNewest: async (searchedTag: string) => {
    const { data } = await fetcher('get', '/api/v1/search/tag', {
      params: {
        keyword: searchedTag,
        order: 'new',
      },
    });

    return data.posts;
  },

  getPopularTags: async () => {
    const { data } = await fetcher('get', '/api/v1/search/ranking/tag');

    const POPULAR_TAG_MAX_LENGTH = 10;

    return data.slice(0, POPULAR_TAG_MAX_LENGTH);
  },
};

export default searchService;

// TODO: 추후에 삭제하기
const mockPosts1 = [
  {
    id: 'id1',
    firstCategory: 'first category',
    secondCategory: 'second category',
    content:
      'content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1',
    tags: ['tag1', 'tag2'],
    views: 0,
    createdAt: '2022-05-17 15:41:59',
    my: true,
  },
  {
    id: 'id2',
    firstCategory: 'first category',
    secondCategory: 'second category',
    content: 'content2',
    tags: ['tag2', 'tag3'],
    views: 0,
    createdAt: '2022-05-17 15:41:59',
    my: false,
  },
];

const mockPosts2 = [
  {
    id: 'id1',
    firstCategory: 'first category',
    secondCategory: 'second category',
    content: 'content1',
    tags: ['tag1', 'tag2'],
    views: 0,
    createdAt: '2022-05-17 15:41:59',
    my: true,
  },
];

const mockTagFrequencies = [
  {
    tag: 'tag12',
    frequency: 12,
  },
  {
    tag: 'tag11',
    frequency: 11,
  },
  {
    tag: 'tag10',
    frequency: 10,
  },
  {
    tag: 'tag9',
    frequency: 9,
  },
  {
    tag: 'tag8',
    frequency: 8,
  },
  {
    tag: 'tag7',
    frequency: 7,
  },
  {
    tag: 'tag6',
    frequency: 6,
  },
  {
    tag: 'tag5',
    frequency: 5,
  },
  {
    tag: 'tag4',
    frequency: 4,
  },
  {
    tag: 'tag3',
    frequency: 3,
  },
  {
    tag: 'tag2',
    frequency: 2,
  },
  {
    tag: 'tag1',
    frequency: 1,
  },
  {
    tag: 'tag0',
    frequency: 0,
  },
];
