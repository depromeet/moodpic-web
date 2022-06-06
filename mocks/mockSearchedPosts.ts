export const createMockTagRanking = (limit: number) => {
  const result = [];

  for (let i = 0; i < limit; i++) {
    result.push({
      tag: `tag-${i}`,
      frequency: i,
    });
  }

  return result;
};

export const createMockSearchedPotsNewest = (limit: number) => {
  const result = [];

  for (let i = 0; i < limit; i++) {
    result.push({
      id: `id${i++}`,
      firstCategory: '배고파요',
      secondCategory: '어쩌라구',
      content: 'newnewnew content1',
      tags: ['tag1', 'tag2'],
      views: 0,
      createdAt: '2022-06-06 07:43:02',
      my: true,
    });
  }

  console.log('mock:', result);

  return result;
};

export const createMockSearchedPotsPopulariry = (limit: number) => {
  const result = [];

  for (let i = 0; i < limit; i++) {
    console.log(i);
    result.push({
      id: `id${i++}`,
      firstCategory: '배고파요',
      secondCategory: '어쩌라구',
      content: 'pppp content1',
      tags: ['tag1', 'tag2'],
      views: 0,
      createdAt: '2022-06-06 07:43:02',
      my: true,
    });
  }

  console.log('mock:', result);

  return result;
};
