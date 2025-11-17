import React, { useState } from 'react';
import { Building2, User, Phone, MapPin, CreditCard, FileText, CheckCircle } from 'lucide-react';

interface VetFormData {
  doctorName: string;
  hospitalName: string;
  hospitalAddress: string;
  contactPhone: string;
  email: string;
  licenseNumber: string;
  agreeToTerms: boolean;
}

const VetRegistration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<VetFormData>({
    doctorName: '',
    hospitalName: '',
    hospitalAddress: '',
    contactPhone: '',
    email: '',
    licenseNumber: '',
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

  const handleInputChange = (field: keyof VetFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    alert('註冊成功！您現在可以查詢供血貓資訊。');
    onNavigate('login');
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
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
          {step < 3 && (
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">獸醫診所基本資訊</h2>
        <p className="text-gray-600 dark:text-gray-400">請填寫您的獸醫診所基本資訊</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            獸醫師姓名 *
          </label>
          <div className="relative">
            <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={formData.doctorName}
              onChange={(e) => handleInputChange('doctorName', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="請輸入獸醫師姓名"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            獸醫師執照號碼 *
          </label>
          <div className="relative">
            <FileText size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={formData.licenseNumber}
              onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="請輸入執照號碼"
              required
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            診所名稱 *
          </label>
          <div className="relative">
            <Building2 size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={formData.hospitalName}
              onChange={(e) => handleInputChange('hospitalName', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="請輸入診所名稱"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">聯絡資訊</h2>
        <p className="text-gray-600 dark:text-gray-400">請填寫您的聯絡資訊</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            聯絡電話 *
          </label>
          <div className="relative">
            <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              value={formData.contactPhone}
              onChange={(e) => handleInputChange('contactPhone', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="請輸入聯絡電話"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            電子信箱 *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="請輸入電子信箱"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            診所地址 *
          </label>
          <div className="relative">
            <MapPin size={20} className="absolute left-3 top-3 text-gray-400" />
            <textarea
              value={formData.hospitalAddress}
              onChange={(e) => handleInputChange('hospitalAddress', e.target.value)}
              rows={3}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="請輸入完整診所地址"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">確認與付費</h2>
        <p className="text-gray-600 dark:text-gray-400">請確認您的資訊並完成付費</p>
      </div>

      {/* Data Confirmation */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">註冊資訊確認</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">獸醫師姓名：</span>
            <span className="text-gray-900 dark:text-white ml-2">{formData.doctorName}</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">診所名稱：</span>
            <span className="text-gray-900 dark:text-white ml-2">{formData.hospitalName}</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">聯絡電話：</span>
            <span className="text-gray-900 dark:text-white ml-2">{formData.contactPhone}</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">電子信箱：</span>
            <span className="text-gray-900 dark:text-white ml-2">{formData.email}</span>
          </div>
          <div className="md:col-span-2">
            <span className="text-gray-600 dark:text-gray-400">診所地址：</span>
            <span className="text-gray-900 dark:text-white ml-2">{formData.hospitalAddress}</span>
          </div>
        </div>
      </div>

      {/* Service Description */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">服務功能</h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>• 查詢指定地區的供血貓資訊</li>
          <li>• 獲得供血貓飼主聯絡資訊</li>
          <li>• 緊急血液媒合服務</li>
          <li>• 血型相容性查詢系統</li>
        </ul>
      </div>

      {/* Fee Explanation */}
      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">費用明細</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">一次性註冊費</span>
            <span className="text-gray-900 dark:text-white">NT$ 5,000</span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            * 付費後即可永久使用查詢服務和獲得供血貓聯絡資訊
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between font-bold">
            <span className="text-gray-900 dark:text-white">總計</span>
            <span className="text-red-600 dark:text-red-500">NT$ 5,000</span>
          </div>
        </div>
      </div>

      {/* Terms Agreement */}
      <div className="space-y-4">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
            className="mt-1 mr-3"
          />
          <label htmlFor="agreeToTerms" className="text-sm text-gray-700 dark:text-gray-300">
            我已閱讀並同意
            <button className="text-red-600 dark:text-red-500 hover:underline mx-1">
              獸醫服務條款
            </button>
            和
            <button className="text-red-600 dark:text-red-500 hover:underline mx-1">
              隱私政策
            </button>
            ，並承諾僅將獲得的聯絡資訊用於合法醫療目的。
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <main className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">獸醫診所註冊</h1>
            <p className="text-gray-600 dark:text-gray-400">
              註冊成為合作夥伴獸醫診所，獲得供血貓查詢服務
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            {renderStepIndicator()}

            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一步
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  下一步
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!formData.agreeToTerms}
                  className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg"
                >
                  <CreditCard size={20} className="mr-2" />
                  確認並付費
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VetRegistration;