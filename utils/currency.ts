export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
};

export const parseRawNumber = (value: string): number => {
  return Number(value.replace(/[^0-9.-]+/g, ""));
};