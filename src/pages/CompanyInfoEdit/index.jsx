import CategoryTitle from '../../components/Company/CategoryTitle'
import Category from '../../components/Company/Category'
import InputText from '../../components/Company/InputText'
import InputImage from '../../components/Company/InputImage'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import InfoEditModal from '../../components/Company/Modal/InfoEditModal'
import "./CompanyInfoEdit.scss"
import { GoArrowLeft } from "react-icons/go";
import { companyMe } from '@/apis/companyPostingApi'
import { CompanyEdit } from '@/apis/companyApi'
import axios from 'axios'
import { validateName, validateEmail, isValidPhone } from '@/utils/validation'
import Hr from '@/utils/Hr'
import Modal from '@/components/Modal'
import { companyDelete } from '@/apis/companyApi'
import { logoutCompanyApi } from '@/apis/authApi'

export default function CompanyInfoEdit () {
    const navigate = useNavigate()
    
    const [formData, setFormData] = useState(null)
    const [CompanyInfoLoading, setCompanyInfoLoading] = useState(true)
    const [companyInfoError, setCompanyInfoError] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [validateError, setValidateError] = useState({
        "company_intro": false,
        "manager_name": false,
        "manager_phone": false,
        "manager_email": false,
        'password': false,
        'confirm_password': false
    })

    useEffect(()=>{
        try {
            companyMe().then(res => setFormData(res))
        } catch (error) {
            if (axios.isAxiosError(error)) setCompanyInfoLoading(error.response?.data?.message || '요청 실패')
            else setCompanyInfoLoading('알 수 없는 에러 발생')
        } finally {
            setCompanyInfoError(false)
        }
    },[])
    
    // 나중에 loading 구현
    if (!formData) return null;

    const state = {
        formData: formData,
        setFormData: setFormData,
        error: validateError,
        setError: setValidateError    
    }

    const validate = () => {
        const newerror = {...validateError}
        Object.entries(validateError).forEach((item) => {
            const data = formData[item[0]]
            if (item[0] === 'company_intro' && !validateName(data)) newerror['company_intro'] = true;
            else if (item[0] === 'manager_name' && !validateName(data)) newerror['manager_name'] = true;
            else if (item[0] === 'manager_phone' && !isValidPhone(data)) newerror['manager_phone'] = true;
            else if (item[0] === 'manager_email' && !validateEmail(data)) newerror['manager_email'] = true;
            else if (item[0] === 'password' && formData['password'] !== 'qwe123!@#') newerror['password'] = true;
            else if (item[0] === 'confirm_password' && formData['password'] !== formData['confirm_password']) newerror['confirm_password'] = true;
        })
        setValidateError(newerror)
        return Object.values(newerror).includes(true)
    }

    function editAPI () {
        try {
            CompanyEdit(formData).then(res => console.log(res))
        } catch (error) {
            console.log('기업 정보 조회 에러', error)
    }}

    function deleteAPI () {
        
        try {
            logoutCompanyApi().then(
                localStorage.removeItem('userType'),
                localStorage.removeItem('access_token'),
                localStorage.removeItem('refresh_token')
            )
        } catch (error) {
            console.log('회원 로그아웃 에러', error)
        }

        try {
            companyDelete().then(res => console.log(res))
        } catch (error) {
            console.log('회원 탈퇴 에러', error)
        }
    }

    const outModal = {
        isOpen: true,
        title: '탈퇴가 완료되었습니다',
        description: '기업과 관련된 모든 정보들이 삭제되었습니다.',
        buttons: [{
            onClick: () => navigate('/'),
            className: 'modal_btn_green',
            label: '닫기'
        }
        ]
    }

    const outCheckModal = {
        isOpen: true,
        title: '정말 탈퇴하시겠습니까?',
        description: `기업 정보와 등록된 채용 공고, 이력서 등의 정보들이 영원히 삭제됩니다. \n 삭제된 정보는 복구할 수 없습니다.`,
        buttons: [{
            onClick: () => {
                deleteAPI()
                setShowModal('out')
            },
            className: 'modal_btn_delete',
            label: '탈퇴하기'
        },
        {
            onClick: () => setShowModal(false),
            className: 'modal_btn_green',
            label: '취소'
        }
        ]
    }



    return (
        <div className="company_main">
            <div className='CompanyInfoEdit_container'>
                <GoArrowLeft 
                    className="button_back"
                    onClick={() => navigate(-1)}/>
                <h1>기업 정보 수정</h1>

                <div className='div_company-info'>
                    <CategoryTitle title="기업 정보" />
                    <div className='div_box disabled'>
                        <Category text='기업명' essential={false} />
                        <InputText {...state} type='text' name='company_name' text='기업명' disabled={true} placeholder={formData.company_name} />
                    </div>

                    <div className='div_box'>
                        <Category text='기업소개' />
                        <InputText {...state} type='text' name='company_intro' text='기업소개' placeholder={formData.company_intro} />
                    </div>
                    {validateError['company_intro'] && <span className="error_message">기업소개를 입력해주세요</span>}

                    <div className='div_box disabled'>
                        <Category text='사업자등록번호' essential={false} />
                        <InputText {...state} type='text' name='business_reg_number' text='사업자등록번호' disabled={true} placeholder={formData.business_reg_number} />
                    </div>

                    <div className='div_box disabled'>
                        <Category text='개업년월일' essential={false} />
                        <InputText {...state} type='text' name='opening_date' text='개업년월일' disabled={true} placeholder={formData.opening_date} />
                    </div>

                    <div className='div_box'>
                        <Category text='이미지 등록' />
                        <InputImage setFormData={setFormData} formData={formData} />
                    </div>
                </div>

                <div className='div_manager-info'>
                    <CategoryTitle title="담당자 정보" />
                    <div className='div_box'>
                        <Category text='이름' />
                        <InputText {...state} type='text' name='manager_name' text='매니저 이름' placeholder={formData.manager_name} />
                    </div>
                    {validateError['manager_name'] && <span className="error_message">이름을 입력해주세요</span>}

                    <div className='div_box'>
                        <Category text='전화번호' />
                        <InputText {...state} type='text' name='manager_phone' text='매니저 전화번호' placeholder={formData.manager_phone} />
                    </div>
                    {validateError['manager_phone'] && <span className="error_message">전화번호를 입력해주세요</span>}

                    <div className='div_box'>
                        <Category text='이메일' />
                        <InputText {...state} type='text' name='manager_email' text='매니저 이메일' placeholder={formData.manager_email} />
                    </div>
                    {validateError['manager_email'] && <span className="error_message">이메일을 입력해주세요</span>}
                </div>

                <div className='div_password'>
                    <Hr />
                    <div className='div_box'>
                        <Category text='비밀번호' />
                        <InputText {...state} type='text' name='password' text='비밀번호' />
                    </div>
                    {validateError['password'] && <span className="error_message">비밀번호를 다시 확인해주세요</span>}

                    <div className='div_box'>
                        <Category text='비밀번호확인' />
                        <InputText {...state} type='text' name='confirm_password' text='비밀번호 재확인' />
                    </div>
                    {validateError['confirm_password'] && <span className="error_message">비밀번호를 다시 확인해주세요</span>}
                </div>

                <button 
                    className='button_edit'
                    onClick={() => {
                        if (validate()) alert('폼을 다시 확인해주세요')
                        else {
                                editAPI()
                                setShowModal('edit')
                            }
                        }}>수정하기</button>
                <button className='button_out' onClick={() => {
                    if (validate()) alert('폼을 다시 확인해주세요')
                    else setShowModal('out_check')
                }}>회원 탈퇴하기</button>
                {console.log(showModal)}
                {showModal && (showModal === "edit" ? <InfoEditModal formData={formData} setShowModal={setShowModal} /> 
                : (showModal === 'out' ? <Modal {...outModal} /> : <Modal {...outCheckModal} />))}
            </div>
        </div>
    )
}