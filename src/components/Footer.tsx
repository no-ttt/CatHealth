import React from 'react';
import { Droplet, Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Droplet size={28} className="text-red-500 mr-2" />
              <span className="text-xl font-bold">
                Cat<span className="text-red-500">Health</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              致力於透過捐血拯救貓咪生命。
              我們的使命是確保每隻需要幫助的貓咪都能獲得救命的血液製品。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Youtube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">快速連結</h3>
            <ul className="space-y-2">
              <li>
                <a href="/CatHealth/" className="text-gray-400 hover:text-red-500 transition-colors">首頁</a>
              </li>
              <li>
                <a href="/CatHealth/pages/about/index.html" className="text-gray-400 hover:text-red-500 transition-colors">關於我們</a>
              </li>
              <li>
                <a href="/CatHealth/pages/donate/index.html" className="text-gray-400 hover:text-red-500 transition-colors">捐血資訊</a>
              </li>
              <li>
                <a href="/CatHealth/pages/locations/index.html" className="text-gray-400 hover:text-red-500 transition-colors">據點查詢</a>
              </li>
              <li>
                <a href="/CatHealth/pages/emergency/index.html" className="text-gray-400 hover:text-red-500 transition-colors">緊急申請</a>
              </li>
              <li>
                <a href="/CatHealth/#faq" className="text-gray-400 hover:text-red-500 transition-colors">常見問題</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">資源</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">供血貓資格</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">捐血流程</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">貓咪血型</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">成功案例</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">研究與出版</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">獸醫合作夥伴</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">聯絡我們</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail size={20} className="text-red-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">info@CatHealth.org</span>
              </li>
              <li className="flex items-start">
                <Phone size={20} className="text-red-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">(02) 555-CATS</span>
              </li>
              <li>
                <a 
                  href="/CatHealth/pages/contact/index.html"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition-colors px-4"
                >
                  聯絡表單
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p className="mb-2">© {new Date().getFullYear()} CatHealth 組織。版權所有。</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-red-500 transition-colors">隱私政策</a>
            <a href="#" className="hover:text-red-500 transition-colors">服務條款</a>
            <a href="#" className="hover:text-red-500 transition-colors">Cookie 政策</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;