/**
 * 페이지 문안 사전 (ko / en)
 * — 문구 수정은 이 파일에서만 하면 됩니다. 구조(키)는 양 언어가 동일해야 합니다.
 */
export const copy = {
  /* ================================================================== */
  ko: {
    langName: '한국어', langSwitch: 'EN', langSwitchTitle: 'English',
    nav: {
      about: '회사소개', business: '사업영역', projects: '사업실적', news: '홍보센터', contact: '문의',
      aboutItems: [
        ['ceo', 'CEO 인사말'], ['overview', '기업정보'], ['vision', '미션·비전'],
        ['group', 'DB그룹 소개'], ['location', '오시는 길'],
      ],
      businessItems: [
        ['development', '부동산 개발'], ['pm', '부동산 Total Service'], ['consulting', '부동산 컨설팅'],
        ['golf', '골프장 운영'],
      ],
      esg: 'ESG',
      esgMenu: [['esg/policy/', 'ESG정책'], ['esg/ethics/', '윤리경영']],
      newsCats: [['all', '전체'], ['notice', '공지사항'], ['news', '뉴스·보도']],
      newsMenu: [['news/', '공지사항'], ['news/ads/', 'DB광고'], ['about/ci/', 'CI']],
    },
    common: {
      more: '자세히 보기', list: '목록', prev: '이전', next: '다음', date: '작성일', category: '분류',
      search: '검색', searchPlaceholder: '제목 검색', noResult: '게시글이 없습니다.',
      related: '관련 프로젝트', backTop: '맨 위로', scroll: 'SCROLL',
      breadcrumbHome: '홈', familySites: '패밀리 사이트', copyright: `© ${new Date().getFullYear()} DB WORLD Co., Ltd. All rights reserved.`,
      address: '주소', tel: '대표전화', fax: '팩스',
    },
    home: {
      title: 'DB월드 | 종합부동산서비스 전문기업',
      desc: '부동산 개발·PM·CM·컨설팅과 레인보우힐스CC 운영까지, 부동산의 전 생애주기를 아우르는 DB그룹의 종합부동산서비스 전문기업 DB월드입니다.',
      hero: [
        {
          eyebrow: 'REAL ESTATE TOTAL SERVICE',
          title: '부동산의 가치와\n고객의 자산을 새롭게 창조합니다',
          sub: '시행에서 설계·시공·관리·운영까지, 부동산 전 생애주기를 아우르는 종합부동산서비스 전문기업',
          img: 'dbfc-sky', link: ['business/', '사업영역 보기'],
        },
        {
          eyebrow: 'DEVELOPMENT · CM',
          title: '부동산 Life Cycle\n전 과정을 수행합니다',
          sub: '사업계획과 인허가부터 시공관리, 준공 후 자산관리까지 — DB손해보험 부산사옥 프로젝트가 진행 중입니다',
          img: 'busan-hq', link: ['business/development/', '부동산 개발 보기'],
        },
      ],
      areasTitle: '사업영역',
      areasSub: '부동산 개발부터 운영까지, 전 생애주기를 관리합니다',
      stats: [
        ['1989', '', '창립'],
        ['27', '홀', '레인보우힐스CC'],
        ['659,708', '평', '골프장 부지'],
        ['17,248', '평', 'DB금융센터 연면적'],
      ],
      projectsTitle: '주요 프로젝트',
      projectsSub: '전국 곳곳에서 공간의 가치를 만들어 갑니다',
      newsTitle: '홍보센터',
      newsSub: 'DB월드의 새로운 소식을 전해드립니다',
      groupBanner: {
        title: 'DB그룹과 함께합니다',
        sub: '금융에서 반도체, 부동산까지 — 신뢰의 DB그룹 계열사 DB월드',
        link: 'DB그룹 바로가기',
      },
    },
    about: {
      pageTitle: '회사소개',
      ceo: {
        title: 'CEO 인사말', docTitle: 'CEO 인사말 | DB월드',
        headline: '고객의 신뢰를 바탕으로\n부동산의 새로운 가치를 만들어 갑니다.',
        body: [
          'DB월드 홈페이지를 찾아주신 여러분께 진심으로 감사드립니다.',
          'DB월드는 1969년 미륭건설에서 출발해 동부건설과 DB Inc. 부동산 부문으로 이어져 온 반세기 부동산 전문가 그룹의 전통 위에 서 있는 DB그룹의 종합부동산서비스 전문기업입니다. 부동산 개발과 자산관리(PM), 건설사업관리(CM), 컨설팅에서 골프장 운영에 이르기까지, 부동산의 전 생애주기에 걸친 토털 서비스를 제공하고 있습니다.',
          '2025년에는 DB월드건설을 합병하여 시행·설계·시공·관리·운영을 아우르는 명실상부한 종합부동산회사의 체제를 갖추었습니다. 서울 강남의 DB금융센터를 비롯한 프라임 자산의 운영 경험, 그리고 "한국의 페블비치"로 불리는 레인보우힐스CC의 성공적 운영은 DB월드가 쌓아온 신뢰의 증거입니다.',
          '부동산은 단순한 건축물이 아니라 사람과 도시의 삶을 담는 그릇입니다. DB월드는 축적된 전문성과 DB그룹의 탄탄한 신뢰를 바탕으로, 고객의 소중한 자산에 새로운 가치를 더하고 지역과 함께 성장하는 기업이 되겠습니다.',
          '앞으로도 변함없는 관심과 성원을 부탁드립니다. 감사합니다.',
        ],
        sign: 'DB월드 대표이사', signName: '윤 순 균',
      },
      overview: {
        title: '기업정보', docTitle: '기업정보 | DB월드',
        headTop: '부동산의 가치와\n고객의 자산을 새롭게 창조하는',
        headAccent: '종합부동산서비스 전문기업,',
        headName: 'DB월드',
        paras: [
          'DB월드는 부동산 개발, 부동산 자산관리(임대, 운영, 매매), 컨설팅, 골프장 운영 등 부동산 전 영역을 아우르는 다양한 사업을 전개하고 있습니다.',
          '특히, 부동산부문은 1969년 미륭건설(1989년 이후 동부건설)부터, DB Inc 부동산 부문을 거쳐오면서 최고의 부동산 전문가 집단으로 자리매김하고 있습니다.',
          'DB월드는 부동산 분야의 신성장 비즈니스 모델을 개발하여 세계적인 부동산기업으로 도약하고 있습니다.',
        ],
        factsTitle: '일반현황',
        facts: [
          ['회사명', '㈜디비월드'],
          ['설립일', '1989년 7월 14일'],
          ['대표이사', '윤순균 사장'],
          ['임직원 수', '40명'],
          ['자본금', '2,554억원 (2024년 기준)'],
        ],
        bizTitle: '주요사업',
        bizNodes: [
          { name: '부동산개발', subs: ['개발기획', '개발대행', '도시계획'] },
          { name: '부동산 자산관리', subs: ['오피스, 물류 등', '부동산 자산관리'] },
          { name: '부동산컨설팅', subs: [] },
          { name: '골프장\n개발 & 운영', subs: [] },
        ],
      },
      vision: {
        title: '미션·비전', docTitle: '미션·비전 | DB월드',
        missionLabel: 'Mission', mission: '부동산의 가치와 고객의 자산을\n새롭게 창조합니다',
        missionSub: 'We create new value for real estate and customer assets.',
        visionLabel: 'Vision', vision: '부동산 전 생애주기를 아우르는\n종합부동산서비스 리더',
        visionSub: 'Total Real Estate Service Leader — Development · CM · PM · Operation',
        valuesLabel: 'Core Values',
        values: [
          ['신뢰', 'Trust', '고객과의 약속을 지키는 정직한 기업, 반세기 부동산 전문가 그룹의 자부심으로 신뢰를 쌓아 갑니다.'],
          ['전문성', 'Expertise', '개발·시공·관리·운영 전 영역의 축적된 경험과 데이터로 최적의 솔루션을 제시합니다.'],
          ['혁신', 'Innovation', '변화하는 공간의 트렌드를 앞서 읽고, 부동산의 새로운 가능성에 도전합니다.'],
          ['상생', 'Partnership', 'DB그룹과 지역사회, 고객과 함께 성장하는 지속가능한 미래를 만들어 갑니다.'],
        ],
      },
      history: {
        title: '연혁', docTitle: '연혁 | DB월드',
        intro: '1989년 창립 이후, DB월드는 부동산 개발과 운영의 외길을 걸으며 종합부동산서비스 기업으로 성장해 왔습니다.',
        eras: [
          {
            era: '2025 — 현재', label: '종합부동산회사로의 도약',
            items: [
              ['2026. 04', '제1회 KLPGA DB 위민스 챔피언십 개최 (레인보우힐스CC)'],
              ['2025. 12', '순천향대학교·국립강릉원주대학교와 시니어 사업 산학협력 MOU 체결'],
              ['2025. 10', '디비월드건설 흡수합병 — 시행·설계·시공·관리·운영 체제 완성'],
              ['2025. 09', '레인보우힐스 드림챌린지 개최 (개장 후 첫 아마추어 대회)'],
              ['2025. 07', 'DB메탈 흡수합병 — 합금철 소재사업 부문 신설'],
            ],
          },
          {
            era: '2015 — 2024', label: 'DB월드의 새 출발',
            items: [
              ['2021. 06', 'DB그룹 한국여자오픈 개최 (2021~2025, 레인보우힐스CC)'],
              ['2019. 03', '주식회사 디비월드로 사명 변경'],
              ['2015. 03', '레인보우힐스CC 대중제 전환'],
            ],
          },
          {
            era: '1989 — 2014', label: '창립과 성장',
            items: [
              ['2008. 03', '레인보우힐스 컨트리클럽 개장 (27홀, 로버트 트렌트 존스 Jr. 설계)'],
              ['2007. 09', '레인보우힐스CC 골프장업 등록'],
              ['2002. 01', '주식회사 동부월드로 사명 변경 (동부그룹 계열 편입)'],
              ['1989. 07', '원림개발 주식회사 설립'],
            ],
          },
        ],
        rootsTitle: '부동산 전문가 그룹의 뿌리',
        roots: 'DB월드의 부동산 사업 역량은 1969년 미륭건설(이후 동부건설)에서 시작되어 DB Inc. 부동산 부문으로 이어져 온 반세기 전통에 뿌리를 두고 있습니다.',
      },
      ci: {
        title: 'CI 소개', docTitle: 'CI 소개 | DB월드',
        intro: 'DB월드는 DB그룹의 CI 체계를 따릅니다. DB 심볼은 신뢰(Green)·열정(Red)·미래(Blue)의 가치를 세 가지 컬러의 조화로 표현합니다.',
        symbolTitle: '심볼마크',
        symbolHeadline: 'DB그룹을 대표하는 시각적 상징이자,\n모든 커뮤니케이션 활동의 중심이 되는 요소입니다.',
        symbolBody: [
          "'DB'라는 문자를 도형으로 형상화한 것으로, '동부'의 전통과 정신을 시대에 맞게 창조적으로 발전시켰습니다.",
          "기존 CI의 오렌지색과 녹색으로 '동부'의 역사와 전통을 계승하고, '동쪽'과 '젊음'을 의미하는 청색으로 미래를 향한 의지와 희망을 표현합니다.",
        ],
        symbolMeanings: [
          ['태양', 'Sun', '#F15A22', '열정과 도전의 에너지'],
          ['물', 'Water', '#0588CB', '미래를 향한 의지와 희망'],
          ['생명', 'Life', '#4FB84F', '태양과 물이 만나 탄생하는 새로운 가치'],
        ],
        symbolNote: "'태양'(오렌지)과 '물'(청)이 만나 '생명'(녹)을 탄생시킨다는 의미를 담고 있습니다.",
        colorsTitle: '전용 색상',
        colors: [
          ['DB Green', '#00854A', 'Pantone 7732C · 주 색상 — 신뢰와 안정'],
          ['DB Red', '#F15A22', 'Pantone 166C · 열정과 도전'],
          ['DB Light Green', '#4FB84F', 'Pantone 362C · 성장과 상생'],
          ['DB Blue', '#0588CB', 'Pantone 2172C · 미래와 전문성'],
        ],
        usageTitle: '사용 원칙',
        usage: [
          '심볼마크와 로고타입은 임의로 변형할 수 없습니다.',
          '주 색상은 DB Green을 사용하며, 그라디언트는 지정된 비율로만 사용합니다.',
          '상세 규정은 DB그룹 CI 가이드라인을 따릅니다.',
        ],
        guideLink: 'DB그룹 CI 가이드 바로가기',
      },
      group: {
        title: 'DB그룹 소개', docTitle: 'DB그룹 소개 | DB월드',
        heroAlt: '글로벌 전문기업으로 큰 꿈을 향한 DB그룹의 도전 — Dream Big DB',
        sections: [
          {
            label: '1969', sublabel: 'DB의 시작',
            paras: [
              'DB는 1969년 1월 24일 자본금 2,500만원과 직원 2명으로 미륭건설(현 동부건설)을 설립하면서 출범했습니다.',
              '1970년대 초 선도적으로 중동 건설시장에 진출해 대대적인 성공을 거둠으로써 당시 오일쇼크로 위기에 처한 국가경제의 회복에 기여하였으며, 해외에서 거둔 외화수익금 전액을 철강, 소재, 농업, 물류, 금융 등 국가 기간산업에 투자하여 그룹 성장의 발판을 다졌습니다.',
              '전략적이고 계획적인 사업복합화의 결과 DB는 1990년 20대그룹에 진입하였으며, 2000년도에는 10대그룹으로 발전했습니다.(2000년 공정거래위원회 발표) 대한민국 1세대 그룹들보다 30~40년 뒤늦게 출발한 후발기업의 불리함을 극복하고 이루어낸 성과였습니다.',
            ],
          },
          {
            label: '끊임없는', sublabel: 'DB의 도전',
            paras: [
              'DB는 끊임없이 새로운 목표에 도전하며 새로운 길을 만들어 왔습니다.',
              '대부분의 계열사를 신규 면허를 취득하거나 신규 설립을 통해 발전시키고 하위품목에서 사업을 시작하여 상위품목으로 사업을 확장·발전시키는 성장 드라마를 만들어 냈습니다. 부실기업을 인수하여 대규모 투자와 경영합리화를 통해 우량기업으로 변화시켰습니다. 다른 대기업들이 관심을 기울이지 않던 합금철, 선재, 농약, 비료, 종자, 비메모리 반도체 파운드리, 첨단 유리온실, 친환경 전기로 제철 사업을 개척했습니다. 경영시스템의 선진화를 위해 끊임없이 혁신을 추진했으며, 모범적인 지배구조와 자율·책임 경영체제 구축에 힘써 왔습니다.',
              '이제 DB는 끊임없는 기업가정신과 혁신으로 새로운 미래를 향해 나아가고 있습니다.',
            ],
            closing: '최고의 글로벌 전문기업, 그 큰 꿈(Dream Big)을 향한 DB의 도전은 오늘도 계속됩니다.',
          },
        ],
        vmEyebrow: 'Vision & Mission',
        vmHeadline: '우리가 하는 사업이\n세계적으로 인류에 기여한다',
        vmSub: 'An Excellent Global Company',
        vision: {
          title: '비전',
          body: "'An Excellent Global Company'입니다. 이는 '우리가 하는 사업이 세계적으로 인류에 기여한다'는 의미를 담고 있습니다.",
        },
        mission: {
          title: '미션',
          body: "'기업가 정신과 혁신으로 DB그룹이 참여하는 모든 사업에서 글로벌 전문기업으로서 가장 높은 이익률과 성장률을 만들어 내고, 경영의 모든 면에서 지속해서 최고의 경쟁력을 갖춘 기업이 된다' 입니다.",
        },
        bizEyebrow: 'Dream Big',
        bizTitle: '주요사업내용',
        bizGroups: [
          {
            name: '보험그룹', img: 'biz-insurance',
            body: 'DB손해보험은 매출 20조, 총 자산 50조로 국내 손해보험업계를 대표하는 초우량 회사입니다. DB손해보험은 업계 최고 수준의 이익률과 보험영업효율의 위상을 바탕으로 고객과 함께 행복한 사회를 추구하는 글로벌 보험금융그룹으로 거듭나고 있습니다. DB생명은 1989년 출범하여 균형 있는 채널의 발전, 보장성 중심의 상품 판매, 안정적 자산운용을 기반으로 총자산 12.8조, 매출 2.4조의 회사로 성장하였습니다. 또한, 소비자 중심 경영을 적극 실천하여 소비자의 합리적인 선택을 돕는 착한 기업으로 자리매김하고 있습니다.',
          },
          {
            name: '금융그룹', img: 'biz-finance',
            body: "DB증권은 주식·채권·파생상품·자산관리 등 다양한 분야의 전문역량을 보유한 종합 금융투자회사로서, 최적의 금융 솔루션을 통해 '10위권 대형 금융투자회사'로 성장하고 있습니다. DB자산운용은 고객들의 소중한 자산을 안정적이고 투명하게 운영하고 있는 종합자산운용회사로 '국내 최고의 장기투자명가'를 지향하고 있습니다. DB저축은행은 1972년 설립 이래 저축은행 1세대로 유일하게 지속적으로 성장·발전하고 있는 대형저축은행이며 독일·스웨덴·태국 등 유럽과 아시아의 여러 저축은행과 협력관계를 구축, 세계 최고의 서민금융기관으로 성장하고 있습니다. DB캐피탈은 우수한 수익성과 건전성을 바탕으로 지속성장하고 있는 우량 여신전문금융회사입니다.",
          },
          {
            name: '제조서비스그룹', img: 'biz-mfg',
            body: 'DB하이텍은 세계 최고의 아날로그 반도체 기술력을 보유한 글로벌 특화파운드리 기업이며, DB글로벌칩은 세계 최고의 디스플레이 반도체 설계 전문기업을 목표로 나아가고 있습니다. DB Inc.는 국내 최고 수준의 전문 인력을 보유한 종합 IT서비스 전문기업입니다. DB월드는 부동산 개발, 부동산 자산관리(임대, 운영, 매매), 컨설팅, 골프장 운영 등 부동산 전 영역을 아우르는 종합부동산서비스 전문기업입니다. DB커뮤니케이션즈는 종합광고대행사로 광고를 시작으로 다양한 문화콘텐츠 사업에 진출하고자 합니다.',
          },
        ],
      },
      location: {
        title: '오시는 길', docTitle: '오시는 길 | DB월드',
        tabs: [
          {
            name: '본사 (DB금융센터)', addrLabel: '주소',
            addr: '서울특별시 강남구 테헤란로 432 (대치동, DB금융센터)',
            transit: [
              ['지하철', '2호선 선릉역 1번 출구 도보 10분'],
            ],
            mapQuery: '서울특별시 강남구 테헤란로 432',
          },
        ],
        mapBtnKakao: '카카오맵에서 보기', mapBtnNaver: '네이버지도에서 보기',
      },
    },
    business: {
      pageTitle: '사업영역', docTitle: '사업영역 | DB월드',
      introTitle: '부동산 전 생애주기를 아우르는\nTotal Service',
      introSub: '기획·개발에서 시공관리, 자산관리, 운영까지 — DB월드는 부동산 생애주기(Life Cycle) 전 과정을 수행하며 자산의 가치를 극대화합니다.',
      cycleTitle: 'Real Estate Life Cycle',
      cycleSteps: [
        ['PLAN · DEVELOP', '기획 · 개발', '입지 분석과 사업성 검토, 인허가, 시행까지 개발의 전 과정을 주도합니다.', 'development'],
        ['BUILD · CM', '건설사업관리', '설계·시공 단계의 품질과 원가, 공정을 통합 관리합니다.', 'development'],
        ['MANAGE · PM', '자산관리', '임대차·시설·재무를 아우르는 전문 PM으로 자산 가치를 높입니다.', 'pm'],
        ['OPERATE', '운영', '골프장 등 수익형 부동산을 직접 운영하며 공간의 경험을 완성합니다.', 'golf'],
      ],
      areas: {
        development: {
          name: '부동산 개발', en: 'Real Estate Development',
          slogan: 'Life Cycle 전 과정 수행',
          headline: 'Life Cycle 전 과정을 수행합니다',
          desc: '오피스·복합시설의 도심개발부터 관광·레저 지역개발, 산업단지 도시계획까지 — 입지 발굴과 사업성 분석, 인허가, 시행 전 과정을 수행합니다.',
          fieldsLabel: '분야', worksLabel: '실적',
          specLabels: ['위치', '면적', '진행'],
          tabs: [
            {
              name: '도심개발',
              head: ['주요 도심에 위치한 업무시설, 상업시설, 복합시설 등 ', '부동산 개발대행(Project Management)', ' 또는 직접개발'],
              note: '※ 개발대행 : 발주처를 대신해 기획, 설계, 시공 및 유지관리 등 일체의 개발행위 대행을 통해 성공적 사업 수행',
              fields: ['신축', '증축', '리모델링', '사업계획 컨설팅 등'],
              groups: [
                { name: '업무시설', items: [
                  { name: '동자 오피스Ⅱ', img: 'dev-dongja', slug: 'dongja-office', specs: ['서울 동자동', '연면적 43,000평 (지하 7층 ~ 지상 40층)', '인허가 진행중'] },
                  { name: '대치 금융센터', img: 'dev-dbfc', slug: 'db-financial-center', specs: ['서울 대치동', '연면적 17,248평 (지하 7층 ~ 지상 35층)', '2002년 준공'] },
                  { name: '부산 오피스', img: 'dev-busan', slug: 'busan-hq', specs: ['부산 부전동', '연면적 13,535평 (지하 8층 ~ 지상 24층)', "공사 중 ('26년 준공 예정)"] },
                ] },
                { name: '상업시설', items: [
                  { name: '신사 오피스 및 근생', img: 'dev-sinsa', slug: 'sinsa-office', specs: ['서울 신사동', '연면적 2,750평 (지하 3층 ~ 지상 4층)', '사업계획 중'] },
                ] },
                { name: '연수원', items: [
                  { name: '곤지암 연수원', img: 'dev-gonjiam', slug: 'gonjiam-center', specs: ['경기도 광주시', '연면적 4,600평 (지하 1층 ~ 지상 5층)', '1992년 준공 · 리모델링 사업계획 중'] },
                ] },
              ],
            },
            {
              name: '지역개발',
              head: ['양양 지역을 중심으로 리조트, 공원, 근생, 숙박시설 등 ', '부동산 개발대행(Project Management)', ' 또는 직접개발'],
              note: '※ 개발대행 : 발주처를 대신해 기획, 설계, 시공 및 유지관리 등 일체의 개발행위 대행을 통해 성공적 사업 수행',
              fields: ['공원개발', '대형 복합개발', '호텔 리모델링', '사업계획 컨설팅 등'],
              groups: [
                { name: '지역 복합개발', items: [
                  { name: '해양공원', img: 'dev-marinepark', slug: 'marine-park', specs: ['양양군 광진리', '대지면적 약 5.5만 평', '인허가 진행중'] },
                  { name: '동해안 지역개발', img: 'dev-donghae', slug: 'east-coast', specs: ['동해안 일대', '대지면적 약 56만 평', '사업계획 중'] },
                ] },
                { name: '단지개발계획', items: [
                  { name: 'H-Village', img: 'dev-hvillage', slug: 'h-village', specs: ['음성군 생극면', '대지면적 30만 평', '사업계획 중'] },
                ] },
                { name: '숙박시설', items: [
                  { name: '양양 부띠끄 호텔', img: 'dev-boutique', slug: 'yangyang-hotel', specs: ['양양군 남애리', '대지면적 772평 · 연면적 2,795평 (지하 1층 ~ 지상 5층)', '사업계획 중'] },
                ] },
              ],
            },
            {
              name: '도시계획',
              head: ['발주처를 대신해 ', '부동산 개발 도시계획 인허가 솔루션 서비스', '를 제공합니다'],
              note: '',
              fields: ['도시계획컨설팅', '도시정비사업', '개발행위허가', '지구단위계획수립 등'],
              fieldNotes: [
                ['도시계획컨설팅', '도시계획, 지구단위계획, 산업단지 등 토지규제와 연관된 인허가 서비스 제공'],
                ['도시정비사업', '재개발, 재건축 정비사업의 인허가를 위한 계획 수립 및 솔루션 제공'],
              ],
              groups: [
                { name: '산업단지', items: [
                  { name: '상우산업단지', img: 'dev-sangwoo', slug: 'sangwoo-complex', specs: ['음성군 상우리', '대지면적 13.2만 평', "공사 중 ('25년 7월 준공 예정)"] },
                ] },
                { name: '특구지정', items: [
                  { name: '음성 미래기술문화특구', img: 'dev-eumseong', slug: 'eumseong-district', specs: ['음성군 생극면', '대지면적 105만 평', '사업계획 중'] },
                ] },
              ],
            },
          ],
          projectFilter: 'development',
        },
        pm: {
          name: '부동산 Total Service', en: 'Real Estate Total Service',
          headline: '부동산에 대한 종합적인 서비스를 제공합니다',
          desc: '자산관리(PM), 임대차컨설팅(LM), 시설관리(FM)를 아우르는 통합 운영 체계로 자산의 가치를 높입니다.',
          fieldsLabel: '분야', worksLabel: '실적',
          specLabels: ['위치', '면적', '진행'],
          tabs: [
            {
              name: '부동산 Total Service',
              head: ['고객의 부동산 특성에 맞춰 ', '부동산에 대한 종합적인 서비스', '를 제공합니다'],
              note: '',
              fields: ['부동산 자산관리(PM)', '부동산 임대차컨설팅(LM)', '부동산 시설관리(FM)'],
              fieldNotes: [
                ['부동산 자산관리 (PM)', '소유자를 대리하여 전문가의 역량으로 부동산을 운영'],
                ['부동산 임대차컨설팅 (LM)', '부동산 특성에 맞는 임대/임차 영업 전략 및 솔루션 제공 (ex : 오피스, 리테일, 물류 등)'],
                ['부동산 시설관리 (FM)', '오피스, 골프장 등 다양한 건물의 에너지, 보안, 미화, 전기, 기계 등의 기술적 차원의 시설 운영'],
              ],
              groups: [
                { name: '업무시설', items: [
                  { name: '대치 금융센터', img: 'ts-daechi', slug: 'db-financial-center', specs: ['서울 대치동', '연면적 17,248평 (지하 7층 ~ 지상 35층)', '부동산 자산관리 (오피스 PM)'] },
                  { name: '동자 오피스Ⅰ', img: 'ts-dongja1', slug: 'dongja-office1', specs: ['서울 동자동', '연면적 13,535평 (지하 6층 ~ 지상 24층)', '부동산 자산관리 (오피스 PM)'] },
                ] },
                { name: '근생 외 + 주차장', items: [
                  { name: '분당 근생건물', img: 'ts-bundang', slug: 'bundang-retail', specs: ['분당구 서현동', '연면적 3,286평 (지상 5층)', '부동산 자산관리 (오피스 PM)'] },
                ] },
                { name: '물류센터', items: [
                  { name: '오류동 물류창고', img: 'ts-oryu', slug: 'oryu-logistics', specs: ['서울 오류동', '연면적 17,177평 (지상 1층)', '부동산 자산관리 (물류창고 PM)'] },
                ] },
                { name: '오피스', items: [
                  { name: '외부 오피스', img: 'ts-samseong', slug: 'samseong-office', specs: ['서울 삼성동', '연면적 4,522평 (지하 4층 ~ 지상 14층)', '부동산 임대차컨설팅 (오피스 임대/임차)'] },
                ] },
              ],
            },
          ],
        },
        consulting: {
          name: '부동산 컨설팅', en: 'Real Estate Consulting',
          headline: '분야별 전문가의 맞춤형 솔루션',
          desc: '부동산과 관련된 다양한 문제에 대하여 각 분야의 전문가가 맞춤형 솔루션을 제공합니다.',
          fieldsLabel: '분야', worksLabel: '실적',
          specLabels: ['위치', '면적', '진행'],
          tabs: [
            {
              name: '부동산 컨설팅',
              head: ['입지선정, 사업기획, 인허가, 설계, 시공, 엔지니어링 등 ', '분야별 자문과 매수, 매도, 운영', ''],
              note: '',
              fields: ['부동산 컨설팅', '사업계획 컨설팅'],
              groups: [
                { name: '업무시설', items: [
                  { name: '업무시설 사업계획 및 사업타당성 검토', img: 'con-busan', slug: 'busan-hq', specs: ['부산 서면', '연면적 13,535평 (지하 8층 ~ 지상 24층)', '완료'] },
                ] },
                { name: '복합개발사업', items: [
                  { name: '복합시설 사업계획 및 마스터플랜 수립', img: 'con-samcheok', slug: 'samcheok-complex', specs: ['강원도 삼척', '대지면적 약 270,000평 (지하 5층 ~ 지상 35층)', '진행중'] },
                  { name: '복합시설 사업계획 및 사업타당성 검토', img: 'con-oryu', slug: 'oryu-mixeduse', specs: ['서울 오류동', '대지면적 29,398평 (지하 6층 ~ 지상 35층)', '완료'] },
                  { name: '임대주택 사업계획 및 사업타당성 검토', img: 'con-hakik', slug: 'incheon-hakik', specs: ['인천 학익동', '대지면적 11,988평 (지하 3층 ~ 지상 30층)', '진행중'] },
                ] },
              ],
            },
          ],
        },
        golf: {
          name: '골프장 운영', en: 'Golf Course Operation',
          headline: '한국의 페블비치, 레인보우힐스CC',
          desc: '세계적 코스 설계가 로버트 트렌트 존스 주니어가 설계한 27홀 대중제 골프장 레인보우힐스CC를 소유·운영합니다. 자연 지형을 살린 코스와 사계절 아름다운 경관으로 "한국의 페블비치"라 불립니다.',
          facts: [
            ['위치', '충북 음성군 생극면 차생로 168'],
            ['규모', '27홀 (파 108) · 부지 659,708평'],
            ['개장', '2008년 3월 · 2015년 대중제 전환'],
            ['설계', 'Robert Trent Jones Jr.'],
          ],
          tournaments: 'DB그룹 한국여자오픈(2021~2025)에 이어 2026년부터 KLPGA 정규 대회 "DB 위민스 챔피언십"이 열리는 챔피언십 코스이며, 아마추어 대회 "레인보우힐스 드림챌린지"도 매년 개최합니다.',
          reserveBtn: '레인보우힐스CC 홈페이지 · 예약',
        },
      },
    },
    projects: {
      title: '사업실적', docTitle: '사업실적 | DB월드',
      intro: '전국 곳곳에서 DB월드가 만들어 온 공간들입니다.',
      filterAll: '전체',
      filters: [['development', '개발'], ['pm', 'PM'], ['consulting', '컨설팅'], ['golf', '골프장']],
      mapTitle: '프로젝트 맵',
      mapSub: '핀을 선택하면 해당 프로젝트로 이동합니다',
      specLabels: { location: '위치', scale: '규모', area: '면적', status: '진행 현황', completed: '준공', category: '분류' },
    },
    esg: {
      policy: {
        title: 'ESG정책', docTitle: 'ESG정책 | DB월드',
        intro: 'DB월드는 경제적 가치를 넘어 사회적·환경적 가치를 함께 만들어 가는 지속가능경영을 실천합니다.',
        items: [
          '이해관계자와 소통하며 경제적 가치와 더불어 사회적, 환경적 가치를 창출하고자 노력합니다',
          '자사 및 협력사 임직원들의 인권을 존중하며 인간으로서의 존엄과 가치를 수호합니다',
          '정직하고 공정한 자세로 기업윤리를 준수합니다',
          '환경, 안전, 보건에 대한 기업의 책임과 의무를 다하며 주기적인 검토를 통해 지속적인 개선활동을 추진합니다',
          '협력사 및 지역사회와 함께 상생하며 지속가능한 발전을 위해 사회적 책임을 다하고 있습니다',
        ],
      },
      ethics: {
        title: '윤리경영', docTitle: '윤리경영 | DB월드',
        intro: '모든 임직원이 함께 지켜 가는 DB월드의 윤리 실천 원칙입니다.',
        items: [
          ['공정거래', '하나, 우리는 윤리적 가치관에 입각하여 제반법규를 준수하며 부정거래를 하지 않는다.'],
          ['고객가치창조', '하나, 우리는 고객의 의견을 존중하며 고객가치를 창조하기 위해 항상 노력한다.'],
          ['사회공헌', '하나, 우리는 지속적인 사회공헌과 투명한 기업 경영을 통해 초일류 기업으로 성장한다.'],
          ['주주이익보호', '하나, 우리는 주주의 이익 보호와 기업가치 증대를 위해 최선을 다하여 주주에게 장기적, 안정적 이익을 제공한다.'],
          ['직원인격존중', '하나, 우리는 임직원 상호간 차별을 하지 않으며 개개인의 인격과 품위를 존중한다.'],
        ],
      },
    },
    news: {
      title: '홍보센터', docTitle: '홍보센터 | DB월드',
      intro: 'DB월드의 공지사항과 새로운 소식을 전해드립니다.',
      catNames: { notice: '공지사항', news: '뉴스·보도' },
      ads: {
        title: 'DB광고', docTitle: 'DB광고 | DB월드',
        intro: 'DB그룹과 DB월드의 브랜드 캠페인·광고 영상을 소개합니다.',
        empty: '광고 영상을 준비 중입니다. 등록되는 대로 이곳에서 보실 수 있습니다.',
      },
    },
    contact: {
      title: '문의', docTitle: '문의 | DB월드',
      intro: '궁금하신 사항은 아래 연락처로 문의해 주시기 바랍니다.',
      items: [
        ['본사', '서울특별시 강남구 테헤란로 432 (대치동, DB금융센터)'],
        ['대표전화', '02-3484-1906'],
        ['팩스', '02-3484-1919'],
        ['골프장 예약', 'www.rainbowhills.co.kr'],
      ],
      hoursTitle: '업무 시간', hours: '평일 09:00 – 18:00 (주말·공휴일 휴무)',
      locationBtn: '오시는 길 안내',
    },
    notFound: { title: '페이지를 찾을 수 없습니다', desc: '주소가 변경되었거나 삭제된 페이지입니다.', home: '메인으로 이동' },
  },

  /* ================================================================== */
  en: {
    langName: 'English', langSwitch: 'KO', langSwitchTitle: '한국어',
    nav: {
      about: 'About', business: 'Business', projects: 'Projects', news: 'Newsroom', contact: 'Contact',
      aboutItems: [
        ['ceo', 'CEO Message'], ['overview', 'Company Overview'], ['vision', 'Mission & Vision'],
        ['group', 'DB Group'], ['location', 'Location'],
      ],
      businessItems: [
        ['development', 'Development'], ['pm', 'Total Service'], ['consulting', 'Consulting'],
        ['golf', 'Golf Course'],
      ],
      esg: 'ESG',
      esgMenu: [['esg/policy/', 'ESG Policy'], ['esg/ethics/', 'Ethical Management']],
      newsCats: [['all', 'All'], ['notice', 'Notice'], ['news', 'News']],
      newsMenu: [['news/', 'Notice'], ['news/ads/', 'Advertising'], ['about/ci/', 'CI']],
    },
    common: {
      more: 'Learn more', list: 'List', prev: 'Prev', next: 'Next', date: 'Date', category: 'Category',
      search: 'Search', searchPlaceholder: 'Search titles', noResult: 'No posts found.',
      related: 'Related projects', backTop: 'Back to top', scroll: 'SCROLL',
      breadcrumbHome: 'Home', familySites: 'Family Sites', copyright: `© ${new Date().getFullYear()} DB WORLD Co., Ltd. All rights reserved.`,
      address: 'Address', tel: 'Tel', fax: 'Fax',
    },
    home: {
      title: 'DB World | Total Real Estate Service Company',
      desc: 'DB World, a member of DB Group, delivers total real estate services — development, PM, CM, consulting and the operation of Rainbow Hills Country Club.',
      hero: [
        {
          eyebrow: 'REAL ESTATE TOTAL SERVICE',
          title: 'Creating New Value\nfor Real Estate and Your Assets',
          sub: 'From development to design, construction, management and operation — we cover the entire life cycle of real estate.',
          img: 'dbfc-sky', link: ['business/', 'Explore our business'],
        },
        {
          eyebrow: 'DEVELOPMENT · CM',
          title: 'Covering the Full\nReal Estate Life Cycle',
          sub: 'From planning and permits to construction management and post-completion asset management — the DB Insurance Busan HQ project is underway.',
          img: 'busan-hq', link: ['business/development/', 'Real estate development'],
        },
      ],
      areasTitle: 'Our Business',
      areasSub: 'Managing the entire life cycle of real estate, from development to operation',
      stats: [
        ['1989', '', 'Founded'],
        ['27', 'holes', 'Rainbow Hills CC'],
        ['2.18M', 'm²', 'Golf course site'],
        ['57,000', 'm²', 'DB Financial Center GFA'],
      ],
      projectsTitle: 'Featured Projects',
      projectsSub: 'Creating value in spaces across Korea',
      newsTitle: 'Newsroom',
      newsSub: 'The latest updates from DB World',
      groupBanner: {
        title: 'Together with DB Group',
        sub: 'From finance and semiconductors to real estate — DB World is a trusted member of DB Group.',
        link: 'Visit DB Group',
      },
    },
    about: {
      pageTitle: 'About',
      ceo: {
        title: 'CEO Message', docTitle: 'CEO Message | DB World',
        headline: 'Building new value in real estate\non a foundation of trust.',
        body: [
          'Thank you for visiting DB World.',
          'DB World is the total real estate service company of DB Group, standing on a half-century heritage of real estate expertise that began with Miryung Construction in 1969 and continued through Dongbu Corporation and the real estate division of DB Inc. We provide services across the entire life cycle of real estate — development, property management, construction management, consulting, and the operation of a championship golf course.',
          'In 2025, through the merger of DB World E&C, we completed a fully integrated structure covering development, design, construction, management and operation. Our track record with prime assets such as the DB Financial Center in Gangnam, Seoul, and the successful operation of Rainbow Hills Country Club — often called the Pebble Beach of Korea — stand as proof of the trust we have earned.',
          'Real estate is more than buildings; it is the vessel that holds the lives of people and cities. With accumulated expertise and the solid trust of DB Group, DB World will continue to add new value to our clients’ assets and grow together with the communities we serve.',
          'We look forward to your continued interest and support. Thank you.',
        ],
        sign: 'CEO, DB World', signName: 'Yoon Soon-kyun',
      },
      overview: {
        title: 'Company Overview', docTitle: 'Company Overview | DB World',
        headTop: 'Creating new value for\nreal estate and customer assets',
        headAccent: 'A total real estate service company,',
        headName: 'DB World',
        paras: [
          'DB World conducts business across the entire spectrum of real estate \u2014 development, asset management (leasing, operation and sales), consulting and golf course operation.',
          'Our real estate expertise traces back to Miryung Construction in 1969 (Dongbu Corporation from 1989) and the real estate division of DB Inc., establishing us as a team of top real estate professionals.',
          'DB World is developing new growth business models in real estate and advancing toward becoming a world-class real estate company.',
        ],
        factsTitle: 'Corporate Profile',
        facts: [
          ['Company', 'DB World Co., Ltd.'],
          ['Founded', 'July 14, 1989'],
          ['CEO', 'President Yoon Soon-kyun'],
          ['Employees', '40'],
          ['Capital', 'KRW 255.4 billion (as of 2024)'],
        ],
        bizTitle: 'Our Business',
        bizNodes: [
          { name: 'Development', subs: ['Planning', 'Agency', 'Urban planning'] },
          { name: 'Asset Management', subs: ['Offices, logistics and', 'other properties'] },
          { name: 'Consulting', subs: [] },
          { name: 'Golf Course\nDev & Operation', subs: [] },
        ],
      },
      vision: {
        title: 'Mission & Vision', docTitle: 'Mission & Vision | DB World',
        missionLabel: 'Mission', mission: 'We create new value for\nreal estate and customer assets',
        missionSub: '부동산의 가치와 고객의 자산을 새롭게 창조합니다',
        visionLabel: 'Vision', vision: 'Total real estate service leader\nacross the full life cycle',
        visionSub: 'Development · CM · PM · Operation',
        valuesLabel: 'Core Values',
        values: [
          ['Trust', '신뢰', 'We keep our promises to clients, building on the pride of a half-century real estate heritage.'],
          ['Expertise', '전문성', 'Accumulated experience and data across development, construction, management and operation.'],
          ['Innovation', '혁신', 'Reading the trends of space ahead of the curve and challenging new possibilities.'],
          ['Partnership', '상생', 'Growing sustainably together with DB Group, our clients and local communities.'],
        ],
      },
      history: {
        title: 'History', docTitle: 'History | DB World',
        intro: 'Since its founding in 1989, DB World has grown into a total real estate service company.',
        eras: [
          {
            era: '2025 — Present', label: 'A Total Real Estate Company',
            items: [
              ['Apr 2026', '1st KLPGA DB Women’s Championship held at Rainbow Hills CC'],
              ['Dec 2025', 'Senior-care MOU signed with Soonchunhyang Univ. and Gangneung-Wonju National Univ.'],
              ['Oct 2025', 'Merger of DB World E&C — completing the development-to-operation structure'],
              ['Sep 2025', 'Rainbow Hills Dream Challenge, the club’s first amateur tournament'],
              ['Jul 2025', 'Merger of DB Metal — adding the ferroalloy materials business'],
            ],
          },
          {
            era: '2015 — 2024', label: 'A New Start as DB World',
            items: [
              ['Jun 2021', 'DB Group Korea Women’s Open held at Rainbow Hills CC (2021–2025)'],
              ['Mar 2019', 'Renamed DB World Co., Ltd.'],
              ['Mar 2015', 'Rainbow Hills CC converted to a public course'],
            ],
          },
          {
            era: '1989 — 2014', label: 'Foundation and Growth',
            items: [
              ['Mar 2008', 'Rainbow Hills Country Club opened (27 holes, designed by Robert Trent Jones Jr.)'],
              ['Sep 2007', 'Golf course business registration'],
              ['Jan 2002', 'Renamed Dongbu World Co., Ltd. (joined Dongbu Group)'],
              ['Jul 1989', 'Founded as Wonlim Development Co., Ltd.'],
            ],
          },
        ],
        rootsTitle: 'Roots of Our Expertise',
        roots: 'DB World’s real estate capabilities trace back to Miryung Construction (1969), which became Dongbu Corporation, and the real estate division of DB Inc. — a heritage of over half a century.',
      },
      ci: {
        title: 'Corporate Identity', docTitle: 'Corporate Identity | DB World',
        intro: 'DB World follows the corporate identity system of DB Group. The DB symbol expresses trust (green), passion (red) and the future (blue) in harmony.',
        symbolTitle: 'Symbol Mark',
        symbolHeadline: 'The visual emblem of DB Group and\nthe centerpiece of all its communications.',
        symbolBody: [
          "Shaped from the letters 'DB', the symbol creatively reinterprets the tradition and spirit of Dongbu for a new era.",
          "Orange and green carry on Dongbu's heritage, while blue \u2014 the color of 'east' and 'youth' \u2014 expresses hope and the will toward the future.",
        ],
        symbolMeanings: [
          ['Sun', '태양', '#F15A22', 'The energy of passion and challenge'],
          ['Water', '물', '#0588CB', 'Hope and the will toward the future'],
          ['Life', '생명', '#4FB84F', 'New value born where sun meets water'],
        ],
        symbolNote: "The sun (orange) meets water (blue) to give birth to life (green).",
        colorsTitle: 'Brand Colors',
        colors: [
          ['DB Green', '#00854A', 'Pantone 7732C · Primary — trust and stability'],
          ['DB Red', '#F15A22', 'Pantone 166C · Passion and challenge'],
          ['DB Light Green', '#4FB84F', 'Pantone 362C · Growth and partnership'],
          ['DB Blue', '#0588CB', 'Pantone 2172C · Future and expertise'],
        ],
        usageTitle: 'Usage Principles',
        usage: [
          'The symbol mark and logotype must not be modified.',
          'DB Green is the primary color; gradations are used only at specified ratios.',
          'Detailed rules follow the DB Group CI guidelines.',
        ],
        guideLink: 'DB Group CI Guidelines',
      },
      group: {
        title: 'DB Group', docTitle: 'DB Group | DB World',
        heroAlt: "DB Group's challenge toward a big dream as a global specialist \u2014 Dream Big DB",
        sections: [
          {
            label: '1969', sublabel: 'The Beginning of DB',
            paras: [
              'DB was founded on January 24, 1969, when Miryung Construction (now Dongbu Corporation) was established with capital of KRW 25 million and two employees.',
              "In the early 1970s, DB pioneered the Middle East construction market with great success, contributing to Korea's recovery from the oil crisis, and invested all of its overseas earnings in key national industries such as steel, materials, agriculture, logistics and finance \u2014 laying the foundation for the group's growth.",
              "Through strategic and planned diversification, DB entered Korea's top 20 business groups in 1990 and its top 10 in 2000 (Fair Trade Commission), overcoming the disadvantage of starting 30\u201340 years later than Korea's first-generation groups.",
            ],
          },
          {
            label: 'Relentless', sublabel: "DB's Challenge",
            paras: [
              'DB has constantly taken on new goals and created new paths.',
              'Most affiliates were developed through new licenses or greenfield foundings, growing from entry products into premium ones, and distressed companies were transformed into blue-chip businesses through bold investment and management rationalization. DB pioneered businesses others overlooked \u2014 ferroalloys, wire rods, crop protection, fertilizers, seeds, analog semiconductor foundry, advanced glass greenhouses and eco-friendly electric-arc steelmaking \u2014 while continuously innovating its management systems and building exemplary governance with autonomous, responsible management.',
              'Today, DB moves toward a new future with relentless entrepreneurship and innovation.',
            ],
            closing: "DB's challenge toward the big dream \u2014 Dream Big \u2014 to become a top global specialist continues today.",
          },
        ],
        vmEyebrow: 'Vision & Mission',
        vmHeadline: 'Our business contributes\nto humanity worldwide',
        vmSub: 'An Excellent Global Company',
        vision: {
          title: 'Vision',
          body: "'An Excellent Global Company' \u2014 meaning that our business contributes to humanity worldwide.",
        },
        mission: {
          title: 'Mission',
          body: "'With entrepreneurship and innovation, DB Group creates the highest profitability and growth as a global specialist in every business it enters, and remains the most competitive company in every aspect of management.'",
        },
        bizEyebrow: 'Dream Big',
        bizTitle: 'Our Businesses',
        bizGroups: [
          {
            name: 'Insurance Group', img: 'biz-insurance',
            body: "DB Insurance is Korea's leading general insurer, with KRW 20 trillion in revenue and KRW 50 trillion in total assets, growing into a global insurance financial group that pursues a happy society together with its customers on industry-best profitability and underwriting efficiency. DB Life, founded in 1989, has grown to KRW 12.8 trillion in assets and KRW 2.4 trillion in revenue on balanced channels, protection-focused products and stable asset management, and is recognized as a consumer-centered company.",
          },
          {
            name: 'Financial Group', img: 'biz-finance',
            body: "DB Securities is a full-service financial investment company with expertise across equities, bonds, derivatives and wealth management, growing into a top-10 investment firm. DB Asset Management is a comprehensive asset manager pursuing the position of Korea's premier long-term investment house. DB Savings Bank, founded in 1972, is the only first-generation savings bank to have grown continuously, building partnerships with savings banks across Europe and Asia. DB Capital is a sound specialty finance company growing on solid profitability.",
          },
          {
            name: 'Manufacturing & Service Group', img: 'biz-mfg',
            body: "DB HiTek is a global specialty foundry with world-class analog semiconductor technology, and DB GlobalChip aims to become the world's leading display-IC design house. DB Inc. is a total IT service company with Korea's finest specialists. DB World is a total real estate service company covering the entire spectrum of real estate \u2014 development, asset management (leasing, operation and sales), consulting and golf course operation. DB Communications is a full-service advertising agency expanding into cultural content.",
          },
        ],
      },
      location: {
        title: 'Location', docTitle: 'Location | DB World',
        tabs: [
          {
            name: 'Head Office (DB Financial Center)', addrLabel: 'Address',
            addr: 'DB Financial Center, 432 Teheran-ro, Gangnam-gu, Seoul',
            transit: [
              ['Subway', '10 min walk from Seolleung Stn. Exit 1 (Line 2)'],
            ],
            mapQuery: 'DB Financial Center Seoul',
          },
        ],
        mapBtnKakao: 'Open in Kakao Map', mapBtnNaver: 'Open in Naver Map',
      },
    },
    business: {
      pageTitle: 'Business', docTitle: 'Business | DB World',
      introTitle: 'Total Service across the\nReal Estate Life Cycle',
      introSub: 'From planning and development to construction management, asset management and operation — DB World maximizes asset value across the entire life cycle.',
      cycleTitle: 'Real Estate Life Cycle',
      cycleSteps: [
        ['PLAN · DEVELOP', 'Planning & Development', 'Site analysis, feasibility, permits and development execution.', 'development'],
        ['BUILD · CM', 'Construction Management', 'Integrated quality, cost and schedule management for design and construction.', 'development'],
        ['MANAGE · PM', 'Property Management', 'Leasing, facility and financial management that elevates asset value.', 'pm'],
        ['OPERATE', 'Operation', 'Direct operation of income-producing assets, including our golf course.', 'golf'],
      ],
      areas: {
        development: {
          name: 'Real Estate Development', en: 'Real Estate Development',
          slogan: 'Covering the Full Life Cycle',
          headline: 'Covering the full life cycle',
          desc: 'From prime office and mixed-use development in city centers to tourism and leisure projects and industrial complex planning — we handle the entire development process.',
          fieldsLabel: 'Fields', worksLabel: 'Track Record',
          specLabels: ['Location', 'Area', 'Status'],
          tabs: [
            {
              name: 'Urban Development',
              head: ['Office, retail and mixed-use projects in prime urban locations — as ', 'development agency (Project Management)', ' or direct development'],
              note: '※ Development agency: performing the full development process — planning, design, construction and maintenance — on behalf of the client.',
              fields: ['New construction', 'Extension', 'Remodeling', 'Business planning consulting'],
              groups: [
                { name: 'Office', items: [
                  { name: 'Dongja Office Ⅱ', img: 'dev-dongja', slug: 'dongja-office', specs: ['Dongja-dong, Seoul', 'GFA 142,000m² (B7 – 40F)', 'Permitting in progress'] },
                  { name: 'Daechi Financial Center', img: 'dev-dbfc', slug: 'db-financial-center', specs: ['Daechi-dong, Seoul', 'GFA 57,000m² (B7 – 35F)', 'Completed 2002'] },
                  { name: 'Busan Office', img: 'dev-busan', slug: 'busan-hq', specs: ['Bujeon-dong, Busan', 'GFA 44,700m² (B8 – 24F)', 'Under construction (completion 2026)'] },
                ] },
                { name: 'Retail', items: [
                  { name: 'Sinsa Office & Retail', img: 'dev-sinsa', slug: 'sinsa-office', specs: ['Sinsa-dong, Seoul', 'GFA 9,100m² (B3 – 4F)', 'Business planning'] },
                ] },
                { name: 'Training Center', items: [
                  { name: 'Gonjiam Training Center', img: 'dev-gonjiam', slug: 'gonjiam-center', specs: ['Gwangju, Gyeonggi', 'GFA 15,200m² (B1 – 5F)', 'Completed 1992 · remodeling planned'] },
                ] },
              ],
            },
            {
              name: 'Regional Development',
              head: ['Resorts, parks, retail and lodging centered on the Yangyang area — as ', 'development agency (Project Management)', ' or direct development'],
              note: '※ Development agency: performing the full development process — planning, design, construction and maintenance — on behalf of the client.',
              fields: ['Park development', 'Large mixed-use', 'Hotel remodeling', 'Business planning consulting'],
              groups: [
                { name: 'Regional Mixed-use', items: [
                  { name: 'Marine Park', img: 'dev-marinepark', slug: 'marine-park', specs: ['Gwangjin-ri, Yangyang', 'Site ca. 182,000m²', 'Permitting in progress'] },
                  { name: 'East Coast Regional Development', img: 'dev-donghae', slug: 'east-coast', specs: ['East Coast, Gangwon', 'Site ca. 1.85M m²', 'Business planning'] },
                ] },
                { name: 'Complex Development', items: [
                  { name: 'H-Village', img: 'dev-hvillage', slug: 'h-village', specs: ['Saenggeuk-myeon, Eumseong', 'Site ca. 990,000m²', 'Business planning'] },
                ] },
                { name: 'Lodging', items: [
                  { name: 'Yangyang Boutique Hotel', img: 'dev-boutique', slug: 'yangyang-hotel', specs: ['Namae-ri, Yangyang', 'Site 2,550m² · GFA 9,240m² (B1 – 5F)', 'Business planning'] },
                ] },
              ],
            },
            {
              name: 'Urban Planning',
              head: ['On behalf of clients, we provide ', 'permitting solution services for real estate development and urban planning', ''],
              note: '',
              fields: ['Urban planning consulting', 'Urban regeneration', 'Development permits', 'District unit planning'],
              fieldNotes: [
                ['Urban planning consulting', 'Permitting services related to land regulation — urban plans, district unit plans and industrial complexes'],
                ['Urban regeneration', 'Planning and solutions for redevelopment and reconstruction permits'],
              ],
              groups: [
                { name: 'Industrial Complex', items: [
                  { name: 'Sangwoo Industrial Complex', img: 'dev-sangwoo', slug: 'sangwoo-complex', specs: ['Sangwoo-ri, Eumseong', 'Site ca. 436,000m²', 'Under construction (completion July 2025)'] },
                ] },
                { name: 'Special District', items: [
                  { name: 'Eumseong Future Tech & Culture District', img: 'dev-eumseong', slug: 'eumseong-district', specs: ['Saenggeuk-myeon, Eumseong', 'Site ca. 3.47M m²', 'Business planning'] },
                ] },
              ],
            },
          ],
          projectFilter: 'development',
        },
        pm: {
          name: 'Real Estate Total Service', en: 'Real Estate Total Service',
          headline: 'Comprehensive real estate services',
          desc: 'An integrated framework of property management (PM), leasing management (LM) and facility management (FM) that elevates the value of your assets.',
          fieldsLabel: 'Fields', worksLabel: 'Track Record',
          specLabels: ['Location', 'Area', 'Status'],
          tabs: [
            {
              name: 'Real Estate Total Service',
              head: ['Comprehensive real estate services ', 'tailored to the characteristics of each property', ''],
              note: '',
              fields: ['Property Management (PM)', 'Leasing Management (LM)', 'Facility Management (FM)'],
              fieldNotes: [
                ['Property Management (PM)', 'Operating properties on behalf of owners with professional expertise'],
                ['Leasing Management (LM)', 'Leasing strategies and solutions tailored to each property — office, retail, logistics and more'],
                ['Facility Management (FM)', 'Technical operation of buildings — energy, security, cleaning, electrical and mechanical — for offices, golf courses and more'],
              ],
              groups: [
                { name: 'Office', items: [
                  { name: 'Daechi Financial Center', img: 'ts-daechi', slug: 'db-financial-center', specs: ['Daechi-dong, Seoul', 'GFA 57,000m² (B7 – 35F)', 'Property management (office PM)'] },
                  { name: 'Dongja Office Ⅰ', img: 'ts-dongja1', slug: 'dongja-office1', specs: ['Dongja-dong, Seoul', 'GFA 44,700m² (B6 – 24F)', 'Property management (office PM)'] },
                ] },
                { name: 'Retail & Parking', items: [
                  { name: 'Bundang Retail Building', img: 'ts-bundang', slug: 'bundang-retail', specs: ['Seohyeon-dong, Bundang', 'GFA 10,900m² (5F)', 'Property management (office PM)'] },
                ] },
                { name: 'Logistics', items: [
                  { name: 'Oryu-dong Logistics Center', img: 'ts-oryu', slug: 'oryu-logistics', specs: ['Oryu-dong, Seoul', 'GFA 56,800m² (1F)', 'Property management (logistics PM)'] },
                ] },
                { name: 'Office Leasing', items: [
                  { name: 'External Office', img: 'ts-samseong', slug: 'samseong-office', specs: ['Samseong-dong, Seoul', 'GFA 15,000m² (B4 – 14F)', 'Leasing consulting (office)'] },
                ] },
              ],
            },
          ],
        },
        consulting: {
          name: 'Real Estate Consulting', en: 'Real Estate Consulting',
          headline: 'Tailored solutions by specialists',
          desc: 'Specialists in each field provide tailored solutions for a wide range of real estate challenges.',
          fieldsLabel: 'Fields', worksLabel: 'Track Record',
          specLabels: ['Location', 'Area', 'Status'],
          tabs: [
            {
              name: 'Real Estate Consulting',
              head: ['Advisory across site selection, planning, permits, design, construction and engineering — plus ', 'acquisition, disposition and operation', ''],
              note: '',
              fields: ['Real estate consulting', 'Business planning consulting'],
              groups: [
                { name: 'Office', items: [
                  { name: 'Office Business Plan & Feasibility Study', img: 'con-busan', slug: 'busan-hq', specs: ['Seomyeon, Busan', 'GFA 44,700m² (B8 – 24F)', 'Completed'] },
                ] },
                { name: 'Mixed-use Development', items: [
                  { name: 'Mixed-use Business Plan & Master Plan', img: 'con-samcheok', slug: 'samcheok-complex', specs: ['Samcheok, Gangwon', 'Site ca. 890,000m² (B5 – 35F)', 'In progress'] },
                  { name: 'Mixed-use Business Plan & Feasibility Study', img: 'con-oryu', slug: 'oryu-mixeduse', specs: ['Oryu-dong, Seoul', 'Site 97,200m² (B6 – 35F)', 'Completed'] },
                  { name: 'Rental Housing Business Plan & Feasibility Study', img: 'con-hakik', slug: 'incheon-hakik', specs: ['Hagik-dong, Incheon', 'Site 39,600m² (B3 – 30F)', 'In progress'] },
                ] },
              ],
            },
          ],
        },
        golf: {
          name: 'Golf Course Operation', en: 'Golf Course Operation',
          headline: 'Rainbow Hills — the Pebble Beach of Korea',
          desc: 'We own and operate Rainbow Hills Country Club, a 27-hole public course designed by Robert Trent Jones Jr., renowned for its natural terrain and scenery in every season.',
          facts: [
            ['Location', '168 Chasaeng-ro, Saenggeuk-myeon, Eumseong-gun, Chungcheongbuk-do'],
            ['Scale', '27 holes (par 108) · 2.18M m² site'],
            ['Opened', 'March 2008 · public course since 2015'],
            ['Design', 'Robert Trent Jones Jr.'],
          ],
          tournaments: 'Host of the DB Group Korea Women’s Open (2021–2025) and, from 2026, the KLPGA DB Women’s Championship, as well as the annual Rainbow Hills Dream Challenge amateur tournament.',
          reserveBtn: 'Rainbow Hills CC — Booking',
        },
      },
    },
    projects: {
      title: 'Projects', docTitle: 'Projects | DB World',
      intro: 'Spaces DB World has created across Korea.',
      filterAll: 'All',
      filters: [['development', 'Development'], ['pm', 'PM'], ['consulting', 'Consulting'], ['golf', 'Golf']],
      mapTitle: 'Project Map',
      mapSub: 'Select a pin to jump to the project',
      specLabels: { location: 'Location', scale: 'Scale', area: 'Area', status: 'Status', completed: 'Completed', category: 'Category' },
    },
    esg: {
      policy: {
        title: 'ESG Policy', docTitle: 'ESG Policy | DB World',
        intro: 'DB World practices sustainable management that creates social and environmental value beyond economic value.',
        items: [
          'We communicate with stakeholders and strive to create social and environmental value alongside economic value.',
          'We respect the human rights of employees of the company and its partners, upholding human dignity and worth.',
          'We comply with corporate ethics with honesty and fairness.',
          'We fulfill our responsibilities for the environment, safety and health, and pursue continuous improvement through periodic reviews.',
          'We grow together with our partners and local communities, fulfilling our social responsibility for sustainable development.',
        ],
      },
      ethics: {
        title: 'Ethical Management', docTitle: 'Ethical Management | DB World',
        intro: 'The principles of ethical practice that every member of DB World upholds.',
        items: [
          ['Fair Trade', 'We comply with all laws and regulations based on ethical values and do not engage in unfair transactions.'],
          ['Customer Value', 'We respect the opinions of our customers and always strive to create customer value.'],
          ['Social Contribution', 'We grow into a world-class company through continuous social contribution and transparent management.'],
          ['Shareholder Value', 'We do our best to protect shareholder interests and increase corporate value, providing long-term, stable returns.'],
          ['Respect for People', 'We do not discriminate among employees and respect the character and dignity of each individual.'],
        ],
      },
    },
    news: {
      title: 'Newsroom', docTitle: 'Newsroom | DB World',
      intro: 'Notices and the latest news from DB World.',
      catNames: { notice: 'Notice', news: 'News' },
      ads: {
        title: 'Advertising', docTitle: 'Advertising | DB World',
        intro: 'Brand campaigns and commercials of DB Group and DB World.',
        empty: 'Advertising videos are being prepared and will appear here.',
      },
    },
    contact: {
      title: 'Contact', docTitle: 'Contact | DB World',
      intro: 'Please reach us through the contacts below.',
      items: [
        ['Head Office', 'DB Financial Center, 432 Teheran-ro, Gangnam-gu, Seoul'],
        ['Tel', '+82-2-3484-1906'],
        ['Fax', '+82-2-3484-1919'],
        ['Golf Booking', 'www.rainbowhills.co.kr'],
      ],
      hoursTitle: 'Office Hours', hours: 'Weekdays 09:00 – 18:00 (closed on weekends and holidays)',
      locationBtn: 'Directions',
    },
    notFound: { title: 'Page not found', desc: 'The page has been moved or no longer exists.', home: 'Go to Home' },
  },
};
