import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer_container">
      <div className="footer_wapper">
        <div className="company_footer_info">
          <img src="/logo_white.png" alt="" className="logo" />
          <p>
            대표자 : 이한별 | 사업자 등록번호 : 540-86-00384 | 통신판매업 신고번호 :
            2020-경기김포-3725호
          </p>
          <p>
            주소 : 경기도 김포시 사우중로 87 201호 | 이메일 : kdigital@nextrunners.co.kr | 전화 :
            070-4099-8219
          </p>
        </div>
        <div className="company_footer_policy">
          <p>개인정보처리방침</p>
          <p>이용약관</p>
        </div>
      </div>
    </footer>
  );
};
