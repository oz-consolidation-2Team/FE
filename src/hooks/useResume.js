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
        const [userRes, resumeRes] = await Promise.all([
          axiosTest.get(`${import.meta.env.VITE_API_BASE_URL}/user/me`, { withCredentials: true }),
          axiosTest.get(`${import.meta.env.VITE_API_BASE_URL}/resumes`, { withCredentials: true }),
        ]);

        const wrappedUser = { status: 'success', data: userRes.data };

        const resumeData = resumeRes?.data?.data;
        const resume = resumeData && resumeData.id ? resumeData : null;

        console.log('이력서있어?', resume);
        console.log('회원정보있어?', resumeRes);

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
        } else {
          setFormData({
            user_id: wrappedUser,
            educations: [],
            experiences: [],
            introduction: '',
            preferredRegions: [],
            resume_id: null,
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
  console.log('📨useResume에서 보내는  :', formData);

  return { formData, setFormData, isLoading, isError };
};
