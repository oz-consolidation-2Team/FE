import { useParams } from "react-router-dom"
import "./CompanyInfo.scss"
import { AiOutlineUser } from "react-icons/ai";
import { BsBuilding } from "react-icons/bs";
import Hr from "@/utils/Hr";
import { CompaniesInfo } from "@/apis/companyApi";
import { useEffect, useState } from "react";
import { formatPhoneNumber } from "@/utils/format";

export default function CompanyInfo () {
    const [data, setData] = useState()
    const params = useParams('id')

    useEffect(()=>{
        CompaniesInfo(params.id).then(res => {
            setData(res)
        })
    },[])

    return (
        <>
            {data ? 
                <div className="CompanyInfo_container">
                    <h1>{data.company_name}</h1>
                    <Hr />
                    <p className="intro">{data.company_intro}</p>
                    <div className="box">
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