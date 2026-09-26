/**
 * DB광고 페이지 데이터
 * — youtube 필드에 유튜브 링크(youtu.be/..., watch?v=..., ID만 등 아무 형식)를 넣으면 자동 표시됩니다.
 * — featured: 상단 대표 캠페인(왼쪽 설명 + 오른쪽 큰 영상) / items: 아래 영상 그리드
 */
export const ads = {
  channelUrl: 'https://www.youtube.com/@DB_Story',
  featured: {
    ko: {
      title: '꿈이 미래를 만듭니다',
      body: [
        'DB그룹 광고는 브랜드 자산인 "꿈"이라는 가치를 기반으로 고객과의 관계를 강화하는 캠페인을 전개하고 있습니다.',
        'DB가 나아가고자 하는 미래와 고객의 모습을 동일시하여 창의·도전·소통·변화의 키워드로 젊고 새로운 브랜드 이미지를 만들어 갑니다.',
      ],
    },
    en: {
      title: 'Dreams Build the Future',
      body: [
        'DB Group’s brand campaigns build on the core value of "dream" to strengthen our relationship with customers.',
        'By aligning DB’s future with the lives of our customers, the campaigns convey creativity, challenge, communication and change.',
      ],
    },
    youtube: 'https://youtu.be/PapNax6h2zM',
  },
  items: [
    { title: { ko: '', en: '' }, youtube: 'https://youtu.be/LuM_2hDG0do' },
    { title: { ko: '', en: '' }, youtube: 'https://youtu.be/j0Pw5bN8FP0' },
    { title: { ko: '', en: '' }, youtube: 'https://www.youtube.com/watch?v=bOYrDrYQk1o' },
    { title: { ko: '', en: '' }, youtube: 'https://www.youtube.com/watch?v=Ao_x4J2y5s0' },
    { title: { ko: '', en: '' }, youtube: 'https://www.youtube.com/watch?v=VAFuoDi_Glg' },
    { title: { ko: '', en: '' }, youtube: 'https://www.youtube.com/watch?v=6Xc4EHrwLnY' },
  ],
};
