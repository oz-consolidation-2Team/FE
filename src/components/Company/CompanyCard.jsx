export default function CompanyCard () {
    //api 채용공고 상세 조회 (공고 ID로 상세 내용 조회) /postings/{postings_id}
    // 근무 요약 누락
    //api 기업 정보 조회 (기업 ID로 해당 기업 상세 정보 조회) /company/{company_id}

    //더미데이터
    const data_announcement = {
        "id": 1,
        "title": "개발자 채용",
        "company_users_id": 2,
        "company_id": 3,
        "recruit_period_start": "2025-01-01",
        "recruit_period_end": "2025-06-30",
        "is_always_recruiting": false,
        "education": "대졸",
        "recruit_number": 3,
        "benefits": "병가, 유급 휴가, 가족상 휴가",
        "preferred_conditions": "동종업계 경력자, 운전면허 소지자",
        "other_conditions": "상시 모집, 초보 가능",
        "work_address": "서울시 강남구 역삼동 123-45",
        "work_place_name": "ABC Tech Center",
        "payment_method": "월급",
        "job_category": "IT·인터넷",
        "work_duration": "1년 이상",
        "career": "경력",
        "employment_type": "정규직",
        "salary": 5000,
        "deadline_at": "2025-12-31",
        "work_days": "월-금",
        "description": "채용 공고 상세 내용",
        "created_at": "2025-04-05T10:00:00Z",
        "updated_at": "2025-04-05T10:00:00Z"
    }
    const data_company = {
      "company_user": {
        "company_user_id": 1,
        "email": "company@example.com",
        "manager_name": "임꺽정",
        "manager_phone": "010-1234-5678",
        "manager_email": "manager@example.com"
      },
      "company_info": {
        "company_id": 1,
        "company_name": "넥스트러너스",
        "business_reg_number": "123-45-67890",
        "opening_date": "2020-01-01",
        "ceo_name": "홍길동",
        "company_intro": "회사 소개 내용"
      }
    }
    const 상시모집 = data_announcement.other_conditions.includes("상시 모집") ? "상시 모집" : data_announcement.recruit_period_end + " 까지"
    return (
        <div className="CompanyCard_container">
            <p>{data_company.company_info.company_name}</p>
            <h3>{data_announcement.title}</h3>
            <p>공고 근무 요약</p>
            <div className="bottom">
              <hr />
              <p>{data_announcement.work_address}</p>
              <p>{상시모집}</p>
              <button>공고 보러 가기</button>
            </div>
        </div>
    )
}