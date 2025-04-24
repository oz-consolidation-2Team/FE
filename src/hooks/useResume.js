import { useEffect, useState } from 'react';
import { axiosTest } from '@/utils/testAxios';

export const useResume = () => {
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUserAndResume = async () => {
      try {
        const [userRes, resumeRes] = await Promise.all([
          axiosTest.get(`${import.meta.env.VITE_API_BASE_URL}/user/me`, { withCredentials: true }),
          axiosTest.get(`${import.meta.env.VITE_API_BASE_URL}/resumes`, { withCredentials: true }),
        ]);

        const wrappedUser = { status: 'success', data: userRes.data };

        const resume = Array.isArray(resumeRes.data) ? resumeRes.data[0] : resumeRes.data;

        console.log('이력서있어?', resume);

        if (resume?.id) {
          setFormData({
            ...resume,
            user_id: wrappedUser,
          });
        } else {
          setFormData({
            user_id: wrappedUser,
            educations: [],
            experiences: [],
            introduction: '',
            preferredRegions: [],
          });
        }
      } catch (e) {
        console.error('데이터 패칭 실패:', e);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndResume();
  }, []);

  return { formData, setFormData, isLoading, isError };
};
