import { COUPONS } from "@/constant/coupon";
import axios from "axios";
import { useState } from "react";
import { Check, CircleX } from "lucide-react";
import { GAPageView } from "@/hooks/useGAPageView";

export default function Home() {
  const today = new Date().toISOString().split("T")[0];
  const [uid, setUid] = useState("");
  const [couponStatus, setCouponStatus] = useState<Array<boolean>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validCoupons = COUPONS.filter((coupon) => {
    if (!coupon.expiryDate) return true;

    const expiryDate = new Date(coupon.expiryDate);
    const currentDate = new Date(today);
    return expiryDate >= currentDate;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!uid.trim()) {
        throw new Error("아이디를 입력해주세요");
      }
      const response = await axios.post("/api/register", { uid });
      setCouponStatus(response.data.isFailed);
      if (response.data.success) {
        alert("등록이 완료되었습니다!");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "등록 중 오류가 발생했습니다"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <GAPageView />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="uid" className="block mb-2 text-sm font-medium">
            킹캇캐슬 성주 아이디
          </label>
          <input
            type="text"
            id="uid"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="아이디를 입력하세요"
            disabled={isLoading}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? "처리중..." : "입력하기"}
        </button>
      </form>

      <div className="max-w-md mx-auto mt-8">
        <h2 className="text-lg font-semibold mb-4">
          적용 가능한 쿠폰 목록 ({validCoupons.length}개)
        </h2>
        <div className="space-y-3">
          {validCoupons.map((coupon, index) => (
            <div
              key={index}
              className="flex justify-between p-4 border rounded-lg bg-gray-50"
            >
              <div>
                <p className="font-medium">{coupon.code}</p>
                <p className="text-sm text-gray-500 mt-1">
                  만료일:{" "}
                  {coupon.expiryDate
                    ? new Date(coupon.expiryDate).toLocaleDateString("ko-KR")
                    : "상시"}
                </p>
              </div>
              {couponStatus[index] !== undefined && (
                <p
                  className={`text-sm mt-2 ${
                    couponStatus[index] ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {couponStatus[index] ? <CircleX /> : <Check />}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
