export const moneyFormatter = (value: number | undefined, discount?: number) => {
    if (value == undefined) return "$ 0.00";
    return `$ ${Number(value - value * (discount ?? 0)/100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };