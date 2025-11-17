import React from 'react';
import { AlertTriangle, Phone, Clock, ArrowRight } from 'lucide-react';
import { CTAButton } from './Navigation';

const EmergencySection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-red-600/40 to-red-800/40 dark:from-red-700/40 dark:to-red-900/40 text-white" id="emergency">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="inline-flex items-center bg-white/10 rounded-full px-4 py-2 mb-6">
              <AlertTriangle size={18} className="mr-2" />
              <span className="font-medium">緊急用血申請</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">急需用血？</h2>
            
            <p className="text-white/90 text-lg mb-8 max-w-xl">
              獸醫專業人員：如果您有需要緊急輸血的貓咪患者，
              我們可以幫助您聯繫可用的血液製品。
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <Phone size={24} className="mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold">緊急專線</h3>
                  <p className="text-white/90">24小時服務：(02) 555-CATS</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock size={24} className="mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold">快速回應</h3>
                  <p className="text-white/90">我們致力於在2小時內處理並配送緊急申請</p>
                </div>
              </div>
            </div>
            
            <CTAButton href="/CatHealth/pages/emergency/index.html">申請緊急用血</CTAButton>
          </div>
          
          <div className="md:w-1/2 bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6">快速註冊</h3>
            
            <div className="space-y-4 mb-6">
              <a
                href="/CatHealth/pages/pet-registration/index.html"
                className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-lg p-4 text-left transition-all duration-200"
              >
                <h4 className="font-semibold text-white mb-2">寵物飼主註冊</h4>
                <p className="text-white/80 text-sm">註冊您的愛貓，建立健康檔案並加入捐血計畫</p>
              </a>
              
              <a
                href="/CatHealth/pages/vet-registration/index.html"
                className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-lg p-4 text-left transition-all duration-200"
              >
                <h4 className="font-semibold text-white mb-2">獸醫診所註冊</h4>
                <p className="text-white/80 text-sm">加入我們的合作夥伴網絡，獲得血液媒合服務</p>
              </a>
            </div>
            
            <div className="mt-4 text-center">
              <a 
                href="/CatHealth/pages/about/index.html"
                className="inline-flex items-center text-white/80 text-sm hover:text-white transition-colors"
              >
                了解更多緊急用血計畫
                <ArrowRight size={14} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencySection;