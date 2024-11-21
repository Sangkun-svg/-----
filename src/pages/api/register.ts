import { NextApiRequest, NextApiResponse } from "next";
import { COUPONS } from "@/constant/coupon";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const uid = req.body.uid;
    const url: string = "https://kgc-coupon.awesomepiece.com/submitCoupon";

    // 현재 날짜 가져오기
    const today = new Date().toISOString().split("T")[0];

    // 유효한 쿠폰만 필터링
    const validCoupons = COUPONS.filter((coupon) => {
      if (!coupon.expiryDate) return true;

      const expiryDate = new Date(coupon.expiryDate);
      const currentDate = new Date(today);
      return expiryDate >= currentDate;
    });

    const couponRequests = validCoupons.map(async (coupon) => {
      const formData = new URLSearchParams();
      formData.append("uid", uid);
      formData.append("lang", "kr");
      formData.append("code", coupon.code);

      return axios.post(url, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    });

    const responses = await Promise.all(couponRequests);
    const isFailed = responses.map((response) => {
      console.log(response.data);
      return (
        response.data.includes("Failed to enter coupon") ||
        response.data.includes("쿠폰 입력 실패")
      );
    });

    console.log({ isFailed });

    res.status(200).json({
      message: "유효한 쿠폰이 모두 정상적으로 처리되었습니다",
      results: responses.map((response) => response.data),
      isFailed: isFailed,
    });
  } catch (error) {
    console.error("쿠폰 등록 중 오류 발생:", error);
    res.status(500).json({ message: "서버 내부 오류가 발생했습니다" });
  }
}
