import PropTypes from 'prop-types';

// 사용자 정보

export const userInfoPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  gender: PropTypes.string,
  birthday: PropTypes.string,
  phone_number: PropTypes.string,
  interests: PropTypes.arrayOf(PropTypes.string),
  signup_purpose: PropTypes.string,
  referral_source: PropTypes.string,
  user_image: PropTypes.string,
  created_at: PropTypes.string,
});

// 채용 정보

export const jobPropsType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  work_place_name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  work_address: PropTypes.string,
  other_conditions: PropTypes.string,
  deadline_at: PropTypes.string,
  job_category: PropTypes.string,
  salary: PropTypes.number,
  payment_method: PropTypes.string,
  description: PropTypes.string,
  recruit_period_start: PropTypes.string,
  recruit_period_end: PropTypes.string,
  education: PropTypes.string,
  recruit_number: PropTypes.number,
  preferred_conditions: PropTypes.string,
  employment_type: PropTypes.string,
  benefits: PropTypes.string,
  career: PropTypes.string,
  work_duration: PropTypes.string,
  work_days: PropTypes.string,
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
  is_always_recruiting: PropTypes.bool,
  company_users_id: PropTypes.number,
  company_id: PropTypes.number,
});

// 북마크한 공고

export const bookmarkJobPropsType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  user_id: PropTypes.number.isRequired,
  created_at: PropTypes.string,
  job_posting_id: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    company_users_id: PropTypes.number,
    company_id: PropTypes.number,
    recruit_period_start: PropTypes.string,
    recruit_period_end: PropTypes.string,
    is_always_recruiting: PropTypes.bool,
    education: PropTypes.string,
    recruit_number: PropTypes.number,
    benefits: PropTypes.string,
    preferred_conditions: PropTypes.string,
    other_conditions: PropTypes.string,
    work_address: PropTypes.string,
    work_place_name: PropTypes.string,
    payment_method: PropTypes.string,
    job_category: PropTypes.string,
    work_duration: PropTypes.string,
    career: PropTypes.string,
    employment_type: PropTypes.string,
    salary: PropTypes.number,
    deadline_at: PropTypes.string,
    work_days: PropTypes.string,
    description: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }),
});
