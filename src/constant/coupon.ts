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
    expiryDate: "2024-11-30",
  },
  {
    code: "KGCLiveCollab2023",
    expiryDate: "2024-08-02",
  },
  {
    code: "JoinNowKgcGlobal",
    expiryDate: "2024-10-20",
  },
  {
    code: "EnjoyKingGodCollab",
    expiryDate: "2024-10-22",
  },
  {
    code: "KingGodGift23",
    expiryDate: "2024-12-16",
  },
  {
    code: "KGCPlayLive4",
    expiryDate: "2024-12-27",
  },
  {
    code: "KingGodCartoon22",
    expiryDate: "2025-02-02",
  },
];
