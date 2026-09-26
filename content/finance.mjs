/**
 * 재무정보 데이터 (투자정보 › 재무정보)
 *
 * 출처: 각 사업연도 감사보고서 (단위: 원 → 백만원 반올림)
 *   - 제37기(2025): 이촌회계법인 감사, 2026.03.12 감사보고서 — 적정의견
 *   - 제36기(2024): 신한회계법인 감사, 2025.02.28 감사보고서 — 적정의견
 *   - 제35기(2023): K-IFRS 전환에 따라 제36기 감사보고서에 비교 표시된 재무제표 기준
 *     (제35기 원 감사보고서는 일반기업회계기준이라 비교 가능성을 위해 K-IFRS 수치 사용)
 *
 * v 배열 순서는 years 와 동일 (최신 → 과거). null 은 해당 없음('-') 표시.
 */
export const finance = {
  ready: true,
  asOf: { ko: '', en: '' },
  unit: { ko: '단위 : 백만원', en: 'Unit: KRW in millions' },
  years: [
    { label: '제 37 기', year: '2025' },
    { label: '제 36 기', year: '2024' },
    { label: '제 35 기', year: '2023' },
  ],

  // 차트용 핵심 지표
  bsKey: [
    { ko: '자산총계', en: 'Total Assets', v: [554181, 341703, 276559] },
    { ko: '부채총계', en: 'Total Liabilities', v: [219085, 47253, 77206] },
    { ko: '자본총계', en: 'Total Equity', v: [335096, 294450, 199353] },
  ],
  isKey: [
    { ko: '매출액', en: 'Revenue', v: [105729, 19945, 24563] },
    { ko: '영업이익', en: 'Operating Profit', v: [632, 2934, 7756] },
    { ko: '당기순이익(손실)', en: 'Net Profit (Loss)', v: [-8429, 1650, 5028] },
  ],

  // 재무상태표
  bs: [
    {
      group: { ko: '자산', en: 'Assets' },
      rows: [
        { ko: 'Ⅰ. 유동자산', en: 'Ⅰ. Current Assets', v: [116861, 97051, 33257] },
        { ko: 'Ⅱ. 비유동자산', en: 'Ⅱ. Non-current Assets', v: [437320, 244652, 243302] },
        { ko: 'Ⅲ. 자산총계', en: 'Ⅲ. Total Assets', v: [554181, 341703, 276559], strong: true },
      ],
    },
    {
      group: { ko: '부채', en: 'Liabilities' },
      rows: [
        { ko: 'Ⅰ. 유동부채', en: 'Ⅰ. Current Liabilities', v: [188831, 34796, 64934] },
        { ko: 'Ⅱ. 비유동부채', en: 'Ⅱ. Non-current Liabilities', v: [30255, 12457, 12272] },
        { ko: 'Ⅲ. 부채총계', en: 'Ⅲ. Total Liabilities', v: [219085, 47253, 77206], strong: true },
      ],
    },
    {
      group: { ko: '자본', en: 'Equity' },
      rows: [
        { ko: 'Ⅰ. 자본금', en: 'Ⅰ. Share Capital', v: [311990, 255367, 161454] },
        { ko: 'Ⅱ. 자본잉여금', en: 'Ⅱ. Capital Surplus', v: [-1944, -465, null] },
        { ko: 'Ⅲ. 기타자본구성요소', en: 'Ⅲ. Other Components of Equity', v: [-7068, null, null] },
        { ko: 'Ⅳ. 이익잉여금', en: 'Ⅳ. Retained Earnings', v: [32118, 39549, 37899] },
        { ko: 'Ⅴ. 자본총계', en: 'Ⅴ. Total Equity', v: [335096, 294450, 199353], strong: true },
      ],
    },
    {
      group: { ko: '부채와 자본 총계', en: 'Total Liabilities and Equity' },
      rows: [{ ko: '', en: '', v: [554181, 341703, 276559] }],
    },
  ],

  // 손익계산서
  is: [
    { ko: '매출액', en: 'Revenue', v: [105729, 19945, 24563] },
    { ko: '매출원가', en: 'Cost of Sales', v: [89663, 5901, 5351] },
    { ko: '매출총이익', en: 'Gross Profit', v: [16066, 14045, 19212] },
    { ko: '판매비와관리비', en: 'SG&A Expenses', v: [15434, 11111, 11456] },
    { ko: '영업이익', en: 'Operating Profit', v: [632, 2934, 7756], strong: true },
    { ko: '금융수익', en: 'Finance Income', v: [2659, 1080, 1031] },
    { ko: '금융비용', en: 'Finance Costs', v: [6186, 1967, 2679] },
    { ko: '기타영업외수익', en: 'Other Non-operating Income', v: [2741, 83, 13] },
    { ko: '기타영업외비용', en: 'Other Non-operating Expenses', v: [11555, 30, 100] },
    { ko: '법인세비용차감전순이익(손실)', en: 'Profit (Loss) before Income Tax', v: [-11708, 2100, 6022] },
    { ko: '법인세비용(수익)', en: 'Income Tax Expense (Benefit)', v: [-3280, 450, 994] },
    { ko: '당기순이익(손실)', en: 'Profit (Loss) for the Year', v: [-8429, 1650, 5028], strong: true },
  ],

  // 각주
  notes: {
    ko: [
      '한국채택국제회계기준(K-IFRS)에 따른 별도재무제표 기준이며, 각 사업연도 감사보고서(제37기 이촌회계법인, 제36기 신한회계법인 · 감사의견 적정)를 기초로 작성하였습니다.',
      '제35기(2023)는 K-IFRS 전환에 따라 제36기 감사보고서에 비교 표시된 재무제표 기준입니다.',
      '제37기(2025)에는 2025년 7월 1일 (주)디비메탈, 2025년 10월 1일 (주)디비월드건설 흡수합병의 효과가 반영되어 있습니다.',
      '백만원 미만 반올림에 따라 항목의 합계가 총계와 일치하지 않을 수 있습니다.',
    ],
    en: [
      'Prepared on a separate financial statement basis under Korean IFRS (K-IFRS), based on the audit reports for each fiscal year (unqualified audit opinions).',
      'FY2023 figures are based on the comparative financial statements restated under K-IFRS as presented in the FY2024 audit report.',
      'FY2025 reflects the mergers of DB Metal Co., Ltd. (July 1, 2025) and DB World E&C Co., Ltd. (October 1, 2025).',
      'Figures are rounded to the nearest million KRW; components may not add up to totals.',
    ],
  },
};
