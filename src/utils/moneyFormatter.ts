export const moneyFormatter = (value: number | undefined, discount?: number) => {
  if (value === undefined) return "0 ₫";
  const discountedPrice = value - (value * (discount ?? 0)) / 100;
  return discountedPrice.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
