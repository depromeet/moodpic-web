import axios from 'axios';

const authService = {
  // axios 관련 유틸 함수나 커스텀 인스턴스 필요
  getAuth: async (kakaoCode: string) => {
    const {
      data: { data },
    } = await axios.get(`/signIn?code=${kakaoCode}`);

    const { auth, refresh } = data;
    return { auth, refresh };
  },

  login: async (AUTH_TOKEN: string) => {
    const headers = { AUTH_TOKEN };
    const data = await axios.get('/users/me', { headers });
  },

  getRefresh: async () => {
    const data = await axios.get('/refresh');
  },
};

export default authService;
