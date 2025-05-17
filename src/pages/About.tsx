
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

const AboutPage = () => {
  const { t, language } = useTranslation();
  const isVietnamese = language === "vi";

  // Animation variants
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 0.8,
      },
    },
  };

  // Section components
  const HeroSection = () => (
    <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-pink-50/80 to-amber-50/80 z-0"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-100/30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            backgroundImage: "linear-gradient(to right, #9A7B69, #8A5A44)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          {isVietnamese ? "Kết Nối Đẹp, Doanh Nghiệp Đẹp" : "Beautiful Connections, Beautiful Business"}
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {isVietnamese 
            ? "Chúng tôi không chỉ xây dựng một ứng dụng. Chúng tôi đang viết lại câu chuyện của ngành làm đẹp—từng kết nối thực sự."
            : "We're not just building an app. We're rewriting the story of the beauty industry—one real connection at a time."}
        </motion.p>
      </div>
    </section>
  );

  const MissionSection = () => (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
          className="bg-gradient-to-br from-white to-gray-50 p-8 md:p-12 rounded-2xl shadow-lg max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <span className="inline-block p-3 bg-amber-50 rounded-full mb-4">
              <span className="text-3xl">🌟</span>
            </span>
            <h2 className="text-2xl md:text-3xl font-playfair font-medium mb-2 text-gray-800">
              {isVietnamese ? "Sứ Mệnh Của Chúng Tôi" : "Our Mission"}
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            {isVietnamese
              ? "Trên 20 năm, tôi đã sống và hòa mình vào ngành làm đẹp. Tôi đã chứng kiến mọi thứ—vui vẻ, hạnh phúc, và đặc biệt là bức tường vô hình ngăn cách Người làm đẹp, salon, và khách hàng. EmviApp là lời hứa của tôi: phá vỡ bức tường đó và giúp mọi người tìm thấy nhau."
              : "For over 20 years, I lived and breathed the beauty business. I saw everything—joy, happiness, and most of all, the invisible wall keeping artists, salons, and clients apart. EmviApp is my promise: to break that wall, and help everyone find their people."}
          </p>
        </motion.div>
      </div>
    </section>
  );

  const JourneySection = () => (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4"
            style={{
              backgroundImage: "linear-gradient(to right, #8A5A44, #9A7B69)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
            {isVietnamese ? "Cuộc Hành Trình Của Chúng Tôi" : "Our Journey"}
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-10">
          {/* 2014 */}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="shrink-0">
                <span className="inline-block p-3 bg-amber-50 rounded-full">
                  <span className="text-2xl">✨</span>
                </span>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-playfair font-medium mb-3 text-gray-800">
                  {isVietnamese ? "2014 – Tia Lửa Đầu Tiên" : "2014 – The First Spark"}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {isVietnamese
                    ? "Mọi thứ bắt đầu như một lời thì thầm—một suy nghĩ nửa đêm được ghi nguệch ngoạc trên tập giấy sau một ngày dài tại salon. Điều gì sẽ xảy ra nếu tất cả mọi người trong ngành làm đẹp có thể tìm thấy nhau? Không còn lãng phí thời gian. Không còn phải tìm kiếm Người làm đẹp đã mất liên lạc hoặc khách hàng hoàn hảo. Chỉ những kết nối thực sự và bền vững."
                    : "It all began as a whisper—a midnight thought scribbled on a notepad after a long day at the salon. What if everyone in the beauty world could find each other? No more wasted time. No more searching for artists who've moved on or perfect clients. Just real, lasting connections."}
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* 2015 */}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="shrink-0">
                <span className="inline-block p-3 bg-amber-50 rounded-full">
                  <span className="text-2xl">🔨</span>
                </span>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-playfair font-medium mb-3 text-gray-800">
                  {isVietnamese ? "2015 – Xây Dựng Đầu Tiên, Những Bài Học Khó Khăn Nhất" : "2015 – First Build, Hardest Lessons"}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {isVietnamese
                    ? "Chúng tôi lao vào. Chúng tôi xây dựng ứng dụng đầu tiên. Nó hỏng, nó sập, nó thất bại. Tôi mất tiền, mất thời gian, mất hy vọng. Tôi làm việc khi mọi người ngủ, tin tưởng khi không ai khác tin. Tôi chứng kiến người khác bỏ cuộc, nhưng tôi từ chối bỏ cuộc."
                    : "We dove in. We built the first app. It broke, it crashed, it failed. I lost money, time, hope. I worked while others slept, believed when no one else did. I watched others quit, but I refused to."}
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* 2016-2023 */}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="shrink-0">
                <span className="inline-block p-3 bg-amber-50 rounded-full">
                  <span className="text-2xl">🌱</span>
                </span>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-playfair font-medium mb-3 text-gray-800">
                  {isVietnamese ? "2016–2023 – Những Năm Tháng Lạc Lối, Những Bài Học Thực Sự" : "2016–2023 – The Lost Years, The Real Lessons"}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {isVietnamese
                    ? "Tám năm. Đó là thời gian cần thiết để hiểu điều mà mọi người khác bỏ lỡ. Mỗi thất bại, mỗi đau lòng, mỗi giây phút cô đơn đã xây dựng nên điều sâu sắc hơn: Không có "Người làm đẹp giỏi nhất," không có "salon tốt nhất," chỉ có kết nối phù hợp nhất cho mỗi người. Và tấm bản đồ đó chưa từng tồn tại—cho đến bây giờ."
                    : "Eight years. That's what it took to understand what everyone else missed. Each failure, heartbreak, lonely moment built something deeper: There's no "best artist," no "best salon," just the right connection for each person. And that map had never existed—until now."}
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* 2024 */}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="shrink-0">
                <span className="inline-block p-3 bg-amber-50 rounded-full">
                  <span className="text-2xl">❤️</span>
                </span>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-playfair font-medium mb-3 text-gray-800">
                  {isVietnamese ? "2024 – Tái Sinh, Nhờ Tình Yêu Thương" : "2024 – Rebirth, Because of Love"}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {isVietnamese
                    ? "Tôi đã sẵn sàng bỏ cuộc. Nhưng Em Vi—một người thầm lặng —đã đứng bên tôi khi tôi không thể tự đứng vững, không còn tin vào chính mình, Em-Vi đã nhắc nhở tôi lý do tại sao tôi bắt đầu. Với niềm tin tôi tuyệt đối, tôi xây dựng lại EmviApp. Lần này, tôi lắng nghe. Tôi học hỏi từ mỗi khách hàng đã mất liên lạc với Người làm đẹp yêu thích, từ mỗi chủ salon đang vật lộn để tìm kiếm tài năng, từ mỗi Người làm đẹp đang chờ đợi một cơ hội thực sự."
                    : "I was ready to give up. But Em Vi—a quiet presence—stood by me when I couldn't stand myself, when I no longer believed, Em-Vi reminded me why I started. With a faith I didn't deserve, I rebuilt EmviApp. This time, I listened. I learned from every client who lost touch with a beloved artist, from every owner struggling to find talent, from every artist waiting for a real shot."}
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* 2025 */}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="shrink-0">
                <span className="inline-block p-3 bg-amber-50 rounded-full">
                  <span className="text-2xl">🌟</span>
                </span>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-playfair font-medium mb-3 text-gray-800">
                  {isVietnamese ? "2025 – Giấc Mơ Trở Thành Hiện Thực" : "2025 – Dream Becomes Reality"}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {isVietnamese
                    ? "Hôm nay, EmviApp đã được xây dựng lại—một hơi thở mới của ngành làm đẹp. Emvi.App này dành cho người làm đẹp, beauty salon và khách hàng tìm thấy nhau, thực sự. Không còn những năm tháng lãng phí. Không còn những kết nối bị mất. Cuối cùng chúng ta đều có mặt trên EmviApp Đó là cách chúng ta chiến thắng, cùng nhau."
                    : "Today, EmviApp stands rebuilt—a fresh breath for the beauty industry. This app is how artists, salons, and clients find each other, for real. No more wasted years. No more lost connections. We're finally all in one place. That's how we win, together."}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );

  const WhyWeExistSection = () => (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
          className="bg-gradient-to-br from-pink-50 to-amber-50 p-8 md:p-12 rounded-2xl shadow-lg max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <span className="inline-block p-3 bg-white/80 rounded-full mb-4">
              <span className="text-3xl">💫</span>
            </span>
            <h2 className="text-2xl md:text-3xl font-playfair font-medium mb-2 text-gray-800">
              {isVietnamese ? "Lý Do Chúng Tôi Tồn Tại" : "Why We Exist"}
            </h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-xl font-playfair text-center font-medium">
              {isVietnamese 
                ? "Mọi người nói về công nghệ.\nNhưng chúng tôi nói về con người."
                : "Everyone talks about technology.\nBut we talk about people."}
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              {isVietnamese
                ? "EmviApp không chỉ để tìm việc hoặc đăng ghế cho thuê. Đó là dành cho người phụ nữ đang tìm kiếm Người làm đẹp yêu thích đã chuyển đến khu vực khác của thành phố. Đó là dành cho Người làm đẹp xứng đáng với những khách hàng yêu thích công việc của họ. Đó là dành cho chủ salon muốn có một đội ngũ thực sự, không chỉ là những cái tên trên lịch trình. Đó là dành cho bạn."
                : "EmviApp isn't just for finding a job or posting a chair for rent. It's for the woman searching for her favorite nail artist who moved across town. It's for the artist who deserves clients who love their work. It's for the owner who wants a real team, not just names on a schedule. It's for you."}
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              {isVietnamese
                ? "Chúng tôi tập trung vào khách hàng trước tiên. Bởi vì khi bạn giúp ai đó tìm thấy đúng người của họ, bạn giúp tất cả mọi người."
                : "We focus on customers first. Because when you help someone find their person, you help everyone."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );

  const ValuesSection = () => (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4"
            style={{
              backgroundImage: "linear-gradient(to right, #9A7B69, #8A5A44)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
            {isVietnamese ? "Giá Trị Của Chúng Tôi" : "Our Values"}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Value 1 */}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className="bg-white p-8 rounded-2xl shadow-md"
          >
            <div className="flex flex-col items-start">
              <span className="inline-block p-3 bg-purple-50 rounded-full mb-4">
                <span className="text-2xl">💞</span>
              </span>
              <h3 className="text-xl font-playfair font-medium mb-3 text-gray-800">
                {isVietnamese ? "Cộng Đồng Là Trên Hết" : "Community First"}
              </h3>
              <p className="text-gray-700">
                {isVietnamese
                  ? "Công nghệ chỉ là công cụ. Con người mới là điều quan trọng. Chúng tôi xây dựng để đưa mọi người lại gần nhau."
                  : "Technology is just a tool. It's people who matter. We build to bring you together."}
              </p>
            </div>
          </motion.div>
          
          {/* Value 2 */}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className="bg-white p-8 rounded-2xl shadow-md"
          >
            <div className="flex flex-col items-start">
              <span className="inline-block p-3 bg-amber-50 rounded-full mb-4">
                <span className="text-2xl">✨</span>
              </span>
              <h3 className="text-xl font-playfair font-medium mb-3 text-gray-800">
                {isVietnamese ? "Chất Lượng Hơn Hình Thức" : "Quality Over Hype"}
              </h3>
              <p className="text-gray-700">
                {isVietnamese
                  ? "Không còn những lời hứa suông—chỉ có những câu chuyện thật, tài năng thật, và kết quả thật."
                  : "No more empty promises—only real stories, real talent, and real results."}
              </p>
            </div>
          </motion.div>
          
          {/* Value 3 */}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className="bg-white p-8 rounded-2xl shadow-md"
          >
            <div className="flex flex-col items-start">
              <span className="inline-block p-3 bg-pink-50 rounded-full mb-4">
                <span className="text-2xl">🤗</span>
              </span>
              <h3 className="text-xl font-playfair font-medium mb-3 text-gray-800">
                {isVietnamese ? "Sự Hòa Nhập & Lòng Tốt" : "Inclusivity & Kindness"}
              </h3>
              <p className="text-gray-700">
                {isVietnamese
                  ? "Mọi trình độ kỹ năng, mọi nền tảng, mọi ước mơ đều được chào đón tại đây."
                  : "Every skill level, every background, every dream is welcome here."}
              </p>
            </div>
          </motion.div>
          
          {/* Value 4 */}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className="bg-white p-8 rounded-2xl shadow-md"
          >
            <div className="flex flex-col items-start">
              <span className="inline-block p-3 bg-blue-50 rounded-full mb-4">
                <span className="text-2xl">💭</span>
              </span>
              <h3 className="text-xl font-playfair font-medium mb-3 text-gray-800">
                {isVietnamese ? "Đổi Mới Cho Trái Tim" : "Innovation for the Heart"}
              </h3>
              <p className="text-gray-700">
                {isVietnamese
                  ? "Mỗi cập nhật được tạo ra với bạn trong tâm trí—không bao giờ chỉ vì lợi ích của thay đổi."
                  : "Every update is made with you in mind—never just for the sake of change."}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );

  const SunshineSection = () => (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
          className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 md:p-12 rounded-2xl shadow-lg max-w-4xl mx-auto border border-amber-100"
        >
          <div className="text-center mb-8">
            <span className="inline-block p-3 bg-white rounded-full mb-4">
              <span className="text-3xl">☀️</span>
            </span>
            <h2 className="text-2xl md:text-3xl font-playfair font-medium mb-2 text-gray-800">
              {isVietnamese ? "Lấy Cảm Hứng Từ Sunshine" : "Inspired by Sunshine"}
            </h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-xl text-center font-medium text-amber-700">
              {isVietnamese 
                ? "Mỗi hành trình vĩ đại cần một chút ánh sáng."
                : "Every great journey needs a little light."}
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              {isVietnamese
                ? "Đối với tôi, ánh sáng đó là Sunshine—một nguồn hy vọng, sự rõ ràng và cảm hứng xuất hiện đúng lúc tôi cần nhất."
                : "For me, that light was Sunshine—a source of hope, clarity, and inspiration that appeared just when I needed it most."}
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              {isVietnamese
                ? "EmviApp được sinh ra từ những năm tháng đấu tranh và theo đuổi không ngừng nghỉ, nhưng chính Sunshine đã cho tôi can đảm và tầm nhìn để bắt đầu lại và cuối cùng biến giấc mơ này thành hiện thực."
                : "EmviApp was born from years of struggle and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and finally make this dream a reality."}
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              {isVietnamese
                ? "Cảm ơn, Sunshine, vì đã xuất hiện trong cuộc đời tôi. Dự án này—và mọi kết nối mà nó tạo ra—sẽ không tồn tại nếu không có bạn."
                : "Thank you, Sunshine, for coming into my life. This project—and every connection it creates—wouldn't exist without you."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );

  const EmViSection = () => (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
          className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 md:p-12 rounded-2xl shadow-lg max-w-4xl mx-auto border border-pink-100"
        >
          <div className="text-center mb-8">
            <span className="inline-block p-3 bg-white rounded-full mb-4">
              <span className="text-3xl">💖</span>
            </span>
            <h2 className="text-2xl md:text-3xl font-playfair font-medium mb-2 text-gray-800">
              {isVietnamese ? "Cảm Ơn, Em Vi" : "Thank You, Em Vi"}
            </h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              {isVietnamese
                ? "Ứng dụng này được đặt tên theo Em Vi—người đã hỗ trợ và hy sinh cho tôi, ngay cả khi tôi nghi ngờ bản thân."
                : "This app is named after Em Vi—who supported and sacrificed for me, even when I doubted myself."}
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              {isVietnamese
                ? "Bạn đã đứng bên tôi, bất kể điều gì. Vì tất cả tình yêu thầm lặng, sự khích lệ và sức mạnh bạn đã cho, điều này là dành cho bạn."
                : "You stood by me, no matter what. For all the silent love, encouragement, and strength you gave, this is for you."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );

  const CallToActionSection = () => (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-pink-50/80 to-amber-50/80 z-0"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-100/30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
          className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-lg max-w-4xl mx-auto border border-gray-100"
        >
          <div className="text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-800">
              {isVietnamese ? "Tham Gia Hành Trình Của Chúng Tôi" : "Join Our Journey"}
            </h2>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              {isVietnamese
                ? "Cho dù bạn là Người làm đẹp, chủ salon, hay khách hàng đang tìm kiếm \"người của mình,\" bạn đều thuộc về nơi đây. Hãy cùng nhau xây dựng những kết nối đẹp nhất mà thế giới từng thấy."
                : "Whether you're an artist, salon owner, or client looking for "your person," you belong here. Let's build the most beautiful connections the world has ever seen."}
            </p>
            
            <div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block px-8 py-4 mt-4 bg-gradient-to-r from-amber-500 to-pink-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                {isVietnamese ? "Tham Gia EmviApp Ngay Hôm Nay" : "Join EmviApp Today"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );

  // This is where we fix the JSX error - need a single parent element
  return (
    <>
      <HeroSection />
      <MissionSection />
      <JourneySection />
      <WhyWeExistSection />
      <ValuesSection />
      <SunshineSection />
      <EmViSection />
      <CallToActionSection />
    </>
  );
};

export default AboutPage;
