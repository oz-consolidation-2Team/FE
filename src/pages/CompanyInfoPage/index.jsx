import InfoBox from "../../components/Company/InfoBox"
import AnnouncementCard from "../../components/Company/AnnouncementCard"
import { useNavigate } from 'react-router-dom';

export default function CompanyInfoPage() {
  const navigate = useNavigate();

  const handleAnnouncementAddClick = () => {
    navigate('/company_announcement_add_page');
  };

  // 더미데이터
  const data = [{
    id: 1,
    companyName: "가나다컴퍼니",
    companyAdress: "부산 광역시",
    AnnouncementName: "훈민정음 같이 볼 사람 구합니다",
    AnnouncementContent: "누구나 가능. 학습의지가 불타오르는 사람 대환영",
    time: "2025.10.21"
  },{
    id: 2,
    companyName: "가나다컴퍼니",
    companyAdress: "부산 광역시",
    AnnouncementName: "훈민정음 같이 볼 사람 구합니다",
    AnnouncementContent: "누구나 가능. 학습의지가 불타오르는 사람 대환영",
    time: "2025.10.21"
  },{
    id: 3,
    companyName: "가나다컴퍼니",
    companyAdress: "부산 광역시",
    AnnouncementName: "훈민정음 같이 볼 사람 구합니다",
    AnnouncementContent: "누구나 가능. 학습의지가 불타오르는 사람 대환영",
    time: "2025.10.21"
  }]

  return (
    <div>
      <h1>기업 이름</h1>
      <div>
        <InfoBox type='company' />
        <button onClick={handleAnnouncementAddClick}>공고 작성하기</button>
      </div>
      
      <hr />

      <h2>나의 공고</h2>
      {data.map(item => 
        <AnnouncementCard {...item} key={item.id} />
      )}
    </div>
  );
}