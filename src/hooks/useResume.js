import { useEffect, useState } from 'react';
import { parseDesiredArea } from '@/utils/formatRegion';
import axiosFormInstance from '@/apis/axiosFormInstance';

export const useResume = () => {
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUserAndResume = async () => {
      try {
        const userRes = await axiosFormInstance.get(`/user/me`);

        const wrappedUser = { status: 'success', data: userRes.data };

        try {
          const resumeRes = await axiosFormInstance.get(`/resumes`);

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
              resume_image: resume.resume_image || '',
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
