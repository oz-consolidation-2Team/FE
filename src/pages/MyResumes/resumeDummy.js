// resumeDummy.js
export const initialFormData = {
  user_id: {
    status: 'success',
    data: {
      id: 3,
      name: '홍길동',
      email: 'asd@example.com',
      gender: '남성',
      birthday: '1990-01-01',
      phone_number: '010-1111-2222',
      interests: ['홍길동', '동길동'],
      signup_purpose: '일자리 정보',
      referral_source: '구글 검색',
      user_image: null,
      created_at: '2025-04-14T07:43:55.714983',
    },
  },
  resume_image: 'https://example.com/image.jpg',
  company_name: '오즈코딩스쿨',
  position: '개발자',
  work_period_start: '2020-01-01T00:00:00',
  work_period_end: '2021-12-31T23:59:59',
  desired_area: '서울',
  introduction: '자기소개 내용',
  educations: [
    {
      education_type: '고등학교',
      school_name: '서울고등학교',
      education_status: '졸업',
      start_date: '2010-03-01T00:00:00',
      end_date: '2013-02-28T00:00:00',
    },
    {
      education_type: '대학교(4년)',
      school_name: '서울대학교',
      education_status: '졸업',
      start_date: '2013-03-01T00:00:00',
      end_date: '2017-02-28T00:00:00',
    },
  ],
  experiences: [
    {
      company_name: '넥스트러너스',
      position: 'Backend Developer',
      start_date: '2020-03-01',
      end_date: '2023-01-01',
      description: '백엔드 개발자',
    },
  ],
};
