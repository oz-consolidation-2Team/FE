import CategoryTitle from '../../components/Company/CategoryTitle'
import Category from '../../components/Company/Category'
import InputText from '../../components/Company/InputText'
import InputImage from '../../components/Company/InputImage'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import InfoEditModal from '../../components/Company/Modal/InfoEditModal'
import "./CompanyInfoEdit.scss"
import { GoArrowLeft } from "react-icons/go";

export default function CompanyInfoEdit () {
    const [showModal, setShowModal] = useState(false)
    //api 기업 정보 조회 (기업 ID로 해당 기업 상세 정보 조회) /company/me ( body에 company_user_id 입력 / company_user_id는 전역상태에서 호출)
    const [formData, setFormData] = useState({
        "company_user_id": 1,
        "email": "company@example.com",
        "manager_name": "임꺽정",
        "manager_phone": "010-1234-5678",
        "manager_email": "manager@example.com",
        "company_id": 1,
        "company_name": "넥스트러너스",
        "business_reg_number": "123-45-67890",
        "opening_date": "2020-01-01",
        "ceo_name": "홍길동",
        "company_intro": "회사 소개 내용"
    })
    const [error, setError] = useState({
        "company_intro": false,
        "manager_name": false,
        "manager_phone": false,
        "manager_email": false
    })
    const navigate = useNavigate()
    const state = {
        formData: formData,
        setFormData: setFormData,
        error: error,
        setError: setError    
    }
    
    const validate = () => {
        console.log('validate 실행됨')
        const newerror = {...error}
        Object.entries(error).forEach((item) => {
            if (!formData[item[0]]) newerror[item[0]] = true
        })
        setError(newerror)
        console.log(newerror)
        return Object.values(newerror).includes(true)
    }

    return (
        <div className='CompanyInfoEdit_container'>
            <GoArrowLeft 
                className="button_back"
                onClick={() => navigate(-1)}/>
            <h1>기업 정보 수정</h1>

            <div className='div_company-info'>
                <CategoryTitle title="기업 정보" />
                <div className='box disabled'>
                    <Category text='기업명' essential={false} />
                    <InputText {...state} type='text' name='company_name' text='기업명' disabled={true} placeholder={formData.company_name} />
                </div>

                <div className='box'>
                    <Category text='기업소개' />
                    <InputText {...state} type='text' name='company_intro' text='기업소개' placeholder={formData.company_intro} />
                </div>
                {error['company_intro'] && <span className="error_message">기업소개를 입력해주세요</span>}

                <div className='box disabled'>
                    <Category text='사업자등록번호' essential={false} />
                    <InputText {...state} type='text' name='business_reg_number' text='사업자등록번호' disabled={true} placeholder={formData.business_reg_number} />
                </div>

                <div className='box disabled'>
                    <Category text='개업년월일' essential={false} />
                    <InputText {...state} type='text' name='opening_date' text='개업년월일' disabled={true} placeholder={formData.opening_date} />
                </div>

                <div className='box'>
                    <Category text='이미지 등록' />
                    <InputImage formData={formData} />
                </div>
                {/* {error['recruit_period_start'] && <span className="error_message">기업명을 입력해주세요</span>} */}
            </div>

            <div className='div_manager-info'>
                <CategoryTitle title="담당자 정보" />
                <div className='box'>
                    <Category text='이름' />
                    <InputText {...state} type='text' name='manager_name' text='매니저 이름' placeholder={formData.manager_name} />
                </div>
                {error['manager_name'] && <span className="error_message">이름을 입력해주세요</span>}

                <div className='box'>
                    <Category text='전화번호' />
                    <InputText {...state} type='text' name='manager_phone' text='매니저 전화번호' placeholder={formData.manager_phone} />
                </div>
                {error['manager_phone'] && <span className="error_message">전화번호를 입력해주세요</span>}

                <div className='box'>
                    <Category text='이메일' />
                    <InputText {...state} type='text' name='manager_email' text='매니저 이메일' placeholder={formData.manager_email} />
                </div>
                {error['manager_email'] && <span className="error_message">이메일을 입력해주세요</span>}
            </div>

            <button 
                className='button_edit'
                onClick={() => {
                    if (validate()) alert('폼을 다시 확인해주세요')
                    else setShowModal(true)
                    }}>수정하기</button>
            {showModal && <InfoEditModal formData={formData} setShowModal={setShowModal} />}
        </div>
    )
}