import React from 'react';

interface ProUpgradeProps {
  onBack: () => void;
}

export const ProUpgrade: React.FC<ProUpgradeProps> = ({ onBack }) => {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-2 mt-4">
        <h2 className="text-2xl font-bold text-gray-900">Nâng cấp PRO</h2>
        <p className="text-gray-500">Quản lý tài chính chuyên nghiệp hơn.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-brand-100">
        <div className="bg-brand-50 p-6 text-center border-b border-brand-100">
          <p className="text-brand-600 font-semibold text-sm uppercase tracking-wide">Gói Năm (Tiết kiệm 40%)</p>
          <div className="mt-2 flex items-baseline justify-center">
            <span className="text-4xl font-bold text-gray-900">199.000</span>
            <span className="ml-1 text-gray-500">đ/năm</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Chỉ khoảng 16k / tháng</p>
        </div>
        <div className="p-6">
          <ul className="space-y-4">
            {[
              "Lưu lịch sử tính toán không giới hạn",
              "Tính toán hàng loạt nhiều sản phẩm",
              "Xuất báo cáo Excel / CSV",
              "Cảnh báo thông minh khi Ads quá cao",
              "Không quảng cáo làm phiền",
              "Hỗ trợ ưu tiên 24/7"
            ].map((feature, i) => (
              <li key={i} className="flex items-start">
                <svg className="h-5 w-5 text-profit mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          <button className="mt-8 w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition duration-200">
            Đăng ký ngay
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Gói Tháng</h3>
            <span className="text-lg font-bold text-gray-900">29.000 <span className="text-sm font-normal text-gray-500">đ</span></span>
        </div>
        <button className="w-full py-2 border border-brand-500 text-brand-600 font-medium rounded-lg hover:bg-brand-50 transition">
            Chọn gói tháng
        </button>
      </div>

      <div className="text-center pt-4">
        <button onClick={onBack} className="text-gray-400 text-sm hover:text-gray-600">
          Quay lại trang tính
        </button>
      </div>
    </div>
  );
};