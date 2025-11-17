import React, { useState, useEffect } from 'react';
import { AlertTriangle, Upload, Calendar, MapPin, FileText, Phone, CheckCircle, Navigation } from 'lucide-react';
import { User as UserType } from '../types';

interface BloodRequestFormData {
  petId: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  surgeryDate: string;
  surgeryTime: string;
  hospitalName: string;
  hospitalAddress: string;
  hospitalPhone: string;
  bloodType: string;
  bloodAmount: number;
  diagnosis: string;
  diagnosisFile: File | null;
  additionalNotes: string;
}

interface DonorLocation {
  id: string;
  petName: string;
  ownerName: string;
  bloodType: string;
  lat: number;
  lng: number;
  address: string;
  distance: number;
}

const BloodRequest: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BloodRequestFormData>({
    petId: '',
    urgency: 'medium',
    surgeryDate: '',
    surgeryTime: '',
    hospitalName: '',
    hospitalAddress: '',
    hospitalPhone: '',
    bloodType: '',
    bloodAmount: 0,
    diagnosis: '',
    diagnosisFile: null,
    additionalNotes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // MPA 頁面導航 with base path support
  const onNavigate = (path: string) => {
    const base = import.meta.env.BASE_URL || '/CatHealth/';
    const targetPath = path === 'home' 
      ? `${base}index.html` 
      : `${base}pages/${path}/index.html`;
    window.location.href = targetPath;
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // 如果沒有使用者資訊，導向登入頁
      onNavigate('login');
    }
  }, []);

  // Mock pet data
  const mockPets = [
    {
      id: '1',
      name: '小花',
      bloodType: 'A型'
    }
  ];

  // Mock donor location data matching blood type
  const mockDonorLocations: DonorLocation[] = [
    {
      id: '1',
      petName: '小雪',
      ownerName: '陳先生',
      bloodType: 'A型',
      lat: 25.0330,
      lng: 121.5654,
      address: '台北市信義區信義路五段7號',
      distance: 2.3
    },
    {
      id: '2',
      petName: '咪咪',
      ownerName: '林小姐',
      bloodType: 'A型',
      lat: 25.0478,
      lng: 121.5318,
      address: '台北市大安區敦化南路二段216號',
      distance: 3.8
    },
    {
      id: '3',
      petName: '小黑',
      ownerName: '王先生',
      bloodType: 'A型',
      lat: 25.0173,
      lng: 121.5397,
      address: '台北市中山區南京東路三段219號',
      distance: 1.9
    },
    {
      id: '4',
      petName: '橘子',
      ownerName: '張小姐',
      bloodType: 'A型',
      lat: 25.0418,
      lng: 121.5753,
      address: '台北市松山區復興北路99號',
      distance: 4.2
    }
  ];

  const handleInputChange = (field: keyof BloodRequestFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleInputChange('diagnosisFile', file);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Blood request form submission logic would be processed here
  };

  // 如果還在載入使用者資料，可以顯示一個 loading 畫面
  if (!user) {
    return <div className="pt-20 min-h-screen flex items-center justify-center">Loading...</div>;
  }

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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">基本資訊</h2>
        <p className="text-gray-600 dark:text-gray-400">請填寫用血申請的基本資訊</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            選擇寵物 *
          </label>
          <select
            value={formData.petId}
            onChange={(e) => handleInputChange('petId', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          >
            <option value="">請選擇您的寵物</option>
            {mockPets.map(pet => (
              <option key={pet.id} value={pet.id}>
                {pet.name} ({pet.bloodType})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            緊急程度 *
          </label>
          <select
            value={formData.urgency}
            onChange={(e) => handleInputChange('urgency', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          >
            <option value="low">低 - 可安排時間</option>
            <option value="medium">中 - 一週內需要</option>
            <option value="high">高 - 24小時內需要</option>
            <option value="critical">危急 - 立即需要</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            預計手術日期 *
          </label>
          <input
            type="date"
            value={formData.surgeryDate}
            onChange={(e) => handleInputChange('surgeryDate', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            預計手術時間 *
          </label>
          <input
            type="time"
            value={formData.surgeryTime}
            onChange={(e) => handleInputChange('surgeryTime', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            血型 *
          </label>
          <select
            value={formData.bloodType}
            onChange={(e) => handleInputChange('bloodType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          >
            <option value="">請選擇血型</option>
            <option value="A型">A型</option>
            <option value="B型">B型</option>
            <option value="AB型">AB型</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            預計用血量 (ml) *
          </label>
          <input
            type="number"
            value={formData.bloodAmount}
            onChange={(e) => handleInputChange('bloodAmount', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="請輸入所需血液量"
            min="1"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">醫院資訊</h2>
        <p className="text-gray-600 dark:text-gray-400">請填寫進行手術的醫院資訊</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            醫院名稱 *
          </label>
          <input
            type="text"
            value={formData.hospitalName}
            onChange={(e) => handleInputChange('hospitalName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="請輸入醫院名稱"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            醫院地址 *
          </label>
          <textarea
            value={formData.hospitalAddress}
            onChange={(e) => handleInputChange('hospitalAddress', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="請輸入完整醫院地址"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            醫院電話 *
          </label>
          <input
            type="tel"
            value={formData.hospitalPhone}
            onChange={(e) => handleInputChange('hospitalPhone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="請輸入醫院聯絡電話"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">診斷資訊</h2>
        <p className="text-gray-600 dark:text-gray-400">請提供詳細的診斷資訊</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            診斷說明 *
          </label>
          <textarea
            value={formData.diagnosis}
            onChange={(e) => handleInputChange('diagnosis', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="請描述寵物的病況以及需要用血的原因"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            上傳診斷證明 *
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
            <div className="text-center">
              <Upload size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                點擊上傳或拖拽檔案到此處
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                支援格式：PDF、JPG、PNG，檔案大小不超過10MB
              </p>
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                id="diagnosis-file"
              />
              <label
                htmlFor="diagnosis-file"
                className="mt-4 inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer"
              >
                選擇檔案
              </label>
            </div>
            {formData.diagnosisFile && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-green-800 dark:text-green-400 text-sm">
                  ✓ 已上傳：{formData.diagnosisFile.name}
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            其他備註
          </label>
          <textarea
            value={formData.additionalNotes}
            onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="如有其他需要說明的事項請在此輸入"
          />
        </div>
      </div>
    </div>
  );

  const renderDonorMap = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <Navigation size={24} className="text-blue-600 dark:text-blue-500 mr-3" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">附近的供血貓</h3>
      </div>
      
      {/* Map container */}
      <div className="relative h-96 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-4">
        {/* Mock map background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30">
          {/* Map marker points */}
          {mockDonorLocations.map((donor, index) => (
            <div
              key={donor.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + index * 10}%`
              }}
            >
              {/* Marker point */}
              <div className="relative">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-pulse">
                  {index + 1}
                </div>
                
                {/* Hover information card */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 min-w-48 border border-gray-200 dark:border-gray-600">
                    <div className="text-sm">
                      <p className="font-semibold text-gray-900 dark:text-white">{donor.petName}</p>
                      <p className="text-gray-600 dark:text-gray-400">飼主：{donor.ownerName}</p>
                      <p className="text-gray-600 dark:text-gray-400">血型：{donor.bloodType}</p>
                      <p className="text-gray-600 dark:text-gray-400">距離：{donor.distance}公里</p>
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-gray-800"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Hospital location marker */}
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: '50%', top: '50%' }}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
              <MapPin size={20} />
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
              <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                手術醫院
              </div>
            </div>
          </div>
        </div>
        
        {/* Map controls */}
        <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
          <div className="flex flex-col space-y-2">
            <button className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600">
              <span className="text-lg font-bold">+</span>
            </button>
            <button className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600">
              <span className="text-lg font-bold">-</span>
            </button>
          </div>
        </div>
        
        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
          <div className="text-sm space-y-2">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-600 rounded-full mr-2"></div>
              <span className="text-gray-700 dark:text-gray-300">供血貓</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-600 rounded-full mr-2"></div>
              <span className="text-gray-700 dark:text-gray-300">手術醫院</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Donor list */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-900 dark:text-white">符合 {formData.bloodType} 的供血貓：</h4>
        {mockDonorLocations.map((donor, index) => (
          <div key={donor.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{donor.petName} - {donor.ownerName}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{donor.address}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{donor.distance}公里</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">距離醫院</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={40} className="text-green-600 dark:text-green-400" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">申請已提交</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          您的用血申請已成功提交，我們正在為您尋找合適的供血貓。
        </p>
      </div>

      {/* Show map */}
      {renderDonorMap()}

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">接下來會發生什麼？</h3>
        <div className="space-y-3 text-left">
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">1</div>
            <p className="text-gray-600 dark:text-gray-400">系統管理員將審核您的申請資料</p>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">2</div>
            <p className="text-gray-600 dark:text-gray-400">平台將緊急聯絡符合條件的供血貓飼主</p>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">3</div>
            <p className="text-gray-600 dark:text-gray-400">我們將聯絡您和醫院安排後續事宜</p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
        <div className="flex items-start">
          <CheckCircle size={24} className="text-green-600 dark:text-green-500 mr-3 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">管理員已開始處理</h3>
            <p className="text-gray-600 dark:text-gray-400">
              我們的管理員已收到您的申請，正在緊急聯絡上方地圖中的供血貓飼主。
              同時我們也會聯絡 <strong>{formData.hospitalName}</strong> 協調後續事宜。
            </p>
          </div>
        </div>
      </div>

      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">緊急聯絡</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          如果情況緊急，請直接撥打我們的24小時緊急專線：
        </p>
        <div className="flex items-center justify-center">
          <Phone size={20} className="text-red-600 dark:text-red-500 mr-2" />
          <span className="text-xl font-bold text-red-600 dark:text-red-500">(02) 1234-5678</span>
        </div>
      </div>

      <div className="flex space-x-4 justify-center">
        <button
          onClick={() => onNavigate('member-dashboard')}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
        >
          返回會員中心
        </button>
        <button
          onClick={() => window.location.reload()}
          className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          提交新申請
        </button>
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <main className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            {renderSuccess()}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle size={32} className="text-red-600 dark:text-red-500 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">緊急用血申請</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              請填寫以下資訊，我們將快速為您媒合合適的供血貓
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            {renderStepIndicator()}

            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一步
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  下一步
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  <AlertTriangle size={20} className="mr-2" />
                  提交緊急申請
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BloodRequest;