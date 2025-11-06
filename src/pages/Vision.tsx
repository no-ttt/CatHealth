import React from 'react';
import { Target, Lightbulb, Users, Award, Heart, Shield, TrendingUp, Globe, FileText, Mail, Phone, MapPin } from 'lucide-react';

const Vision: React.FC = () => {
  const leadershipTeam = [
    {
      name: '陳建華',
      role: '創辦人 / 榮譽理事長',
      company: '台北中央動物醫院',
      image: 'https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg'
    },
    {
      name: '王雅雯',
      role: '理事長',
      company: '新北愛心動物診所',
      image: 'https://images.pexels.com/photos/5723961/pexels-photo-5723961.jpeg'
    },
    {
      name: '李志明',
      role: '常務副理事長',
      company: '台中寵物醫療中心',
      image: 'https://images.pexels.com/photos/5722129/pexels-photo-5722129.jpeg'
    },
    {
      name: '張美玲',
      role: '副理事長',
      company: '高雄動物醫院',
      image: 'https://images.pexels.com/photos/4269878/pexels-photo-4269878.jpeg'
    },
    {
      name: '劉育銘',
      role: '副理事長',
      company: '桃園寵物診所',
      image: 'https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg'
    },
    {
      name: '林淑芬',
      role: '秘書長',
      company: '台灣動物保護協會',
      image: 'https://images.pexels.com/photos/3279196/pexels-photo-3279196.jpeg'
    }
  ];

  const coreValues = [
    {
      icon: Heart,
      title: '愛心與關懷',
      description: '以愛心為出發點，關懷每一隻需要幫助的貓咪，提供最溫暖的醫療照護服務。'
    },
    {
      icon: Shield,
      title: '專業與安全',
      description: '堅持最高的專業標準，確保每一次捐血和輸血過程都安全無虞，保障貓咪健康。'
    },
    {
      icon: Users,
      title: '合作與共享',
      description: '建立完善的醫療網絡，促進獸醫診所、飼主與志工之間的合作與資源共享。'
    },
    {
      icon: TrendingUp,
      title: '創新與進步',
      description: '持續引進先進的醫療技術與設備，提升貓血庫的服務品質與效率。'
    }
  ];

  const milestones = [
    {
      year: '2018',
      title: '協會成立',
      description: '台灣貓血庫協會正式成立，開始建立貓咪捐血系統。'
    },
    {
      year: '2019',
      title: '首座血庫啟用',
      description: '於台北設立第一座專業貓血庫中心，開始提供血液儲存服務。'
    },
    {
      year: '2020',
      title: '全台網絡擴展',
      description: '合作診所擴展至全台50家，建立完整的捐血與輸血網絡。'
    },
    {
      year: '2021',
      title: '緊急救援系統',
      description: '推出24/7緊急血液配送服務，為急診貓咪提供即時支援。'
    },
    {
      year: '2022',
      title: '教育推廣計畫',
      description: '啟動全台巡迴講座，提升民眾對貓咪捐血的認識與重視。'
    },
    {
      year: '2024',
      title: '數位化轉型',
      description: '推出線上平台，讓飼主可以更便捷地註冊、查詢與申請用血服務。'
    }
  ];

  return (
    <main className="pt-20 bg-white dark:bg-gray-900">
      <section className="relative py-24 bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              關於台灣貓血庫協會
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              我們致力於建立完善的貓咪捐血系統，透過專業的醫療服務與愛心網絡，
              為每一隻需要輸血的貓咪提供及時的生命支援。
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  協會簡介
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p>
                    台灣貓血庫協會成立於2018年，是台灣第一個專注於貓咪捐血與輸血服務的非營利組織。
                    我們深知貓咪在面臨重大疾病或手術時，常常因為缺乏合適的血液來源而失去寶貴的生命。
                  </p>
                  <p>
                    因此，我們建立了一套完整的貓咪捐血系統，從供血貓的健康檢查、血型配對、
                    血液採集到安全儲存，每一個環節都經過嚴格的專業把關。我們與全台超過50家動物醫院合作，
                    建立起綿密的醫療網絡，確保每隻需要輸血的貓咪都能獲得及時的救助。
                  </p>
                  <p>
                    截至目前，我們已經成功拯救超過5000隻貓咪的生命，並持續擴大服務範圍，
                    期許能讓更多飼主了解貓咪捐血的重要性，一同守護更多珍貴的生命。
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg"
                  alt="貓咪醫療照護"
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-red-600 dark:bg-red-700 text-white p-6 rounded-lg shadow-xl">
                  <div className="text-4xl font-bold">5000+</div>
                  <div className="text-sm">拯救生命數</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                願景與使命
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                為台灣的貓咪建立最完善的血液救援系統
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-red-600 dark:text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">願景</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  成為台灣最專業、最值得信賴的貓咪血液銀行，讓每一隻需要輸血的貓咪都能獲得及時的救助，
                  不再因為缺血而失去生命。我們期許建立一個充滿愛心與專業的醫療網絡，
                  讓台灣的貓咪醫療照護水準達到國際水平。
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mr-4">
                    <Lightbulb className="w-6 h-6 text-red-600 dark:text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">使命</h3>
                </div>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-red-600 dark:text-red-500 mr-2">•</span>
                    <span>建立完善的貓咪捐血與輸血系統</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 dark:text-red-500 mr-2">•</span>
                    <span>提供24/7緊急血液救援服務</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 dark:text-red-500 mr-2">•</span>
                    <span>推廣貓咪捐血的重要性與知識</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 dark:text-red-500 mr-2">•</span>
                    <span>確保每一次輸血過程的安全與品質</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                核心價值
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                我們堅守的四大核心價值
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="w-8 h-8 text-red-600 dark:text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                發展歷程
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                從成立至今，我們持續成長與進步
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-red-200 dark:bg-red-900/30"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                        <div className="text-2xl font-bold text-red-600 dark:text-red-500 mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                    <div className="relative z-10">
                      <div className="w-8 h-8 bg-red-600 dark:bg-red-700 rounded-full border-4 border-white dark:border-gray-900"></div>
                    </div>
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                組織架構
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                專業的領導團隊，為貓咪健康把關
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadershipTeam.map((member, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-red-600 dark:text-red-500 font-medium mb-2">
                      {member.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {member.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-red-600 to-orange-600 dark:from-red-700 dark:to-orange-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                加入我們的行列
              </h2>
              <p className="text-xl text-white/90">
                成為會員，一起守護更多貓咪的生命
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    法人會員
                  </h3>
                  <Award className="w-8 h-8 text-red-600 dark:text-red-500" />
                </div>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-red-600 dark:text-red-500 mb-2">
                    NT$ 10,000
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">每年</div>
                </div>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-6">
                  <li className="flex items-start">
                    <span className="text-red-600 dark:text-red-500 mr-2">✓</span>
                    <span>優先使用血液配送服務</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 dark:text-red-500 mr-2">✓</span>
                    <span>專業醫療技術培訓課程</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 dark:text-red-500 mr-2">✓</span>
                    <span>參與協會決策與活動</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 dark:text-red-500 mr-2">✓</span>
                    <span>品牌曝光與行銷支援</span>
                  </li>
                </ul>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors">
                  申請法人會員
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    個人會員
                  </h3>
                  <Users className="w-8 h-8 text-red-600 dark:text-red-500" />
                </div>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-red-600 dark:text-red-500 mb-2">
                    NT$ 5,000
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">每年</div>
                </div>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-6">
                  <li className="flex items-start">
                    <span className="text-red-600 dark:text-red-500 mr-2">✓</span>
                    <span>免費健康檢查服務</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 dark:text-red-500 mr-2">✓</span>
                    <span>優先預約捐血服務</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 dark:text-red-500 mr-2">✓</span>
                    <span>參加會員專屬活動</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 dark:text-red-500 mr-2">✓</span>
                    <span>接收最新醫療資訊</span>
                  </li>
                </ul>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors">
                  申請個人會員
                </button>
              </div>
            </div>

            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
              <h4 className="font-bold text-lg mb-3">申請方式</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start">
                  <FileText className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>填寫線上申請表格</span>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>提供相關證明文件</span>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>等待審核通知</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="flex items-center justify-center mb-3">
                  <Phone className="w-6 h-6 text-red-600 dark:text-red-500 mr-2" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">聯絡電話</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">0800-123-456</p>
              </div>
              <div>
                <div className="flex items-center justify-center mb-3">
                  <Mail className="w-6 h-6 text-red-600 dark:text-red-500 mr-2" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">電子信箱</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">info@catbloodbank.org.tw</p>
              </div>
              <div>
                <div className="flex items-center justify-center mb-3">
                  <MapPin className="w-6 h-6 text-red-600 dark:text-red-500 mr-2" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">辦公地址</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">台北市信義區信義路五段7號</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Vision;
