export interface CalculationData {
  costPrice: number;
  sellingPrice: number;
  platformFeePercent: number;
  paymentFeePercent: number;
  adsCost: number;
  otherCosts: number;
  returnRatePercent: number;
}

export interface CalculationResult {
  realRevenue: number;
  totalCost: number;
  netProfit: number;
  profitMargin: number;
  breakEvenPrice: number;
  isProfit: boolean;
}