import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null, // 로그인된 사용자 정보
      accessToken: null, // 토큰 (선택사항)
      setUser: (userData, token) =>
        set({ user: userData, accessToken: token }),
      logout: () => set({ user: null, accessToken: null }),
    }),
    {
      name: 'user-storage', // localStorage 저장 키
      getStorage: () => localStorage,
    }
  )
);

export default useUserStore;
