import { create } from 'zustand';
import { addFavorite, deleteFavorite, getFavorites } from '@/apis/favoriteApi';

export const useFavoriteStore = create((set, get) => ({
  favorites: [],

  fetchFavorites: async () => {
    try {
      const data = await getFavorites();
      set({ favorites: data });
    } catch (err) {
      console.error('❌ fetchFavorites 실패', err);
    }
  },

  toggleFavorite: async (job) => {
    console.log('job 전달값:', job);
    const jobId = job.job_posting_id || job.id || job.job_id;
    console.log('삭제 요청할 jobId:', jobId);
    const isAlreadyFavorited = get().favorites.some(
      (j) => (j.job_posting_id || j.id || j.job_id) === jobId
    );

    try {
      if (isAlreadyFavorited) {
        await deleteFavorite(jobId);
        console.log(`[DELETE] 즐겨찾기 해제: ${jobId}`);
      } else {
        console.log('job 전달값:', job);
        console.log('삭제 요청할 jobId:', jobId);
        await addFavorite(jobId);
        console.log(`[POST] 즐겨찾기 추가: ${jobId}`);
      }

      await get().fetchFavorites();
    } catch (err) {
      console.error('❌ toggleFavorite 실패', err);
    }
  },
}));
