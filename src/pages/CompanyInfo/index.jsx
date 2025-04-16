import { useParams } from "react-router-dom"
import "./CompanyInfo.scss"
import { AiOutlineUser } from "react-icons/ai";
import { BsBuilding } from "react-icons/bs";

export default function CompanyInfo (props) {
    const params = useParams('id')
    // 기업 ID 토대 API 호출

    // 더미데이터
    const data =  {
        "company_id": 1,
        "company_name": "넥스트러너스",
        "business_reg_number": "123-45-67890",
        "opening_date": "2020-01-01",
        "ceo_name": "홍길동",
        "company_intro": "회사 소개 내용",
        "address": "서울시 강남구",
        "company_image": "https://example.com/image.jpg"
      }

    return (
        <div className="CompanyInfo_container">
            <h1>{data.company_name}</h1>
            <hr />
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
                <p>담당자: 누락</p>
                <div>
                    <p>담당자 이메일: 누락</p>
                    <p>담당자 전화번호: 누락</p>
                </div>
            </div>
        </div>
    )
}