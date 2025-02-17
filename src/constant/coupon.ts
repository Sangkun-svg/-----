export interface Coupon {
  code: string;
  expiryDate: string | null; // null은 무기한인 경우
}

export const COUPONS: Coupon[] = [
  {
    code: "ForumVisitorTYSO",
    expiryDate: null,
  },
  {
    code: "おにや周年イベント",
    expiryDate: null,
  },
  {
    code: "KGCNovemberCoupon",
    expiryDate: null,
  },
  {
    code: "KGCLiveCollab2023",
    expiryDate: null,
  },
  {
    code: "JoinNowKgcGlobal",
    expiryDate: null,
  },
  {
    code: "EnjoyKingGodCollab",
    expiryDate: null,
  },
  {
    code: "KingGodGift23",
    expiryDate: null,
  },
  {
    code: "KGCPlayLive4",
    expiryDate: null,
  },
  {
    code: "KingGodCartoon22",
    expiryDate: null,
  },
  {
    code: "FabulousFebruary",
    expiryDate: null,
  },
  {
    code: "KGCNewYear2025",
    expiryDate: null,
  },
  {
    code: "KGCWinterFestival2024",
    expiryDate: null,
  },
];
