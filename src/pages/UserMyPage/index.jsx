import './UserInfo/';
import UserInfo from './UserInfo';
import JobBookmark from './JobBookmark';
import AgePopularity from './AgePopularity';
import InterestAnnouncement from './InterestAnnouncement';
import { useEffect, useState } from 'react';

import axiosInstance from '@/apis/axiosInstance';
import ApplyJobPosting from './ApplyJobPosting';

function UserMyPage() {
  const [userInfo, setUserInfo] = useState(null); // ← 초기값 null로!

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get('/user/me');
        const userInfo = response.data;

        setUserInfo(userInfo);
      } catch (err) {
        console.error('유저 정보 불러오기 실패:', err);
      }
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) return <div>로딩 중...</div>;

  return (
    <div className="user_mypage_container">
      <div className="user_name">
        <h2>{userInfo.name}</h2>
        <span>님, 안녕하세요!</span>
      </div>
      <UserInfo userInfo={userInfo} />
      <ApplyJobPosting userInfo={userInfo} />
      <JobBookmark userInfo={userInfo} />
      <InterestAnnouncement userInfo={userInfo} />
      <AgePopularity userInfo={userInfo} />
    </div>
  );
}

export default UserMyPage;
