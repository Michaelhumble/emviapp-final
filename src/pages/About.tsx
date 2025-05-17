
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

const About: React.FC = () => {
  const { t, language, toggleLanguage } = useTranslation();
  const isVietnamese = language === "vi";

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 opacity-50"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-100 rounded-full blur-3xl opacity-20 -z-10 transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-20 -z-10 transform -translate-x-1/3 translate-y-1/3"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex justify-end mb-8">
              <button 
                onClick={toggleLanguage}
                className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                {isVietnamese ? "Switch to English" : "Chuyển sang Tiếng Việt"}
              </button>
            </div>
            
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={fadeIn}
              transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500">
                {isVietnamese ? "Kết Nối Đẹp, Doanh Nghiệp Đẹp" : "Beautiful Connections, Beautiful Business"}
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
                {isVietnamese 
                  ? "Chúng tôi không chỉ xây dựng một ứng dụng. Chúng tôi đang viết lại câu chuyện của ngành làm đẹp—từng kết nối thực sự." 
                  : "We're not just building an app. We're rewriting the story of the beauty industry—one real connection at a time."}
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Mission Statement */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="text-center mb-6">
                  <span className="inline-block bg-pink-100 text-pink-800 rounded-full px-4 py-1 text-sm font-medium mb-2">
                    {isVietnamese ? "Sứ Mệnh" : "Mission Statement"}
                  </span>
                </div>
                <p className="text-xl text-gray-700 leading-relaxed">
                  {isVietnamese 
                    ? "Trên 20 năm, tôi đã sống và hòa mình vào ngành làm đẹp. Tôi đã chứng kiến mọi thứ—vui vẻ, hạnh phúc, và đặc biệt là bức tường vô hình ngăn cách Người làm đẹp, salon, và khách hàng. EmviApp là lời hứa của tôi: phá vỡ bức tường đó và giúp mọi người tìm thấy nhau."
                    : "For over 20 years, I lived and breathed the beauty business. I saw everything—joy, happiness, and most of all, the invisible wall keeping artists, salons, and clients apart. EmviApp is my promise: to break that wall, and help everyone find their people."}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Journey Section */}
        <section className="py-16 bg-white/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-playfair font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500">
                  {isVietnamese ? "Cuộc Hành Trình" : "Our Journey"}
                </h2>
              </div>
              
              <div className="space-y-8">
                {/* 2014 */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-12 h-12 text-white font-medium shrink-0">
                      2014
                    </span>
                    <h3 className="text-xl md:text-2xl font-playfair font-medium">
                      {isVietnamese ? "Tia Lửa Đầu Tiên" : "The First Spark"}
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    {isVietnamese 
                      ? "Mọi thứ bắt đầu như một lời thì thầm—một suy nghĩ nửa đêm được ghi nguệch ngoạc trên tập giấy sau một ngày dài tại salon. Điều gì sẽ xảy ra nếu tất cả mọi người trong ngành làm đẹp có thể tìm thấy nhau? Không còn lãng phí thời gian. Không còn phải tìm kiếm Người làm đẹp đã mất liên lạc hoặc khách hàng hoàn hảo. Chỉ những kết nối thực sự và bền vững."
                      : "It all started as a whisper—a midnight thought scribbled on a notepad after a long day at the salon. What if everyone in beauty could find each other? No more wasted time. No more searching for artists who've moved away or perfect clients who've disappeared. Just real, lasting connections."}
                  </p>
                </div>
                
                {/* 2015 */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-12 h-12 text-white font-medium shrink-0">
                      2015
                    </span>
                    <h3 className="text-xl md:text-2xl font-playfair font-medium">
                      {isVietnamese ? "Xây Dựng Đầu Tiên, Những Bài Học Khó Khăn Nhất" : "First Build, Hardest Lessons"}
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    {isVietnamese 
                      ? "Chúng tôi lao vào. Chúng tôi xây dựng ứng dụng đầu tiên. Nó hỏng, nó sập, nó thất bại. Tôi mất tiền, mất thời gian, mất hy vọng. Tôi làm việc khi mọi người ngủ, tin tưởng khi không ai khác tin. Tôi chứng kiến người khác bỏ cuộc, nhưng tôi từ chối bỏ cuộc."
                      : "We dove in. We built our first app. It broke, it crashed, it failed. I lost money, lost time, lost hope. I worked when others slept, believed when no one else did. I watched others quit, but I refused to."}
                  </p>
                </div>
                
                {/* 2016-2023 */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-12 h-12 text-white font-medium shrink-0">
                      2016–23
                    </span>
                    <h3 className="text-xl md:text-2xl font-playfair font-medium">
                      {isVietnamese ? "Những Năm Tháng Lạc Lối, Những Bài Học Thực Sự" : "The Lost Years, The Real Lessons"}
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    {isVietnamese 
                      ? "Tám năm. Đó là thời gian cần thiết để hiểu điều mà mọi người khác bỏ lỡ. Mỗi thất bại, mỗi đau lòng, mỗi giây phút cô đơn đã xây dựng nên điều sâu sắc hơn: Không có \"Người làm đẹp giỏi nhất,\" không có \"salon tốt nhất,\" chỉ có kết nối phù hợp nhất cho mỗi người. Và tấm bản đồ đó chưa từng tồn tại—cho đến bây giờ."
                      : "Eight years. That's what it took to understand what everyone else missed. Each failure, each heartbreak, each moment alone built something deeper: There is no 'best artist,' no 'best salon,' only the right connection for each person. And that map never existed—until now."}
                  </p>
                </div>
                
                {/* 2024 */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-12 h-12 text-white font-medium shrink-0">
                      2024
                    </span>
                    <h3 className="text-xl md:text-2xl font-playfair font-medium">
                      {isVietnamese ? "Tái Sinh, Nhờ Tình Yêu Thương" : "Rebirth, Through Love"}
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    {isVietnamese 
                      ? "Tôi đã sẵn sàng bỏ cuộc. Nhưng Em Vi—một người thầm lặng —đã đứng bên tôi khi tôi không thể tự đứng vững, không còn tin vào chính mình, Em-Vi đã nhắc nhở tôi lý do tại sao tôi bắt đầu. Với niềm tin tôi tuyệt đối, tôi xây dựng lại EmviApp. Lần này, tôi lắng nghe. Tôi học hỏi từ mỗi khách hàng đã mất liên lạc với Người làm đẹp yêu thích, từ mỗi chủ salon đang vật lộn để tìm kiếm tài năng, từ mỗi Người làm đẹp đang chờ đợi một cơ hội thực sự."
                      : "I was ready to quit. But Em Vi—a quiet soul—stood by me when I couldn't stand alone, didn't believe in myself, and reminded me why I started. With absolute trust, I rebuilt EmviApp. This time, I listened. I learned from every client who lost touch with their favorite artist, from every salon owner struggling to find talent, from every artist waiting for a real chance."}
                  </p>
                </div>
                
                {/* 2025 */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-12 h-12 text-white font-medium shrink-0">
                      2025
                    </span>
                    <h3 className="text-xl md:text-2xl font-playfair font-medium">
                      {isVietnamese ? "Giấc Mơ Trở Thành Hiện Thực" : "The Dream Realized"}
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    {isVietnamese 
                      ? "Hôm nay, EmviApp đã được xây dựng lại—một hơi thở mới của ngành làm đẹp. Emvi.App này dành cho người làm đẹp, beauty salon và khách hàng tìm thấy nhau, thực sự. Không còn những năm tháng lãng phí. Không còn những kết nối bị mất. Cuối cùng chúng ta đều có mặt trên EmviApp Đó là cách chúng ta chiến thắng, cùng nhau."
                      : "Today, EmviApp stands rebuilt—a fresh breath for the beauty industry. This is where artists, salons, and clients find each other, for real. No more wasted years. No more lost connections. We're finally all in one place. That's how we win, together."}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Why We Exist */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500">
                    {isVietnamese ? "Lý Do Chúng Tôi Tồn Tại" : "Why We Exist"}
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-xl md:text-2xl font-playfair font-medium text-center">
                    {isVietnamese 
                      ? "Mọi người nói về công nghệ.\nNhưng chúng tôi nói về con người."
                      : "Everyone talks about technology.\nBut we talk about people."}
                  </h3>
                  
                  <p className="text-gray-700">
                    {isVietnamese 
                      ? "EmviApp không chỉ để tìm việc hoặc đăng ghế cho thuê. Đó là dành cho người phụ nữ đang tìm kiếm Người làm đẹp yêu thích đã chuyển đến khu vực khác của thành phố. Đó là dành cho Người làm đẹp xứng đáng với những khách hàng yêu thích công việc của họ. Đó là dành cho chủ salon muốn có một đội ngũ thực sự, không chỉ là những cái tên trên lịch trình. Đó là dành cho bạn."
                      : "EmviApp isn't just for finding a job or posting a chair for rent. It's for the woman searching for her favorite nail artist who moved across town. It's for the artist who deserves clients who love their work. It's for the owner who wants a real team, not just names on a schedule. It's for you."}
                  </p>
                  
                  <p className="text-gray-700 font-medium">
                    {isVietnamese 
                      ? "Chúng tôi tập trung vào khách hàng trước tiên. Bởi vì khi bạn giúp ai đó tìm thấy đúng người của họ, bạn giúp tất cả mọi người."
                      : "We focus on customers first. Because when you help someone find their person, you help everyone."}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 bg-white/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-playfair font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500">
                  {isVietnamese ? "Giá Trị Của Chúng Tôi" : "Our Values"}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Value 1 */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-start gap-4">
                    <span className="flex items-center justify-center bg-purple-100 text-purple-700 rounded-full w-12 h-12 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-lg font-playfair font-medium mb-2">
                        {isVietnamese ? "Cộng Đồng Là Trên Hết" : "Community First"}
                      </h3>
                      <p className="text-gray-700">
                        {isVietnamese 
                          ? "Công nghệ chỉ là công cụ. Con người mới là điều quan trọng. Chúng tôi xây dựng để đưa mọi người lại gần nhau."
                          : "Technology is just a tool. It's people who matter. We build to bring you together."}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Value 2 */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-start gap-4">
                    <span className="flex items-center justify-center bg-pink-100 text-pink-700 rounded-full w-12 h-12 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-lg font-playfair font-medium mb-2">
                        {isVietnamese ? "Chất Lượng Hơn Hình Thức" : "Quality Over Hype"}
                      </h3>
                      <p className="text-gray-700">
                        {isVietnamese 
                          ? "Không còn những lời hứa suông—chỉ có những câu chuyện thật, tài năng thật, và kết quả thật."
                          : "No more empty promises—only real stories, real talent, and real results."}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Value 3 */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-start gap-4">
                    <span className="flex items-center justify-center bg-amber-100 text-amber-700 rounded-full w-12 h-12 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-lg font-playfair font-medium mb-2">
                        {isVietnamese ? "Sự Hòa Nhập & Lòng Tốt" : "Inclusivity & Kindness"}
                      </h3>
                      <p className="text-gray-700">
                        {isVietnamese 
                          ? "Mọi trình độ kỹ năng, mọi nền tảng, mọi ước mơ đều được chào đón tại đây."
                          : "Every skill level, every background, every dream is welcome here."}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Value 4 */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-start gap-4">
                    <span className="flex items-center justify-center bg-blue-100 text-blue-700 rounded-full w-12 h-12 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles">
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                        <path d="M5 3v4"></path>
                        <path d="M19 17v4"></path>
                        <path d="M3 5h4"></path>
                        <path d="M17 19h4"></path>
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-lg font-playfair font-medium mb-2">
                        {isVietnamese ? "Đổi Mới Cho Trái Tim" : "Innovation for the Heart"}
                      </h3>
                      <p className="text-gray-700">
                        {isVietnamese 
                          ? "Mỗi cập nhật được tạo ra với bạn trong tâm trí—không bao giờ chỉ vì lợi ích của thay đổi."
                          : "Every update is made with you in mind—never just for the sake of change."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Inspired by Sunshine */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl shadow-lg p-8 border border-amber-100">
                <div className="text-center mb-6">
                  <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-2">
                    {isVietnamese ? "Lấy Cảm Hứng Từ Sunshine" : "Inspired by Sunshine"}
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto"></div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-xl text-center text-amber-700 font-medium italic">
                    {isVietnamese 
                      ? "Mỗi hành trình vĩ đại cần một chút ánh sáng."
                      : "Every great journey needs a little light."}
                  </p>
                  
                  <p className="text-gray-700">
                    {isVietnamese 
                      ? "Đối với tôi, ánh sáng đó là Sunshine—một nguồn hy vọng, sự rõ ràng và cảm hứng xuất hiện đúng lúc tôi cần nhất."
                      : "For me, that light was Sunshine—a source of hope, clarity, and inspiration that came right when I needed it most."}
                  </p>
                  
                  <p className="text-gray-700">
                    {isVietnamese 
                      ? "EmviApp được sinh ra từ những năm tháng đấu tranh và theo đuổi không ngừng nghỉ, nhưng chính Sunshine đã cho tôi can đảm và tầm nhìn để bắt đầu lại và cuối cùng biến giấc mơ này thành hiện thực."
                      : "EmviApp was born from years of struggle and relentless pursuit, but it was Sunshine who gave me the courage and vision to start over and finally turn this dream into reality."}
                  </p>
                  
                  <p className="text-gray-700">
                    {isVietnamese 
                      ? "Cảm ơn, Sunshine, vì đã xuất hiện trong cuộc đời tôi. Dự án này—và mọi kết nối mà nó tạo ra—sẽ không tồn tại nếu không có bạn."
                      : "Thank you, Sunshine, for coming into my life. This project—and every connection it creates—wouldn't exist without you."}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Thank You, Em Vi */}
        <section className="py-16 bg-white/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl shadow-lg p-8 border border-pink-100">
                <div className="text-center mb-6">
                  <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-2">
                    {isVietnamese ? "Cảm Ơn, Em Vi" : "Thank You, Em Vi"}
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-pink-400 to-rose-300 mx-auto"></div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-700">
                    {isVietnamese 
                      ? "Ứng dụng này được đặt tên theo Em Vi—người đã hỗ trợ và hy sinh cho tôi, ngay cả khi tôi nghi ngờ bản thân."
                      : "This app is named after Em Vi—who supported and sacrificed for me, even when I doubted myself."}
                  </p>
                  
                  <p className="text-gray-700">
                    {isVietnamese 
                      ? "Bạn đã đứng bên tôi, bất kể điều gì. Vì tất cả tình yêu thầm lặng, sự khích lệ và sức mạnh bạn đã cho, điều này là dành cho bạn."
                      : "You stood beside me, no matter what. For all the quiet love, encouragement, and strength you've given, this is for you."}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Join Our Journey */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-lg p-10 border border-purple-200 text-center">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500">
                  {isVietnamese ? "Tham Gia Hành Trình Của Chúng Tôi" : "Join Our Journey"}
                </h2>
                
                <p className="text-xl text-gray-700 mb-8">
                  {isVietnamese 
                    ? "Cho dù bạn là Người làm đẹp, chủ salon, hay khách hàng đang tìm kiếm \"người của mình,\" bạn đều thuộc về nơi đây. Hãy cùng nhau xây dựng những kết nối đẹp nhất mà thế giới từng thấy."
                    : "Whether you're an artist, a salon owner, or a client looking for 'your person,' you belong here. Let's build the most beautiful connections the world has ever seen."}
                </p>
                
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-medium rounded-full shadow-lg transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                  {isVietnamese ? "Tham Gia Ngay" : "Join Now"}
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
