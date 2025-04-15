import React from 'react';
import './AboutCompany.scss';

const AboutCompany = () => {
  return (
    <div className="about-company">
      <section className="hero">
        <div className="overlay">
          <h1>시니어 내일</h1>
          <h2>- 시니어 세대를 위한 새로운 기회</h2>
          <p className="quote">
            퇴직이 끝이 아니라, 새로운 시작이 될 수 있도록.<br />
            우리는 시니어 세대가 다시 사회에서 필요한 사람이 될 수 있도록 돕습니다.
          </p>
          <p className="desc">
            하지만 현실은 쉽지 않습니다.<br />
            중장년층이 다시 일을 찾고 싶어도 어디서부터 시작해야 할지 막막한 경우가 많습니다.<br />
            경험과 능력을 갖춘 사람도 적합한 일자리를 찾기 어렵고,<br />
            지원 과정이 복잡하거나 정보가 부족해 기회를 놓치는 경우가 많습니다.<br /><br />
            그래서 우리는 시니어 내일을 만들었습니다.<br />
            <strong>“시니어 세대가 다시 나를 되찾고 일할 수 있도록 돕는 맞춤형 일자리 플랫폼”</strong>입니다.
          </p>
        </div>
      </section>

      <section className="what-we-do">
        <div className="content">
          <div className="features">
            <div className="intro-container">
             <h2>시니어 내일이 하는 일</h2>
             <p className="intro">단순하고 직관적인 디자인으로 중장년들도 쉽게 이용하며, 안정된 일자리와 매칭된 간단한 지원 과정을 통해 효율적으로 일할 수 있도록 돕습니다.</p>
          </div>
            <div className="feature-wrapper">
              <div className="feature">
                <h3>1. 시니어 맞춤형 일자리 매칭</h3>
                <p>사무직, 서비스직, 생산직,등 다양한 직군에서 중장년층에게 적합한 일자리 매칭을 제공합니다.</p>
              </div>
            </div>
            <div className="feature-wrapper">
              <div className="feature">
                <h3>2. 공공 & 민간 일자리 연계</h3>
                <p>서울시 공공채용, 민간채용, 교육과 연계하여 더욱 많은 기회를 연결합니다.</p>
              </div>
            </div>
            <div className="feature-wrapper">
              <div className="feature">
                <h3>3. 간편한 회원가입과 이력 관리</h3>
                <p>복잡한 절차 없이 간단한 인증만으로 가입 가능하며, 개인 이력을 쉽고 빠르게 관리할 수 있습니다.</p>
              </div>
            </div>
            <div className="feature-wrapper">
              <div className="feature">
                <h3>4. 실시간 채용 소식 제공</h3>
                <p>중장년층에 적합한 최신 채용 정보를 실시간으로 확인할 수 있어 빠르게 대응할 수 있습니다.</p>
              </div>
            </div>
          </div>
          <div className="image-box">
            <img src="/introduce.png" alt="시니어 내일 소개 이미지" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutCompany;