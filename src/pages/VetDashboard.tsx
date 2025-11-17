import React, { useState, useEffect } from 'react';
import { Building2, Search, MapPin, Phone, Filter, Users, Plus, CreditCard, AlertTriangle, FileText, X, CheckCircle, Lock, Eye, Download } from 'lucide-react';
import { User as UserType, Pet, HealthReport } from '../types';

interface DonorInfo {
  id: string;
  petName: string;
  bloodType: string;
  ownerName: string;
  ownerPhone: string;
  address: string;
  lastDonation: string;
  isAvailable: boolean;
}

const VetDashboard: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);

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
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.type === 'vet') {
        setUser(parsedUser);
      } else {
        onNavigate('login'); // 如果使用者不是獸醫，導向登入頁
      }
    } else {
      onNavigate('login'); // 如果沒有使用者資訊，導向登入頁
    }
  }, []);

  const [activeTab, setActiveTab] = useState('cats');
  const [searchFilters, setSearchFilters] = useState({
    bloodType: '',
    region: '',
    availability: 'all'
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCatForm, setShowCatForm] = useState(false);
  const [showPaymentProcess, setShowPaymentProcess] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);
  const [isPaid, setIsPaid] = useState(false);
  const [showReportDetail, setShowReportDetail] = useState(false);
  const [selectedReport, setSelectedReport] = useState<HealthReport | null>(null);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [reportDetailTab, setReportDetailTab] = useState('bloodType');
  const [catFormData, setCatFormData] = useState({
    name: '',
    birthday: '',
    chipNumber: '',
    bloodType: '',
    breed: '',
    weight: '',
    gender: '',
    ownerName: '',
    ownerPhone: '',
    ownerAddress: ''
  });

  // Mock cat data created by vet
  const [mockCats, setMockCats] = useState<Pet[]>([
    {
      id: '1',
      name: '小花',
      birthday: '2020-03-15',
      chipNumber: '900123456789012',
      bloodType: 'A型',
      healthStatus: '健康',
      lastCheckup: '2024-01-15',
      isDonor: true,
      ownerId: 'owner1',
      breed: '美國短毛貓',
      weight: 4.5,
      gender: '母'
    },
    {
      id: '2',
      name: '咪咪',
      birthday: '2019-08-20',
      chipNumber: '900123456789013',
      bloodType: 'B型',
      healthStatus: '健康',
      lastCheckup: '2024-02-01',
      isDonor: false,
      ownerId: 'owner2',
      breed: '波斯貓',
      weight: 3.8,
      gender: '公'
    }
  ]);

  // Mock health reports
  const mockHealthReports: HealthReport[] = [
    {
      id: '1',
      petId: '1',
      date: '2024-01-15',
      type: '血液檢查',
      status: '正常',
      details: '血球計數正常，肝腎功能良好'
    },
    {
      id: '2',
      petId: '2',
      date: '2024-02-01',
      type: '健康檢查',
      status: '正常',
      details: '整體健康狀況良好，建議定期追蹤'
    }
  ];

  // Mock donor data
  const mockDonors: DonorInfo[] = [
    {
      id: '1',
      petName: '小白',
      bloodType: 'A型',
      ownerName: '陳先生',
      ownerPhone: '0912345678',
      address: '台北市信義區信義路五段7號',
      lastDonation: '2024-01-15',
      isAvailable: true
    },
    {
      id: '2',
      petName: '咪咪',
      bloodType: 'B型',
      ownerName: '林小姐',
      ownerPhone: '0923456789',
      address: '台北市大安區敦化南路二段216號',
      lastDonation: '2023-12-20',
      isAvailable: true
    },
    {
      id: '3',
      petName: '小黑',
      bloodType: 'A型',
      ownerName: '王先生',
      ownerPhone: '0934567890',
      address: '台北市中山區南京東路三段219號',
      lastDonation: '2024-02-01',
      isAvailable: false
    }
  ];

  const filteredDonors = mockDonors.filter(donor => {
    if (searchFilters.bloodType && donor.bloodType !== searchFilters.bloodType) return false;
    if (searchFilters.region && !donor.address.includes(searchFilters.region)) return false;
    if (searchFilters.availability === 'available' && !donor.isAvailable) return false;
    if (searchFilters.availability === 'unavailable' && donor.isAvailable) return false;
    return true;
  });

  const handleEmergencyMatch = () => {
    if (!isPaid) {
      setShowPaymentModal(true);
    } else {
      alert('緊急媒合通知已發送給所有符合條件的供血貓飼主！');
    }
  };

  const handlePaymentComplete = () => {
    setIsPaid(true);
    setShowPaymentProcess(false);
    setShowPaymentModal(false);
    setPaymentStep(1);
    alert('付費成功！您現在可以使用所有功能。');
  };

  const handleCatFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCat: Pet = {
      id: (mockCats.length + 1).toString(),
      name: catFormData.name,
      birthday: catFormData.birthday,
      chipNumber: catFormData.chipNumber,
      bloodType: catFormData.bloodType,
      healthStatus: '健康',
      lastCheckup: new Date().toISOString().split('T')[0],
      isDonor: false,
      ownerId: 'new-owner',
      breed: catFormData.breed,
      weight: parseFloat(catFormData.weight),
      gender: catFormData.gender
    };

    setMockCats([...mockCats, newCat]);
    setShowCatForm(false);
    setCatFormData({
      name: '',
      birthday: '',
      chipNumber: '',
      bloodType: '',
      breed: '',
      weight: '',
      gender: '',
      ownerName: '',
      ownerPhone: '',
      ownerAddress: ''
    });
    alert('貓咪資料新增成功！');
  };

  // 如果還在載入使用者資料或使用者不存在，顯示 Loading
  if (!user) {
    return <div className="pt-20 min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Mock detailed report data
  const mockBloodTypeData = [
    { item: '血型', result: 'A型', referenceRange: 'A/B/AB', unit: '-' },
    { item: '交叉配對試驗', result: '陰性', referenceRange: '陰性', unit: '-' },
    { item: '血球凝集反應', result: '無', referenceRange: '無', unit: '-' },
  ];

  const mockBiochemistryData = [
    { item: '白血球 (WBC)', result: '8.5', referenceRange: '5.5-19.5', unit: '10^3/μL', status: 'normal' },
    { item: '紅血球 (RBC)', result: '7.8', referenceRange: '5.0-10.0', unit: '10^6/μL', status: 'normal' },
    { item: '血紅素 (HGB)', result: '12.5', referenceRange: '9.5-15.0', unit: 'g/dL', status: 'normal' },
    { item: '血小板 (PLT)', result: '350', referenceRange: '200-500', unit: '10^3/μL', status: 'normal' },
    { item: 'ALT (肝功能)', result: '45', referenceRange: '10-100', unit: 'U/L', status: 'normal' },
    { item: 'AST (肝功能)', result: '38', referenceRange: '10-50', unit: 'U/L', status: 'normal' },
    { item: 'BUN (腎功能)', result: '22', referenceRange: '15-34', unit: 'mg/dL', status: 'normal' },
    { item: 'CRE (腎功能)', result: '1.2', referenceRange: '0.8-2.4', unit: 'mg/dL', status: 'normal' },
    { item: '血糖 (GLU)', result: '95', referenceRange: '70-150', unit: 'mg/dL', status: 'normal' },
  ];

  const mockDNAData = [
    { item: 'FeLV (貓白血病病毒)', result: '陰性', referenceRange: '陰性', status: 'normal' },
    { item: 'FIV (貓愛滋病病毒)', result: '陰性', referenceRange: '陰性', status: 'normal' },
    { item: '遺傳性心肌病 (HCM)', result: '低風險', referenceRange: '低風險', status: 'normal' },
    { item: '多囊性腎病 (PKD)', result: '未檢出', referenceRange: '未檢出', status: 'normal' },
    { item: '腎臟疾病風險', result: '中等', referenceRange: '低-中', status: 'warning' },
    { item: '糖尿病風險', result: '低', referenceRange: '低', status: 'normal' },
  ];

  const ReportDetailModal = () => {
    if (!selectedReport || !selectedPet) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedPet.name} - 健康檢查報告
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  檢查日期：{selectedReport.date} | 報告類型：{selectedReport.type}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowReportDetail(false);
                  setSelectedReport(null);
                  setSelectedPet(null);
                  setReportDetailTab('bloodType');
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex space-x-2 mt-6 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setReportDetailTab('bloodType')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                  reportDetailTab === 'bloodType'
                    ? 'text-red-600 dark:text-red-500 border-red-600 dark:border-red-500'
                    : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                血型檢測
              </button>
              <button
                onClick={() => setReportDetailTab('biochemistry')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                  reportDetailTab === 'biochemistry'
                    ? 'text-red-600 dark:text-red-500 border-red-600 dark:border-red-500'
                    : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                生化檢驗
              </button>
              <button
                onClick={() => setReportDetailTab('dna')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                  reportDetailTab === 'dna'
                    ? 'text-red-600 dark:text-red-500 border-red-600 dark:border-red-500'
                    : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                DNA分析
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {reportDetailTab === 'bloodType' && (
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">血型檢測結果</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">檢測項目</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">檢測結果</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">參考範圍</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">單位</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {mockBloodTypeData.map((data, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{data.item}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-semibold">{data.result}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{data.referenceRange}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{data.unit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">檢測說明</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    血型檢測結果顯示此貓咪為A型血，這是貓咪中最常見的血型。交叉配對試驗結果為陰性，表示無血型不合的情況。
                  </p>
                </div>
              </div>
            )}

            {reportDetailTab === 'biochemistry' && (
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">生化檢驗結果</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">檢測項目</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">檢測結果</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">參考範圍</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">單位</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">狀態</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {mockBiochemistryData.map((data, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{data.item}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-semibold">{data.result}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{data.referenceRange}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{data.unit}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              data.status === 'normal'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }`}>
                              {data.status === 'normal' ? '正常' : '注意'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">檢驗總結</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    所有生化指標均在正常範圍內。血球計數、肝功能（ALT、AST）、腎功能（BUN、CRE）和血糖水平均正常，顯示整體健康狀況良好。
                  </p>
                </div>
              </div>
            )}

            {reportDetailTab === 'dna' && (
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">DNA分析結果</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">檢測項目</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">檢測結果</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">參考值</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">狀態</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {mockDNAData.map((data, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{data.item}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-semibold">{data.result}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{data.referenceRange}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              data.status === 'normal'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }`}>
                              {data.status === 'normal' ? '正常' : '注意'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">基因檢測總結</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      DNA分析顯示此貓咪未攜帶FeLV和FIV病毒，遺傳性心肌病和多囊性腎病風險皆為低。
                    </p>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">健康建議</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      腎臟疾病風險評估為中等，建議定期監測腎功能指標，維持適當水分攝取，並諮詢獸醫師制定預防保健計畫。
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                報告狀態：
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded text-xs font-medium">
                  {selectedReport.status}
                </span>
              </div>
              <div className="flex space-x-3">
                <button className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg">
                  <Download size={16} className="mr-2" />
                  下載報告
                </button>
                <button
                  onClick={() => {
                    setShowReportDetail(false);
                    setSelectedReport(null);
                    setSelectedPet(null);
                    setReportDetailTab('bloodType');
                  }}
                  className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  關閉
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CatForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">新增貓咪健康資料</h3>
          <button
            onClick={() => setShowCatForm(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleCatFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                貓咪姓名 *
              </label>
              <input
                type="text"
                value={catFormData.name}
                onChange={(e) => setCatFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="請輸入貓咪姓名"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                出生日期 *
              </label>
              <input
                type="date"
                value={catFormData.birthday}
                onChange={(e) => setCatFormData(prev => ({ ...prev, birthday: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                晶片號碼 *
              </label>
              <input
                type="text"
                value={catFormData.chipNumber}
                onChange={(e) => setCatFormData(prev => ({ ...prev, chipNumber: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="請輸入15位數晶片號碼"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                血型 *
              </label>
              <select
                value={catFormData.bloodType}
                onChange={(e) => setCatFormData(prev => ({ ...prev, bloodType: e.target.value }))}
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
                品種 *
              </label>
              <input
                type="text"
                value={catFormData.breed}
                onChange={(e) => setCatFormData(prev => ({ ...prev, breed: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="請輸入貓咪品種"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                體重 (kg) *
              </label>
              <input
                type="number"
                step="0.1"
                value={catFormData.weight}
                onChange={(e) => setCatFormData(prev => ({ ...prev, weight: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="請輸入體重"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                性別 *
              </label>
              <select
                value={catFormData.gender}
                onChange={(e) => setCatFormData(prev => ({ ...prev, gender: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                <option value="">請選擇性別</option>
                <option value="公">公</option>
                <option value="母">母</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                飼主姓名 *
              </label>
              <input
                type="text"
                value={catFormData.ownerName}
                onChange={(e) => setCatFormData(prev => ({ ...prev, ownerName: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="請輸入飼主姓名"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                飼主電話 *
              </label>
              <input
                type="tel"
                value={catFormData.ownerPhone}
                onChange={(e) => setCatFormData(prev => ({ ...prev, ownerPhone: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="請輸入聯絡電話"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                飼主地址 *
              </label>
              <input
                type="text"
                value={catFormData.ownerAddress}
                onChange={(e) => setCatFormData(prev => ({ ...prev, ownerAddress: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="請輸入完整地址"
                required
              />
            </div>
          </div>
          
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={() => setShowCatForm(false)}
              className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg"
            >
              新增貓咪資料
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderCatManagement = () => (
    <div className="space-y-6">
      {/* Add New Cat Button */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">貓咪健康資料管理</h3>
          <button 
            onClick={() => setShowCatForm(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus size={20} className="mr-2" />
            新增貓咪資料
          </button>
        </div>
        
        <div className="space-y-4">
          {mockCats.map(cat => (
            <div key={cat.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {cat.name} ({cat.bloodType})
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">品種：{cat.breed} | 性別：{cat.gender} | 體重：{cat.weight}kg</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      cat.healthStatus === '健康'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {cat.healthStatus}
                    </span>
                  </div>
                  
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="text-gray-600 dark:text-gray-400">
                      晶片號碼：{cat.chipNumber}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      最後檢查：{cat.lastCheckup}
                    </div>
                  </div>
                </div>
                
                <div className="ml-4 flex space-x-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm">
                    編輯
                  </button>
                  <button
                    onClick={() => {
                      const report = mockHealthReports.find(r => r.petId === cat.id);
                      if (report) {
                        setSelectedReport(report);
                        setSelectedPet(cat);
                        setShowReportDetail(true);
                        setReportDetailTab('bloodType');
                      }
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm flex items-center"
                  >
                    <Eye size={14} className="mr-1" />
                    檢視報告
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Health Reports */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">健康報告</h3>
        <div className="space-y-3">
          {mockHealthReports.map(report => (
            <div key={report.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{report.type}</h4>
                  <p className="text-gray-600 dark:text-gray-400">檢查日期：{report.date}</p>
                  <p className="text-gray-600 dark:text-gray-400">{report.details}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-sm ${
                    report.status === '正常'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {report.status}
                  </span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm">
                    編輯報告
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSearch = () => (
    <div className="space-y-6">
      {!isPaid && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
          <div className="flex items-start">
            <Lock size={24} className="text-yellow-600 dark:text-yellow-500 mr-3 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">查詢功能需要付費</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                升級為付費會員即可查詢供血貓資訊並使用緊急媒合功能。
              </p>
              <button 
                onClick={() => setShowPaymentModal(true)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                立即升級付費會員
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Filters */}
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${!isPaid ? 'opacity-50 pointer-events-none' : ''}`}>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">查詢供血貓</h3>
        
        {/* Search Box */}
        <div className="mb-6">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜尋供血貓名稱或飼主..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
        
        {/* Map */}
        <div className="relative h-64 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30">
            {/* Mock map markers for donors */}
            {filteredDonors.slice(0, 3).map((donor, index) => (
              <div
                key={donor.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${25 + index * 20}%`,
                  top: `${30 + index * 15}%`
                }}
              >
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-pulse">
                  {index + 1}
                </div>
                
                {/* Hover info */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 min-w-32 border border-gray-200 dark:border-gray-600">
                    <div className="text-xs">
                      <p className="font-semibold text-gray-900 dark:text-white">{donor.petName}</p>
                      <p className="text-gray-600 dark:text-gray-400">{donor.bloodType}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow">
              供血貓分布地圖
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              血型
            </label>
            <select
              value={searchFilters.bloodType}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, bloodType: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">所有血型</option>
              <option value="A型">A型</option>
              <option value="B型">B型</option>
              <option value="AB型">AB型</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              地區
            </label>
            <select
              value={searchFilters.region}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, region: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">所有地區</option>
              <option value="台北市">台北市</option>
              <option value="新北市">新北市</option>
              <option value="桃園市">桃園市</option>
              <option value="台中市">台中市</option>
              <option value="台南市">台南市</option>
              <option value="高雄市">高雄市</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              可用性
            </label>
            <select
              value={searchFilters.availability}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, availability: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">全部</option>
              <option value="available">可用</option>
              <option value="unavailable">不可用</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg flex items-center justify-center">
              <Search size={20} className="mr-2" />
              搜尋
            </button>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${!isPaid ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">搜尋結果</h3>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 dark:text-gray-400">找到 {filteredDonors.length} 隻供血貓</span>
            <button 
              onClick={handleEmergencyMatch}
              disabled={!isPaid}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <AlertTriangle size={16} className="mr-2" />
              緊急通知媒合
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredDonors.map(donor => (
            <div key={donor.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {donor.petName} ({donor.bloodType})
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">飼主：{donor.ownerName}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      donor.isAvailable
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {donor.isAvailable ? '可用' : '不可用'}
                    </span>
                  </div>
                  
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Phone size={16} className="mr-2" />
                      {donor.ownerPhone}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin size={16} className="mr-2" />
                      {donor.address}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    最後捐血：{donor.lastDonation}
                  </p>
                </div>
                
                <div className="ml-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    聯絡飼主
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">醫院資訊</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              獸醫師姓名
            </label>
            <input
              type="text"
              value={user.name}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              醫院名稱
            </label>
            <input
              type="text"
              value={user.hospitalName || ''}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              聯絡電話
            </label>
            <input
              type="tel"
              value={user.phone}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              電子信箱
            </label>
            <input
              type="email"
              value={user.email}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              readOnly
            />
          </div>
        </div>
        <div className="mt-6">
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg">
            更新資訊
          </button>
        </div>
      </div>

      <div className={`rounded-lg p-6 ${isPaid ? 'bg-green-50 dark:bg-green-900/20' : 'bg-yellow-50 dark:bg-yellow-900/20'}`}>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">服務狀態</h3>
        <div className="flex items-center justify-between">
          <div>
            {isPaid ? (
              <>
                <p className="text-green-600 dark:text-green-400 font-medium">✓ 已付費 - 可查詢供血貓資訊</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">註冊日期：2024-01-01</p>
              </>
            ) : (
              <>
                <p className="text-yellow-600 dark:text-yellow-400 font-medium">⚠ 未付費 - 功能受限</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">請完成付費以使用完整功能</p>
              </>
            )}
          </div>
          <div className="text-right">
            {isPaid ? (
              <>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">∞</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">無限查詢</p>
              </>
            ) : (
              <button 
                onClick={() => setShowPaymentModal(true)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg"
              >
                立即付費
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Payment Modal
  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">升級為付費會員</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">付費功能包含：</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• 無限制查詢供血貓資訊</li>
              <li>• 緊急通知媒合功能</li>
              <li>• 優先客服支援</li>
              <li>• 詳細健康報告存取</li>
            </ul>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600 dark:text-red-500">NT$ 5,000</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">一次性付費，終身使用</p>
          </div>
        </div>
        <div className="flex space-x-4 mt-6">
          <button
            onClick={() => setShowPaymentModal(false)}
            className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            取消
          </button>
          <button
            onClick={() => {
              setShowPaymentModal(false);
              setShowPaymentProcess(true);
            }}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
          >
            <CreditCard size={16} className="mr-2" />
            開始付費
          </button>
        </div>
      </div>
    </div>
  );

  // Payment Process Modal
  const PaymentProcessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
        {paymentStep === 1 && (
          <>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">選擇付款方式</h3>
            <div className="space-y-3">
              <button 
                onClick={() => setPaymentStep(2)}
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left"
              >
                <div className="font-medium text-gray-900 dark:text-white">信用卡付款</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Visa, MasterCard, JCB</div>
              </button>
              <button 
                onClick={() => setPaymentStep(2)}
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left"
              >
                <div className="font-medium text-gray-900 dark:text-white">銀行轉帳</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">ATM 轉帳或網路銀行</div>
              </button>
              <button 
                onClick={() => setPaymentStep(2)}
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left"
              >
                <div className="font-medium text-gray-900 dark:text-white">電子錢包</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">LINE Pay, Apple Pay</div>
              </button>
            </div>
            <button
              onClick={() => setShowPaymentProcess(false)}
              className="w-full mt-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              取消
            </button>
          </>
        )}

        {paymentStep === 2 && (
          <>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">付款資訊</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                  卡號
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    有效期限
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    安全碼
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                  持卡人姓名
                </label>
                <input
                  type="text"
                  placeholder="請輸入持卡人姓名"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setPaymentStep(1)}
                className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                上一步
              </button>
              <button
                onClick={() => setPaymentStep(3)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                確認付款
              </button>
            </div>
          </>
        )}

        {paymentStep === 3 && (
          <>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">付款成功！</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                您已成功升級為付費會員，現在可以使用所有功能。
              </p>
              <button
                onClick={handlePaymentComplete}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg"
              >
                開始使用
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <main className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">獸醫管理中心</h1>
          <p className="text-gray-600 dark:text-gray-400">歡迎回來，{user.hospitalName}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Side Menu */}
          <div className="lg:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('cats')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'cats'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <FileText size={20} className="inline mr-3" />
                  貓咪資料管理
                </button>
                <button
                  onClick={() => setActiveTab('search')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'search'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Search size={20} className="inline mr-3" />
                  查詢供血貓
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Building2 size={20} className="inline mr-3" />
                  醫院資料
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {activeTab === 'cats' && renderCatManagement()}
            {activeTab === 'search' && renderSearch()}
            {activeTab === 'profile' && renderProfile()}
          </div>
        </div>
      </div>

      {showPaymentModal && <PaymentModal />}
      {showPaymentProcess && <PaymentProcessModal />}
      {showCatForm && <CatForm />}
      {showReportDetail && <ReportDetailModal />}
    </main>
  );
};

export default VetDashboard;