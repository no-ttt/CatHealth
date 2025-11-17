import React, { useState } from 'react';
import { Heart, User, Calendar, CreditCard, FileText, CheckCircle } from 'lucide-react';

interface PetFormData {
  ownerName: string;
  ownerIdNumber: string;
  ownerPhone: string;
  ownerAddress: string;
  ownerEmail: string;
  registrationType: 'self' | 'donation';
  agreeToTerms: boolean;
}

const PetRegistration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PetFormData>({
    ownerName: '',
    ownerIdNumber: '',
    ownerPhone: '',
    ownerAddress: '',
    ownerEmail: '',
    registrationType: 'self',
    agreeToTerms: false
  });

  // MPA-style navigation with base path support
  const onNavigate = (path: string) => {
    const base = import.meta.env.BASE_URL || '/CatHealth/';
    const targetPath = path === 'home' 
      ? `${base}index.html` 
      : `${base}pages/${path}/index.html`;
    window.location.href = targetPath;
  };

  const handleInputChange = (field: keyof PetFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    alert('註冊成功！請登入會員中心新增您的愛貓資料。');
    onNavigate('login');
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              step <= currentStep
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
            }`}
          >
            {step < currentStep ? <CheckCircle size={20} /> : step}
          </div>
          {step < 2 && (
            <div
              className={`w-16 h-1 mx-2 ${
                step < currentStep ? 'bg-red-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">選擇註冊類型</h2>
        <p className="text-gray-600 dark:text-gray-400">請選擇您的註冊目的</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          onClick={() => handleInputChange('registrationType', 'self')}
          className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
            formData.registrationType === 'self'
              ? 'border-red-600 bg-red-50 dark:bg-red-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-red-300'
          }`}
        >
          <User size={32} className="text-red-600 dark:text-red-500 mb-4" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            貓飼主
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            建立血型檔案，讓您的愛貓在未來需要時能立即獲得血液
          </p>
        </div>

        <div
          onClick={() => handleInputChange('registrationType', 'donation')}
          className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
            formData.registrationType === 'donation'
              ? 'border-red-600 bg-red-50 dark:bg-red-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-red-300'
          }`}
        >
          <Heart size={32} className="text-red-600 dark:text-red-500 mb-4" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            動物醫院
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            讓您的愛貓成為英雄，幫助拯救需要輸血的其他貓咪
          </p>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">飼主資訊</h2>
        <p className="text-gray-600 dark:text-gray-400">請填寫您的聯絡資訊</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            飼主姓名 *
          </label>
          <input
            type="text"
            value={formData.ownerName}
            onChange={(e) => handleInputChange('ownerName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="請輸入您的姓名"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            身分證字號 *
          </label>
          <input
            type="text"
            value={formData.ownerIdNumber}
            onChange={(e) => handleInputChange('ownerIdNumber', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="請輸入身分證字號"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            聯絡電話 *
          </label>
          <input
            type="tel"
            value={formData.ownerPhone}
            onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="請輸入聯絡電話"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            電子信箱 *
          </label>
          <input
            type="email"
            value={formData.ownerEmail}
            onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="請輸入電子信箱"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            聯絡地址 *
          </label>
          <input
            type="text"
            value={formData.ownerAddress}
            onChange={(e) => handleInputChange('ownerAddress', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="請輸入完整地址"
            required
          />
        </div>
      </div>
    </div>
  );

  return (
    <main className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">寵物註冊</h1>
            <p className="text-gray-600 dark:text-gray-400">
              註冊成為會員，稍後可在會員中心新增您的愛貓資料
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            {renderStepIndicator()}

            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一步
              </button>

              {currentStep < 2 ? (
                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  下一步
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  <CheckCircle size={20} className="mr-2" />
                  完成註冊
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PetRegistration;