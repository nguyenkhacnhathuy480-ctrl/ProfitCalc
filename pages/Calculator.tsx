import React, { useState, useEffect, useMemo } from 'react';
import { InputGroup } from '../components/InputGroup';
import { CalculationData, CalculationResult } from '../types';
import { formatCurrency } from '../utils/currency';

interface CalculatorProps {
  onUpgrade: () => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onUpgrade }) => {
  const [data, setData] = useState<CalculationData>({
    costPrice: 0,
    sellingPrice: 0,
    platformFeePercent: 0,
    paymentFeePercent: 0,
    adsCost: 0,
    otherCosts: 0,
    returnRatePercent: 0,
  });

  const result: CalculationResult = useMemo(() => {
    // 1. Real Revenue = Selling price * (1 - return rate)
    const returnRateDecimal = data.returnRatePercent / 100;
    const realRevenue = data.sellingPrice * (1 - returnRateDecimal);

    // 2. Fees based on Selling Price (Platform + Payment)
    // Note: Usually fees are charged on the successful order value.
    // If an item is returned, you might get fee refunds, but for strict conservative calculation ("Real Profit"):
    // We assume some operational loss or fees might stick, but let's stick to the prompt's logic flow.
    // User Formula: Total cost = cost price + platform fee + payment fee + ads cost + other costs
    const platformFeeAmt = data.sellingPrice * (data.platformFeePercent / 100);
    const paymentFeeAmt = data.sellingPrice * (data.paymentFeePercent / 100);
    
    // We adjust fees to be weighted by success rate? 
    // The prompt says: "Total cost = cost price + platform fee + ..."
    // This implies a PER UNIT SENT cost.
    // If I send an item, I pay Cost Price.
    // I pay Ads.
    // I pay Other costs (packing).
    // Platform fees are usually deducted from payout.
    
    // Let's implement strictly:
    const totalFees = platformFeeAmt + paymentFeeAmt + data.adsCost + data.otherCosts;
    const totalCost = data.costPrice + totalFees;

    const netProfit = realRevenue - totalCost;
    
    const profitMargin = data.sellingPrice > 0 ? (netProfit / data.sellingPrice) * 100 : 0;

    // Break-even:
    // Profit = SellingPrice * (1 - ReturnRate) - (CostPrice + SellingPrice*Fee% + Ads + Other) = 0
    // SellingPrice * (1 - ReturnRate - Fee%) = CostPrice + Ads + Other
    // SellingPrice = (CostPrice + Ads + Other) / (1 - ReturnRate - Fee%)
    const feePercentDecimal = (data.platformFeePercent + data.paymentFeePercent) / 100;
    const denominator = 1 - returnRateDecimal - feePercentDecimal;
    
    let breakEvenPrice = 0;
    if (denominator > 0) {
        breakEvenPrice = (data.costPrice + data.adsCost + data.otherCosts) / denominator;
    }

    return {
      realRevenue,
      totalCost,
      netProfit,
      profitMargin,
      breakEvenPrice,
      isProfit: netProfit > 0,
    };
  }, [data]);

  const updateField = (field: keyof CalculationData, value: number) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-4 space-y-6 pb-20">
      
      {/* Result Card - Sticky or Top */}
      <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
        <h2 className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-2">Lợi nhuận ròng (Net Profit)</h2>
        <div className={`text-4xl font-bold mb-2 ${result.isProfit ? 'text-profit' : 'text-loss'}`}>
          {formatCurrency(result.netProfit)}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
            <div>
                <p className="text-xs text-gray-500">Tỷ suất lợi nhuận</p>
                <p className={`text-lg font-semibold ${result.profitMargin > 0 ? 'text-gray-800' : 'text-loss'}`}>
                    {result.profitMargin.toFixed(1)}%
                </p>
            </div>
            <div>
                <p className="text-xs text-gray-500">Giá bán hòa vốn</p>
                <p className="text-lg font-semibold text-gray-800">{formatCurrency(result.breakEvenPrice)}</p>
            </div>
        </div>

        {!result.isProfit && data.sellingPrice > 0 && (
             <div className="mt-3 bg-red-50 text-loss text-xs px-3 py-2 rounded-lg flex items-start">
                <span className="mr-2">⚠️</span>
                <span>Bạn đang lỗ! Hãy tăng giá bán hoặc giảm chi phí Ads.</span>
             </div>
        )}
      </div>

      {/* Inputs Form */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
        <h3 className="text-brand-700 font-semibold mb-4 text-sm flex items-center">
            <span className="w-1 h-4 bg-brand-500 rounded-full mr-2"></span>
            Thông tin sản phẩm
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
            <InputGroup 
                label="Giá bán (Selling Price)" 
                value={data.sellingPrice || ''} 
                onChange={(v) => updateField('sellingPrice', v)}
                placeholder="200000"
                suffix="₫"
            />
            <InputGroup 
                label="Giá vốn (Cost Price)" 
                value={data.costPrice || ''} 
                onChange={(v) => updateField('costPrice', v)}
                placeholder="100000"
                suffix="₫"
            />
        </div>

        <div className="grid grid-cols-2 gap-3">
            <InputGroup 
                label="Phí sàn (Platform)" 
                value={data.platformFeePercent || ''} 
                onChange={(v) => updateField('platformFeePercent', v)}
                placeholder="5"
                suffix="%"
            />
            <InputGroup 
                label="Phí thanh toán" 
                value={data.paymentFeePercent || ''} 
                onChange={(v) => updateField('paymentFeePercent', v)}
                placeholder="2.5"
                suffix="%"
            />
        </div>

        <InputGroup 
            label="Chi phí Ads / đơn" 
            value={data.adsCost || ''} 
            onChange={(v) => updateField('adsCost', v)}
            placeholder="20000"
            suffix="₫"
        />

        <div className="grid grid-cols-2 gap-3">
            <InputGroup 
                label="Chi phí khác" 
                value={data.otherCosts || ''} 
                onChange={(v) => updateField('otherCosts', v)}
                placeholder="5000"
                suffix="₫"
            />
            <InputGroup 
                label="Tỷ lệ hoàn (Return)" 
                value={data.returnRatePercent || ''} 
                onChange={(v) => updateField('returnRatePercent', v)}
                placeholder="5"
                suffix="%"
            />
        </div>
      </div>

      <button 
        onClick={onUpgrade}
        className="w-full py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl shadow-lg font-medium text-sm flex items-center justify-center space-x-2 active:scale-95 transition-transform"
      >
        <span>⭐ Lưu lịch sử tính toán (PRO)</span>
      </button>

    </div>
  );
};