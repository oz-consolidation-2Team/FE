import PropTypes from 'prop-types';

export const resumePropTypes = PropTypes.shape({
  user_id: PropTypes.shape({
    status: PropTypes.string,
    data: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      gender: PropTypes.string,
      birthday: PropTypes.string,
      phone_number: PropTypes.string,
      interests: PropTypes.arrayOf(PropTypes.string),
      signup_purpose: PropTypes.string,
      referral_source: PropTypes.string,
      user_image: PropTypes.string, // null이라면 string 또는 null 처리 가능
      created_at: PropTypes.string,
    }),
  }),

  resume_image: PropTypes.string,
  company_name: PropTypes.string,
  position: PropTypes.string,
  work_period_start: PropTypes.string,
  work_period_end: PropTypes.string,
  desired_area: PropTypes.string,
  introduction: PropTypes.string,

  educations: PropTypes.arrayOf(
    PropTypes.shape({
      education_type: PropTypes.string,
      school_name: PropTypes.string,
      education_status: PropTypes.string,
      start_date: PropTypes.string,
      end_date: PropTypes.string,
    })
  ),

  experiences: PropTypes.arrayOf(
    PropTypes.shape({
      company_name: PropTypes.string,
      position: PropTypes.string,
      start_date: PropTypes.string,
      end_date: PropTypes.string,
      description: PropTypes.string,
    })
  ),
});
