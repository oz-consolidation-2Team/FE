import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import './JobRecommend.scss';

const BookMarkJobCard = () => {
  const Bookmark = [
    {
      id: 10,
      user_id: 1,
      job_posting_id: {
        id: 1,
        title: '개발자 채용',
        company_users_id: 2,
        company_id: 3,
        recruit_period_start: '2025-01-01',
        recruit_period_end: '2025-06-30',
        is_always_recruiting: false,
        education: '대졸',
        recruit_number: 3,
        benefits: '병가, 유급 휴가, 가족상 휴가',
        preferred_conditions: '동종업계 경력자, 운전면허 소지자',
        other_conditions: '상시 모집, 초보 가능',
        work_address: '서울시 강남구 역삼동 123-45',
        work_place_name: 'ABC Tech Center',
        payment_method: '월급',
        job_category: 'IT·인터넷',
        work_duration: '1년 이상',
        career: '경력',
        employment_type: '정규직',
        salary: 5000,
        deadline_at: '2025-12-31',
        work_days: '월-금',
        description: '채용 공고 상세 내용',
        created_at: '2025-04-05T10:00:00Z',
        updated_at: '2025-04-05T10:00:00Z',
      },
      created_at: '2025-04-05T10:00:00Z',
    },
    {
      id: 11,
      user_id: 1,
      job_posting_id: {
        id: 1,
        title: '개발자 채용',
        company_users_id: 2,
        company_id: 3,
        recruit_period_start: '2025-01-01',
        recruit_period_end: '2025-06-30',
        is_always_recruiting: false,
        education: '대졸',
        recruit_number: 3,
        benefits: '병가, 유급 휴가, 가족상 휴가',
        preferred_conditions: '동종업계 경력자, 운전면허 소지자',
        other_conditions: '상시 모집, 초보 가능',
        work_address: '서울시 강남구 역삼동 123-45',
        work_place_name: 'ABC Tech Center',
        payment_method: '월급',
        job_category: 'IT·인터넷',
        work_duration: '1년 이상',
        career: '경력',
        employment_type: '정규직',
        salary: 5000,
        deadline_at: '2025-12-31',
        work_days: '월-금',
        description: '채용 공고 상세 내용',
        created_at: '2025-04-05T10:00:00Z',
        updated_at: '2025-04-05T10:00:00Z',
      },
      created_at: '2025-04-05T10:00:00Z',
    },
    {
      id: 11,
      user_id: 1,
      job_posting_id: {
        id: 1,
        title: '개발자 채용',
        company_users_id: 2,
        company_id: 3,
        recruit_period_start: '2025-01-01',
        recruit_period_end: '2025-06-30',
        is_always_recruiting: false,
        education: '대졸',
        recruit_number: 3,
        benefits: '병가, 유급 휴가, 가족상 휴가',
        preferred_conditions: '동종업계 경력자, 운전면허 소지자',
        other_conditions: '상시 모집, 초보 가능',
        work_address: '서울시 강남구 역삼동 123-45',
        work_place_name: 'ABC Tech Center',
        payment_method: '월급',
        job_category: 'IT·인터넷',
        work_duration: '1년 이상',
        career: '경력',
        employment_type: '정규직',
        salary: 5000,
        deadline_at: '2025-12-31',
        work_days: '월-금',
        description: '채용 공고 상세 내용',
        created_at: '2025-04-05T10:00:00Z',
        updated_at: '2025-04-05T10:00:00Z',
      },
      created_at: '2025-04-05T10:00:00Z',
    },
    {
      id: 11,
      user_id: 1,
      job_posting_id: {
        id: 1,
        title: '개발자 채용',
        company_users_id: 2,
        company_id: 3,
        recruit_period_start: '2025-01-01',
        recruit_period_end: '2025-06-30',
        is_always_recruiting: false,
        education: '대졸',
        recruit_number: 3,
        benefits: '병가, 유급 휴가, 가족상 휴가',
        preferred_conditions: '동종업계 경력자, 운전면허 소지자',
        other_conditions: '상시 모집, 초보 가능',
        work_address: '서울시 강남구 역삼동 123-45',
        work_place_name: 'ABC Tech Center',
        payment_method: '월급',
        job_category: 'IT·인터넷',
        work_duration: '1년 이상',
        career: '경력',
        employment_type: '정규직',
        salary: 5000,
        deadline_at: '2025-12-31',
        work_days: '월-금',
        description: '채용 공고 상세 내용',
        created_at: '2025-04-05T10:00:00Z',
        updated_at: '2025-04-05T10:00:00Z',
      },
      created_at: '2025-04-05T10:00:00Z',
    },
    {
      id: 11,
      user_id: 1,
      job_posting_id: {
        id: 1,
        title: '개발자 채용',
        company_users_id: 2,
        company_id: 3,
        recruit_period_start: '2025-01-01',
        recruit_period_end: '2025-06-30',
        is_always_recruiting: false,
        education: '대졸',
        recruit_number: 3,
        benefits: '병가, 유급 휴가, 가족상 휴가',
        preferred_conditions: '동종업계 경력자, 운전면허 소지자',
        other_conditions: '상시 모집, 초보 가능',
        work_address: '서울시 강남구 역삼동 123-45',
        work_place_name: 'ABC Tech Center',
        payment_method: '월급',
        job_category: 'IT·인터넷',
        work_duration: '1년 이상',
        career: '경력',
        employment_type: '정규직',
        salary: 5000,
        deadline_at: '2025-12-31',
        work_days: '월-금',
        description: '채용 공고 상세 내용',
        created_at: '2025-04-05T10:00:00Z',
        updated_at: '2025-04-05T10:00:00Z',
      },
      created_at: '2025-04-05T10:00:00Z',
    },
  ];

  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <>
      {Bookmark.map((el) => {
        return (
          <div className="job_card" key={el.id}>
            <div className="job_top">
              <span className="company">{el.job_posting_id.company_id}</span>
              <h3 className="title">{el.job_posting_id.title}</h3>
              <span className="date">{el.job_posting_id.deadline_at}</span>
            </div>
            <div className="job_bottom">
              {isBookmarked ? (
                <FaStar className="star_icon filled" onClick={toggleBookmark} />
              ) : (
                <FaRegStar className="star_icon" onClick={toggleBookmark} />
              )}
              <span className="location">{el.job_posting_id.work_address}</span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default BookMarkJobCard;
