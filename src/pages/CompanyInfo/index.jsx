import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import "./CompanyInfo.scss"
import { AiOutlineUser } from "react-icons/ai";
import { BsBuilding } from "react-icons/bs";
import { CompaniesInfo } from "@/apis/companyApi";
import { formatPhoneNumber } from "@/utils/format";
import Hr from "@/utils/Hr";

export default function CompanyInfo () {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const params = useParams('id')

    useEffect(()=>{
        try {
            CompaniesInfo(params.id).then(res => setData(res))
        } catch (error) {
            if (axios.isAxiosError(error)) setError(error.response?.data?.message || '요청 실패')
            else setError('알 수 없는 에러 발생')
        } finally {
            setLoading(false)
        }
    },[])

    return (
        <>
            {data ? 
                <div className="CompanyInfo_container">
                    <h1>{data.company_name}</h1>
                    <Hr />
                    <p className="intro">{data.company_intro}</p>
                    <div className="div_box">
                        <div className="info">
                            <div className="icon">
                                <AiOutlineUser />
                            </div>
                            <div>
                                <p className="category">대표자명</p>
                                <p className="data">{data.ceo_name}</p>
                            </div>
                        </div>

                        <div className="info">
                            <div className="icon">
                                <BsBuilding />
                            </div>
                            <div>
                                <p className="category">개업</p>
                                <p className="data">{data.opening_date}</p>
                            </div>
                        </div>
                    </div>
                    <div className="manager">
                        <p>담당자: {data.manager_name}</p>
                        <div>
                            <p>담당자 이메일: {data.manager_email}</p>
                            <p>담당자 전화번호: {formatPhoneNumber(data.manager_phone)}</p>
                        </div>
                    </div>
                </div>
                : <h1>회사 정보를 가져올 수 없습니다</h1>
            }
        </>
    )
}