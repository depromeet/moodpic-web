export const getClientBaseUrl = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'http://localhost:3000';

    default:
      return 'https://api.moodpic.kr/';
  }
};
