import { useEffect, useState } from 'react';
import { axiosTest } from '@/utils/testAxios';
import { parseDesiredArea } from '@/utils/formatRegion';

export const useResume = () => {
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUserAndResume = async () => {
      try {
        const userRes = await axiosTest.get(`${import.meta.env.VITE_API_BASE_URL}/user/me`, {
          withCredentials: true,
        });

        const wrappedUser = { status: 'success', data: userRes.data };

        try {
          const resumeRes = await axiosTest.get(`${import.meta.env.VITE_API_BASE_URL}/resumes`, {
            withCredentials: true,
          });

          const resumeData = resumeRes?.data?.data;
          const resume = resumeData && resumeData.id ? resumeData : null;

          if (resume?.id) {
            setFormData({
              ...resume,
              user_id: wrappedUser,
              resume_id: resume.id,
              educations: resume.educations,
              experiences: resume.experiences,
              introduction: resume.introduction,
              preferredRegions: parseDesiredArea(resume.desired_area || []),
            });
          }
        } catch (e) {
          if (e.response?.status === 404) {
            // 이력서 없음
            setFormData({
              user_id: wrappedUser,
              educations: [],
              experiences: [],
              introduction: '',
              preferredRegions: [],
              resume_id: null,
            });
            return;
          } else {
            throw e;
          }
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
