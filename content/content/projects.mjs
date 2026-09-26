/**
 * 사업실적 데이터
 * — cats: development | pm | cm | consulting | golf (복수 지정 가능)
 * — map: 프로젝트 맵 SVG 좌표 (viewBox 0 0 420 660 기준) · 같은 도시는 같은 좌표 사용
 * — img: assets/img/projects/<img>.jpg 존재 시 사용, 없으면 브랜드 패턴 폴백
 * — featured: 메인 페이지 쇼케이스 노출 여부
 */
export const projects = [
  {
    slug: 'rainbow-hills-cc', cats: ['golf'], featured: true, img: 'golf-rainbowhills',
    map: { x: 298.1, y: 192.5, city: { ko: '음성', en: 'Eumseong' } },
    ko: {
      name: '레인보우힐스 컨트리클럽', location: '충북 음성군 생극면',
      scale: '27홀 (파 108)', area: '부지 659,708평', completed: '2008년 개장',
      desc: '로버트 트렌트 존스 주니어가 자연 지형을 살려 설계한 27홀 대중제 골프장. "한국의 페블비치"로 불리며, KLPGA DB 위민스 챔피언십 등 프로·아마추어 대회를 개최하는 챔피언십 코스입니다.',
    },
    en: {
      name: 'Rainbow Hills Country Club', location: 'Eumseong-gun, Chungbuk',
      scale: '27 holes (par 108)', area: '2.18M m² site', completed: 'Opened 2008',
      desc: 'A 27-hole public championship course designed by Robert Trent Jones Jr., known as the Pebble Beach of Korea and home of the KLPGA DB Women’s Championship.',
    },
  },
  {
    slug: 'db-financial-center', cats: ['development', 'pm'], featured: true, img: 'dbfc-tower',
    map: { x: 230.5, y: 133.8, city: { ko: '서울', en: 'Seoul' } },
    ko: {
      name: 'DB금융센터', location: '서울 강남구 대치동',
      scale: '지하 7층 · 지상 35층', area: '연면적 17,248평', completed: '2002년 준공',
      desc: '테헤란로의 랜드마크 프라임 오피스. DB월드가 개발 단계부터 참여했으며 현재 자산관리(PM)를 수행하고 있습니다. 로비의 미디어아트 갤러리는 방문객에게 새로운 공간 경험을 제공합니다.',
    },
    en: {
      name: 'DB Financial Center', location: 'Daechi-dong, Gangnam-gu, Seoul',
      scale: 'B7 – 35F', area: 'GFA 57,000m²', completed: 'Completed 2002',
      desc: 'A landmark prime office on Teheran-ro. DB World participated from development and now provides property management. The lobby media-art gallery offers a distinctive experience.',
    },
  },
  {
    slug: 'busan-hq', cats: ['development', 'pm', 'consulting'], featured: true, img: 'busan-hq',
    map: { x: 420.7, y: 402.5, city: { ko: '부산', en: 'Busan' } },
    ko: {
      name: 'DB손해보험 부산사옥', location: '부산 부산진구 부전동 (서면)',
      scale: '지하 8층 · 지상 24층', area: '연면적 13,535평', completed: "공사 중 ('26년 준공 예정)",
      desc: '서면 중심업무지구의 신축 업무시설. DB월드가 사업계획·타당성 검토부터 시공관리(CM), 준공 후 자산관리(PM)까지 전 과정을 수행하는 대표 프로젝트입니다.',
    },
    en: {
      name: 'DB Insurance Busan HQ', location: 'Bujeon-dong, Busanjin-gu, Busan (Seomyeon)',
      scale: 'B8 – 24F', area: 'GFA 44,700m²', completed: 'Completion 2026',
      desc: 'A new office tower in the Seomyeon CBD. DB World handles the full cycle — feasibility, construction management and post-completion property management.',
    },
  },
  {
    slug: 'dongja-office', cats: ['development'], featured: false, img: 'dongja-office',
    map: { x: 230.5, y: 133.8, city: { ko: '서울', en: 'Seoul' } },
    ko: {
      name: '동자 오피스Ⅱ', location: '서울 용산구 동자동',
      scale: '지하 7층 · 지상 40층', area: '연면적 43,000평', completed: '인허가 진행중',
      desc: '서울역 인근 동자동의 대규모 업무시설 개발 및 자산관리 프로젝트입니다.',
    },
    en: {
      name: 'Dongja Office Ⅱ', location: 'Dongja-dong, Yongsan-gu, Seoul',
      scale: 'B7 – 40F', area: 'GFA 142,000m²', completed: 'Permitting in progress',
      desc: 'A large-scale office development and property management project near Seoul Station.',
    },
  },
  {
    slug: 'dongja-office1', cats: ['pm'], featured: false, img: 'dongja-office1',
    map: { x: 230.5, y: 133.8, city: { ko: '서울', en: 'Seoul' } },
    ko: {
      name: '동자 오피스Ⅰ', location: '서울 용산구 동자동',
      scale: '지하 6층 · 지상 24층', area: '연면적 13,535평', completed: '자산관리(PM) 수행 중',
      desc: '서울역 인근 동자동 업무시설의 자산관리(PM)를 수행하고 있습니다.',
    },
    en: {
      name: 'Dongja Office Ⅰ', location: 'Dongja-dong, Yongsan-gu, Seoul',
      scale: 'B6 – 24F', area: 'GFA 44,700m²', completed: 'Under management',
      desc: 'Property management of an office building in Dongja-dong, near Seoul Station.',
    },
  },
  {
    slug: 'sinsa-office', cats: ['development'], featured: false, img: 'sinsa-office',
    map: { x: 230.5, y: 133.8, city: { ko: '서울', en: 'Seoul' } },
    ko: {
      name: '신사 오피스 및 근생', location: '서울 강남구 신사동',
      scale: '지하 3층 · 지상 4층', area: '연면적 2,750평', completed: '사업계획 중',
      desc: '신사동 일원의 오피스·근린생활시설 개발 프로젝트로, 사업계획을 수립하고 있습니다.',
    },
    en: {
      name: 'Sinsa Office & Retail', location: 'Sinsa-dong, Gangnam-gu, Seoul',
      scale: 'B3 – 4F', area: 'GFA 9,100m²', completed: 'Business planning',
      desc: 'An office and neighborhood retail development project in Sinsa-dong, currently in business planning.',
    },
  },
  {
    slug: 'gonjiam-center', cats: ['development'], featured: false, img: 'gonjiam-center',
    map: { x: 257.9, y: 155.2, city: { ko: '광주(경기)', en: 'Gwangju' } },
    ko: {
      name: '곤지암 연수원', location: '경기 광주시 곤지암',
      scale: '지하 1층 · 지상 5층', area: '연면적 4,600평', completed: '1992년 준공 · 리모델링 사업계획 중',
      desc: '1992년 준공한 곤지암 연수원의 리모델링 사업계획을 수립하고 있습니다.',
    },
    en: {
      name: 'Gonjiam Training Center', location: 'Gonjiam, Gwangju, Gyeonggi',
      scale: 'B1 – 5F', area: 'GFA 15,200m²', completed: 'Completed 1992 · remodeling planned',
      desc: 'Remodeling business planning for the Gonjiam Training Center, completed in 1992.',
    },
  },
  {
    slug: 'samseong-office', cats: ['pm'], featured: false, img: 'samseong-office',
    map: { x: 230.5, y: 133.8, city: { ko: '서울', en: 'Seoul' } },
    ko: {
      name: '삼성동 오피스', location: '서울 강남구 삼성동',
      scale: '지하 4층 · 지상 14층', area: '연면적 4,522평', completed: '임대차컨설팅(LM) 수행 중',
      desc: '강남 삼성동 업무시설의 임대/임차 영업 전략 수립과 임대차컨설팅(LM)을 수행합니다.',
    },
    en: {
      name: 'Samseong-dong Office', location: 'Samseong-dong, Gangnam-gu, Seoul',
      scale: 'B4 – 14F', area: 'GFA 15,000m²', completed: 'Leasing consulting',
      desc: 'Leasing strategy and consulting for an office building in Samseong-dong, Gangnam.',
    },
  },
  {
    slug: 'bundang-retail', cats: ['pm'], featured: false, img: 'bundang-retail',
    map: { x: 243.3, y: 153, city: { ko: '성남', en: 'Seongnam' } },
    ko: {
      name: '분당 근린생활시설', location: '경기 성남시 분당구 서현동',
      scale: '지상 5층', area: '연면적 3,286평', completed: 'PM 수행 중',
      desc: '분당 서현동 근린생활시설의 운영·관리를 수행합니다.',
    },
    en: {
      name: 'Bundang Retail Facility', location: 'Seohyeon-dong, Bundang-gu, Seongnam',
      scale: '5F', area: 'GFA 10,900m²', completed: 'Under management',
      desc: 'Operation and management of a neighborhood retail facility in Bundang.',
    },
  },
  {
    slug: 'oryu-logistics', cats: ['pm'], featured: false, img: 'oryu-logistics',
    map: { x: 230.5, y: 133.8, city: { ko: '서울', en: 'Seoul' } },
    ko: {
      name: '오류동 물류센터', location: '서울 구로구 오류동',
      scale: '물류창고', area: '연면적 17,177평', completed: 'PM 수행 중',
      desc: '수도권 서남부 물류 거점인 오류동 물류창고의 자산관리를 수행합니다.',
    },
    en: {
      name: 'Oryu-dong Logistics Center', location: 'Oryu-dong, Guro-gu, Seoul',
      scale: 'Logistics warehouse', area: 'GFA 56,800m²', completed: 'Under management',
      desc: 'Property management of a logistics hub in southwestern Seoul.',
    },
  },
  {
    slug: 'marine-park', cats: ['development'], featured: false, img: 'marine-park',
    map: { x: 380.4, y: 75.1, city: { ko: '양양', en: 'Yangyang' } },
    ko: {
      name: '양양 해양공원', location: '강원 양양군 광진리',
      scale: '관광·레저 개발', area: '대지 약 5.5만 평', completed: '인허가 진행중',
      desc: '동해안 광진리 일원의 해양 관광 인프라를 조성하는 지역 개발 프로젝트입니다.',
    },
    en: {
      name: 'Yangyang Marine Park', location: 'Gwangjin-ri, Yangyang-gun, Gangwon',
      scale: 'Tourism & leisure', area: 'Site ca. 182,000m²', completed: 'Permitting in progress',
      desc: 'A regional development project creating marine tourism infrastructure on the East Coast.',
    },
  },
  {
    slug: 'yangyang-hotel', cats: ['development'], featured: false, img: 'yangyang-hotel',
    map: { x: 380.4, y: 75.1, city: { ko: '양양', en: 'Yangyang' } },
    ko: {
      name: '양양 부띠끄 호텔', location: '강원 양양군 남애리',
      scale: '지하 1층 · 지상 5층', area: '대지 772평 · 연면적 2,795평', completed: '사업계획 중',
      desc: '남애항 인근의 부띠끄 호텔 개발 프로젝트로 동해안 관광 벨트를 완성합니다.',
    },
    en: {
      name: 'Yangyang Boutique Hotel', location: 'Namae-ri, Yangyang-gun, Gangwon',
      scale: 'B1 – 5F', area: 'Site 2,550m² · GFA 9,240m²', completed: 'Business planning',
      desc: 'A boutique hotel development near Namae Port on the East Coast tourism belt.',
    },
  },
  {
    slug: 'east-coast', cats: ['development'], featured: false, img: 'east-coast',
    map: { x: 415.2, y: 125.9, city: { ko: '동해안', en: 'East Coast' } },
    ko: {
      name: '동해안 지역개발', location: '강원 동해안 일대',
      scale: '광역 지역개발', area: '대지 약 56만 평', completed: '사업계획 중',
      desc: '동해안 일대의 관광·레저·주거를 아우르는 광역 지역개발 프로젝트입니다.',
    },
    en: {
      name: 'East Coast Regional Development', location: 'East Coast, Gangwon',
      scale: 'Regional development', area: 'Site ca. 1.85M m²', completed: 'Business planning',
      desc: 'A wide-area development project spanning tourism, leisure and residential uses along the East Coast.',
    },
  },
  {
    slug: 'h-village', cats: ['development'], featured: false, img: 'h-village',
    map: { x: 298.1, y: 192.5, city: { ko: '음성', en: 'Eumseong' } },
    ko: {
      name: 'H-Village', location: '충북 음성군 생극면',
      scale: '복합 개발', area: '대지 약 30만 평', completed: '사업계획 중',
      desc: '레인보우힐스CC 일원의 유휴부지를 활용한 관광·레저·주거 복합 개발 프로젝트입니다.',
    },
    en: {
      name: 'H-Village', location: 'Saenggeuk-myeon, Eumseong-gun, Chungbuk',
      scale: 'Mixed-use development', area: 'Site ca. 990,000m²', completed: 'Business planning',
      desc: 'A mixed-use development leveraging idle land around Rainbow Hills CC.',
    },
  },
  {
    slug: 'sangwoo-complex', cats: ['development'], featured: false, img: 'sangwoo-complex',
    map: { x: 298.1, y: 192.5, city: { ko: '음성', en: 'Eumseong' } },
    ko: {
      name: '상우 산업단지', location: '충북 음성군 상우리',
      scale: '산업단지 조성', area: '대지 약 13.2만 평', completed: "공사 중 ('25년 7월 준공 예정)",
      desc: '음성 상우리 일원의 산업단지 조성 계획으로, 첨단 제조·물류 기반의 산업 거점을 설계합니다.',
    },
    en: {
      name: 'Sangwoo Industrial Complex', location: 'Sangwoo-ri, Eumseong-gun, Chungbuk',
      scale: 'Industrial complex', area: 'Site ca. 436,000m²', completed: 'Under construction (completion July 2025)',
      desc: 'An industrial complex plan in Eumseong designed as a hub for advanced manufacturing and logistics.',
    },
  },
  {
    slug: 'eumseong-district', cats: ['development'], featured: false, img: 'eumseong-district',
    map: { x: 298.1, y: 192.5, city: { ko: '음성', en: 'Eumseong' } },
    ko: {
      name: '음성 미래기술문화특구', location: '충북 음성군 생극면',
      scale: '특구 계획', area: '대지 약 105만 평', completed: '사업계획 중',
      desc: '산업과 관광·레저가 어우러진 미래형 특구를 음성군과 함께 계획하고 있습니다.',
    },
    en: {
      name: 'Eumseong Future Tech & Culture District', location: 'Saenggeuk-myeon, Eumseong-gun',
      scale: 'Special district plan', area: 'Site ca. 3.47M m²', completed: 'Business planning',
      desc: 'A future-oriented district combining industry, tourism and leisure, planned with Eumseong-gun.',
    },
  },
  {
    slug: 'samcheok-complex', cats: ['consulting'], featured: false, img: 'samcheok-complex',
    map: { x: 429.8, y: 146.2, city: { ko: '삼척', en: 'Samcheok' } },
    ko: {
      name: '삼척 복합시설', location: '강원 삼척시',
      scale: '지하 5층 · 지상 35층', area: '대지 약 27만 평', completed: '마스터플랜 수립 중',
      desc: '삼척 일원 복합시설의 사업계획 및 마스터플랜을 수립하고 있습니다.',
    },
    en: {
      name: 'Samcheok Mixed-use Complex', location: 'Samcheok, Gangwon',
      scale: 'B5 – 35F', area: 'Site ca. 890,000m²', completed: 'Master planning',
      desc: 'Business planning and master planning for a mixed-use complex in Samcheok.',
    },
  },
  {
    slug: 'oryu-mixeduse', cats: ['consulting'], featured: false, img: 'oryu-mixeduse',
    map: { x: 230.5, y: 133.8, city: { ko: '서울', en: 'Seoul' } },
    ko: {
      name: '오류동 복합시설', location: '서울 구로구 오류동',
      scale: '지하 6층 · 지상 35층', area: '대지 29,398평', completed: '사업계획·타당성 검토 완료',
      desc: '오류동 일원 복합시설의 사업계획 수립과 사업타당성 검토를 수행했습니다.',
    },
    en: {
      name: 'Oryu-dong Mixed-use Complex', location: 'Oryu-dong, Guro-gu, Seoul',
      scale: 'B6 – 35F', area: 'Site 97,200m²', completed: 'Feasibility completed',
      desc: 'Business planning and feasibility study for a mixed-use complex in Oryu-dong.',
    },
  },
  {
    slug: 'incheon-hakik', cats: ['consulting'], featured: false, img: 'incheon-hakik',
    map: { x: 204.8, y: 145.1, city: { ko: '인천', en: 'Incheon' } },
    ko: {
      name: '인천 학익동 임대주택', location: '인천 미추홀구 학익동',
      scale: '지하 3층 · 지상 30층', area: '대지 11,988평', completed: '사업계획·타당성 검토 진행 중',
      desc: '학익동 임대주택 사업의 사업계획 수립과 사업타당성 검토를 진행하고 있습니다.',
    },
    en: {
      name: 'Incheon Hagik-dong Rental Housing', location: 'Hagik-dong, Michuhol-gu, Incheon',
      scale: 'B3 – 30F', area: 'Site 39,600m²', completed: 'In progress',
      desc: 'Business planning and feasibility study for a rental housing project in Hagik-dong, Incheon.',
    },
  },
];
