import JobPosting from './JobPosting/JobPosting';
import './UserInfo/';
import UserInfo from './UserInfo';
import JobRecommend from './JobRecommend';
import AgePopularity from './AgePopularity';
import InterestAnnouncement from './InterestAnnouncement';
import { useEffect, useState } from 'react';

import axiosInstance from '@/apis/axiosInstance';

function UserMyPage() {
  const [userInfo, setUserInfo] = useState(null); // ← 초기값 null로!

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get('/user/me');

        const userId = response.data.id;

        try {
          const res = await axiosInstance.get(`/user/${userId}`);

          const userInfoRes = res.data.data;
          setUserInfo(userInfoRes);
        } catch (err) {
          console.error('유저 정보 불러오기 실패:', err);
        }
      } catch (err) {
        console.error('유저 정보 불러오기 실패:', err);
      }
    };

    fetchUserInfo();
  }, []);

  console.log();

  if (!userInfo) return <div>로딩 중...</div>;

  return (
    <div className="user_mypage_container">
      <div className="user_name">
        <h2>{userInfo.name}</h2>
        <span>님, 안녕하세요!</span>
      </div>
      <UserInfo userInfo={userInfo} />
      <JobPosting userInfo={userInfo} />
      <JobRecommend userInfo={userInfo} />
      <InterestAnnouncement userInfo={userInfo} />
      <AgePopularity userInfo={userInfo} />
    </div>
  );
}

export default UserMyPage;
