/**
 * 전역 사이트 설정 — 회사 정보 · 연락처 · 패밀리사이트
 * 도메인 확정 시 baseUrl만 바꾸면 sitemap/OG 태그에 반영됩니다.
 */
export const site = {
  baseUrl: 'https://dbworld.co.kr',

  company: {
    ko: {
      name: 'DB월드',
      legalName: '주식회사 디비월드',
      ceo: '윤순균',
      address: '서울특별시 강남구 테헤란로 432 (대치동, DB금융센터)',
      golfAddress: '충청북도 음성군 생극면 차생로 168 (레인보우힐스CC)',
      tel: '02-3484-1906',
      fax: '02-3484-1919',
      bizNo: '214-81-12142',
      slogan: '부동산의 가치와 고객의 자산을 새롭게 창조하는 DB월드',
    },
    en: {
      name: 'DB World',
      legalName: 'DB World Co., Ltd.',
      ceo: 'Yoon Soon-kyun',
      address: 'DB Financial Center, 432 Teheran-ro, Gangnam-gu, Seoul, Korea',
      golfAddress: '168 Chasaeng-ro, Saenggeuk-myeon, Eumseong-gun, Chungcheongbuk-do (Rainbow Hills CC)',
      tel: '+82-2-3484-1906',
      fax: '+82-2-3484-1919',
      bizNo: '214-81-12142',
      slogan: 'DB World creates new value for real estate and customer assets.',
    },
  },

  familySites: [
    { ko: 'DB그룹', en: 'DB Group', url: 'http://www.dbgroup.co.kr' },
    { ko: 'DB손해보험', en: 'DB Insurance', url: 'http://www.idbins.com' },
    { ko: 'DB생명', en: 'DB Life', url: 'http://www.idblife.com' },
    { ko: 'DB증권', en: 'DB Securities', url: 'https://www.dbsec.co.kr' },
    { ko: 'DB자산운용', en: 'DB Asset Management', url: 'http://www.db-asset.co.kr' },
    { ko: 'DB저축은행', en: 'DB Savings Bank', url: 'http://www.idbsb.com' },
    { ko: 'DB캐피탈', en: 'DB Capital', url: 'http://www.dbcapital.co.kr' },
    { ko: 'DB하이텍', en: 'DB HiTek', url: 'http://www.dbhitek.co.kr' },
    { ko: 'DB글로벌칩', en: 'DB GlobalChip', url: 'https://www.dbglobalchip.com' },
    { ko: 'DB Inc.', en: 'DB Inc.', url: 'http://www.dbinc.co.kr' },
    { ko: 'DB커뮤니케이션즈', en: 'DB Communications', url: 'http://www.dbcommunications.co.kr' },
  ],
};
