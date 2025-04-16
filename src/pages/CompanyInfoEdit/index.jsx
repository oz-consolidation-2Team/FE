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
    const navigate = useNavigate()
    //api 기업 정보 조회 (기업 ID로 해당 기업 상세 정보 조회) /company/{company_id}
    
    // 더미데이터
    const data = {
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

    return (
        <div className='CompanyInfoEdit_container'>
            <GoArrowLeft 
                className="button_back"
                onClick={() => navigate(-1)}/>
            <h1>기업 정보 수정</h1>

            <div className='div_company-info'>
                <CategoryTitle title="기업 정보" />
                <div className='box deactivation'>
                    <Category text='기업명' essential={false} />
                    <InputText type='text' placeholder={data.company_name} />
                </div>
                <div className='box'>
                    <Category text='기업소개' />
                    <InputText type='text' placeholder={data.company_intro} />
                </div>
                <div className='box deactivation'>
                    <Category text='사업자등록번호' essential={false} />
                    <InputText type='text' placeholder={data.business_reg_number} />
                </div>
                <div className='box deactivation'>
                    <Category text='개업년월일' essential={false} />
                    <InputText type='text' placeholder={data.opening_date} />
                </div>
                <div className='box'>
                    <Category text='이미지 등록' />
                    <InputImage data={data} />
                </div>
            </div>

            <div className='div_manager-info'>
                <CategoryTitle title="담당자 정보" />
                <div className='box'>
                    <Category text='이름' />
                    <InputText type='text' placeholder={data.manager_name} />
                </div>
                <div className='box'>
                    <Category text='전화번호' />
                    <InputText type='text' placeholder={data.manager_phone} />
                </div>
                <div className='box'>
                    <Category text='이메일' />
                    <InputText type='text' placeholder={data.manager_email} />
                </div>
            </div>

            <button 
                className='button_edit'
                onClick={() => setShowModal(true)}>수정하기</button>
            {showModal && <InfoEditModal data={data} setShowModal={setShowModal} />}
        </div>
    )
}