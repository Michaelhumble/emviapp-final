
import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { MobileButton } from "@/components/ui/mobile-button";
import { GradientBackground } from "@/components/ui/gradient-background";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageToggleButton from "@/components/home/missing-piece/LanguageToggleButton";

const About = () => {
  const { isVietnamese, toggleLanguage } = useTranslation();

  return (
    <div className="bg-white min-h-screen">
      <Container className="pt-20 pb-24">
        {/* Language toggle in top right */}
        <div className="absolute top-20 right-4 md:right-8 z-10">
          <LanguageToggleButton
            isVietnamese={isVietnamese}
            toggleLanguage={toggleLanguage}
          />
        </div>

        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            {isVietnamese ? "Câu Chuyện Của Chúng Tôi" : "Our Story"}
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            {isVietnamese
              ? "Kết nối những người tài năng trong ngành làm đẹp với khách hàng trân trọng giá trị của họ."
              : "Building bridges between talented beauty professionals and the clients who value them."}
          </p>
        </motion.div>

        {/* Why We Started section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-16 lg:mb-24"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            {isVietnamese ? "Vì Sao Chúng Tôi Sáng Lập EmviApp" : "Why We Started EmviApp"}
          </h2>
          <div className="space-y-6 text-gray-700">
            <p>
              {isVietnamese
                ? "EmviApp ra đời từ một quan sát đơn giản: ngành làm đẹp cần một nền tảng thực sự thấu hiểu trái tim và linh hồn của nó. Tại các salon trên khắp nước Mỹ, chúng tôi chứng kiến biết bao tài năng tỏa sáng, nhưng cũng đối mặt với những khó khăn thực sự—rào cản ngôn ngữ, khác biệt văn hóa, và khoảng cách công nghệ mà các nền tảng cũ chưa giải quyết được."
                : "EmviApp was born from a simple observation: the beauty industry needed a platform that truly understood its heart and soul. In salons across America, we saw incredible talent flourishing alongside real challenges—language barriers, cultural misunderstandings, and digital gaps that traditional platforms weren't addressing."}
            </p>
            <p>
              {isVietnamese
                ? "Từ một ước mơ kết nối cộng đồng, EmviApp đã trở thành mái nhà chung, nơi nghệ sĩ được tôn vinh, salon phát triển, và khách hàng dễ dàng tìm thấy tài năng xuất sắc với sự tin tưởng."
                : "What started as a vision to connect communities has grown into something more: a home where artists are celebrated, where salons can thrive, and where clients can discover exceptional talent with confidence and ease."}
            </p>
          </div>
        </motion.div>

        {/* Personal Connection section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto mb-16 lg:mb-24"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            {isVietnamese ? "Sự Gắn Bó Cá Nhân" : "A Personal Connection"}
          </h2>
          <div className="space-y-6 text-gray-700">
            <p>
              {isVietnamese
                ? "Lớn lên trong một gia đình gắn bó với ngành làm đẹp, tôi hiểu rõ cả tài năng vượt trội lẫn thách thức của người Việt trong ngành này tại Mỹ. Tôi đã thấy người thân và đồng nghiệp mình phải vật lộn để được công nhận xứng đáng với tay nghề của họ."
                : "Growing up in a family deeply connected to the beauty industry, I witnessed firsthand both the immense talent and the unique challenges faced by Vietnamese beauty professionals in America. I saw my family members and their colleagues struggle to have their skills recognized despite their exceptional artistry."}
            </p>
            <p>
              {isVietnamese
                ? "EmviApp không chỉ là công nghệ—mà còn là cầu nối văn hóa, tôn vinh nghề thủ công, và là lời hứa rằng tài năng sẽ luôn được ghi nhận. Chúng tôi xây dựng nền tảng này bằng tình yêu và sự thấu hiểu xuất phát từ chính trải nghiệm sống."
                : "EmviApp is more than just technology—it's a bridge between cultures, a celebration of craft, and a promise that talent will always find its rightful recognition. We've built this platform with love and understanding that can only come from lived experience."}
            </p>
          </div>
        </motion.div>

        {/* What Makes Us Different section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto mb-16 lg:mb-24"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            {isVietnamese ? "Điều Làm Chúng Tôi Khác Biệt" : "What Makes Us Different"}
          </h2>
          <p className="mb-8 text-gray-700">
            {isVietnamese
              ? "Mỗi quyết định, từ thiết kế đến phát triển, đều bắt đầu bằng một câu hỏi: \"Điều này sẽ giúp gì cho cộng đồng?\" Nền tảng của chúng tôi được tạo nên bởi những người từng trải trong ngành, không chỉ dựa vào khảo sát thị trường."
              : "Every decision we make, from design to development, starts with a simple question: \"How will this help our community?\" Our platform is crafted by people who understand the beauty industry from lived experience—not just market research."}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">
                {isVietnamese ? "Thấu Hiểu Văn Hóa" : "Cultural Understanding"}
              </h3>
              <p className="text-gray-700">
                {isVietnamese
                  ? "Chúng tôi tôn trọng cả tiếng Việt và tiếng Anh, hiểu rằng ngôn ngữ mẹ đẻ luôn mang sức mạnh gắn kết."
                  : "We embrace both English and Vietnamese, recognizing the power of communicating in one's native language."}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">
                {isVietnamese ? "Cộng Đồng Là Trên Hết" : "Community First"}
              </h3>
              <p className="text-gray-700">
                {isVietnamese
                  ? "Mọi tính năng đều nhằm tăng kết nối giữa nghệ sĩ, chủ salon và khách hàng."
                  : "Every feature is built to strengthen connections between artists, salon owners, and clients."}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">
                {isVietnamese ? "Tôn Vinh Sự Thật" : "Authentic Representation"}
              </h3>
              <p className="text-gray-700">
                {isVietnamese
                  ? "Chúng tôi giới thiệu tài năng và câu chuyện thật, tôn vinh nghệ thuật phía sau mỗi dịch vụ."
                  : "We showcase real talent and real stories, highlighting the artistry behind every service."}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">
                {isVietnamese ? "Minh Bạch & Công Bằng" : "Fair and Transparent"}
              </h3>
              <p className="text-gray-700">
                {isVietnamese
                  ? "Nền tảng giúp cả doanh nghiệp lẫn khách hàng phát triển trong sự rõ ràng và tin tưởng."
                  : "We've built a platform where both businesses and customers can thrive with clarity and trust."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Our Journey section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-4xl mx-auto mb-16 lg:mb-24"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
            {isVietnamese ? "Hành Trình Của Chúng Tôi" : "Our Journey"}
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-gray-300"></div>

            {/* Timeline items */}
            <div className="space-y-12 md:space-y-24 relative">
              {/* 2014 */}
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="md:w-1/2 md:pr-12 mb-4 md:mb-0 md:text-right">
                  <h3 className="text-xl font-bold text-primary">2014</h3>
                  <h4 className="text-lg font-semibold mb-2">
                    {isVietnamese ? "Ý Tưởng Ra Đời" : "The Idea is Born"}
                  </h4>
                  <p className="text-gray-700">
                    {isVietnamese
                      ? "Khát vọng xây dựng một cộng đồng làm đẹp kết nối và ý nghĩa được hình thành."
                      : "A vision to create meaningful connections within the beauty community begins to take shape."}
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-12 relative">
                  <div className="absolute left-0 md:left-0 top-0 md:top-1/2 transform md:-translate-y-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-white shadow-md"></div>
                </div>
              </div>

              {/* 2015 */}
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="md:order-2 md:w-1/2 md:pl-12 mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-primary">2015</h3>
                  <h4 className="text-lg font-semibold mb-2">
                    {isVietnamese ? "Phiên Bản Đầu Tiên" : "First Build"}
                  </h4>
                  <p className="text-gray-700">
                    {isVietnamese
                      ? "Bắt đầu phát triển nền tảng với mục tiêu thấu hiểu nhu cầu riêng biệt của nghệ sĩ và chủ salon."
                      : "Initial platform development focusing on understanding the unique needs of artists and salon owners."}
                  </p>
                </div>
                <div className="md:order-1 md:w-1/2 md:pr-12 relative">
                  <div className="absolute left-0 md:right-0 top-0 md:top-1/2 transform md:-translate-y-1/2 md:translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-white shadow-md"></div>
                </div>
              </div>

              {/* 2016-2023 */}
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="md:w-1/2 md:pr-12 mb-4 md:mb-0 md:text-right">
                  <h3 className="text-xl font-bold text-primary">2016-2023</h3>
                  <h4 className="text-lg font-semibold mb-2">
                    {isVietnamese ? "Không Ngừng Phát Triển" : "Iteration and Growth"}
                  </h4>
                  <p className="text-gray-700">
                    {isVietnamese
                      ? "Nhiều năm học hỏi, điều chỉnh, và đổi mới để phục vụ cộng đồng ngày một tốt hơn."
                      : "Years of learning, adjusting, and evolving to better serve our community through continuous improvement."}
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-12 relative">
                  <div className="absolute left-0 md:left-0 top-0 md:top-1/2 transform md:-translate-y-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-white shadow-md"></div>
                </div>
              </div>

              {/* 2025 */}
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="md:order-2 md:w-1/2 md:pl-12 mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-primary">2025</h3>
                  <h4 className="text-lg font-semibold mb-2">
                    {isVietnamese ? "Chặng Đường Mới" : "A New Chapter"}
                  </h4>
                  <p className="text-gray-700">
                    {isVietnamese
                      ? "Mở rộng tầm nhìn, phát triển tính năng mới, kết nối sâu sắc hơn và cam kết gắn bó với cộng đồng."
                      : "Expanding our vision with enhanced features, deeper connections, and a renewed commitment to our community."}
                  </p>
                </div>
                <div className="md:order-1 md:w-1/2 md:pr-12 relative">
                  <div className="absolute left-0 md:right-0 top-0 md:top-1/2 transform md:-translate-y-1/2 md:translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-white shadow-md"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Inspired by Sunshine section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-3xl mx-auto mb-16 lg:mb-24"
        >
          <GradientBackground
            variant="premium"
            className="p-8 md:p-12 rounded-2xl"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {isVietnamese ? "Nguồn Cảm Hứng Từ Ánh Nắng ☀️" : "Inspired by Sunshine ☀️"}
              </h2>
              <p className="text-lg italic">
                {isVietnamese ? "Mỗi hành trình lớn đều cần một tia sáng." : "Every great journey needs a little light."}
              </p>
            </div>

            <div className="space-y-4 text-gray-700">
              <p>
                {isVietnamese
                  ? "Với tôi, ánh sáng đó là Sunshine—nguồn hy vọng, sự sáng suốt và cảm hứng xuất hiện đúng lúc tôi cần nhất."
                  : "For me, that light is Sunshine—a source of hope, clarity, and inspiration that appeared just when I needed it most."}
              </p>
              <p>
                {isVietnamese
                  ? "EmviApp được xây dựng từ bao năm kinh nghiệm, khó khăn và kiên trì, nhưng chính Sunshine đã cho tôi dũng khí và tầm nhìn để bắt đầu lại và biến giấc mơ này thành hiện thực."
                  : "EmviApp was born from years of experience, struggle, and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and finally bring this dream to life."}
              </p>
              <p>
                {isVietnamese
                  ? "Cảm ơn Sunshine đã đến trong cuộc đời tôi. Dự án này—và tất cả những kết nối mà nó tạo ra—sẽ không tồn tại nếu thiếu bạn."
                  : "Thank you, Sunshine, for happening in my life. This project—and every connection it creates—would not exist without you."}
              </p>
            </div>
          </GradientBackground>
        </motion.div>

        {/* Thank You, EmVi section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="max-w-3xl mx-auto mb-16 lg:mb-24"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            {isVietnamese ? "Cảm Ơn, Emvi" : "Thank You, EmVi"}
          </h2>
          <div className="text-center text-gray-700">
            <p className="mb-4">
              {isVietnamese
                ? "Tên gọi của chúng tôi xuất phát từ lòng biết ơn. Emvi tượng trưng cho những khả năng vô tận khi người tài kết nối với khách hàng biết trân trọng. Đó là sức mạnh của việc được nhìn nhận, được hỗ trợ và khích lệ. Trên hết, đó là lời cảm ơn gửi đến từng nghệ sĩ, chủ salon, và khách hàng đã tạo nên cộng đồng này. Cảm ơn vì đã tin tưởng chúng tôi với hành trình, doanh nghiệp, và ước mơ làm đẹp của bạn."
                : "This app is named after EmVi—the person who supported and sacrificed for me, even when I doubted myself. You stood by me, no matter what. For all the silent love, encouragement, and strength you gave, this is for you."}
            </p>
          </div>
        </motion.div>

        {/* Values section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-4xl mx-auto mb-16 lg:mb-24"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
            {isVietnamese ? "Giá Trị Cốt Lõi" : "Our Values"}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3">
                {isVietnamese ? "Cộng Đồng" : "Community"}
              </h3>
              <p className="text-gray-700">
                {isVietnamese
                  ? "Chúng tôi tin vào sức mạnh đoàn kết. Thành công ngọt ngào hơn khi được sẻ chia, thử thách nhẹ nhàng hơn khi cùng vượt qua."
                  : "We believe in the power of coming together. Success is sweeter when shared, and challenges are lighter when faced together."}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3">
                {isVietnamese ? "Xuất Sắc" : "Excellence"}
              </h3>
              <p className="text-gray-700">
                {isVietnamese
                  ? "Chúng tôi không ngừng nỗ lực đạt sự xuất sắc, xứng đáng với tâm huyết của người làm đẹp."
                  : "We strive for excellence in everything we do, honoring the dedication our beauty professionals bring to their craft."}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3">
                {isVietnamese ? "Tin Tưởng" : "Trust"}
              </h3>
              <p className="text-gray-700">
                {isVietnamese
                  ? "Chúng tôi xây dựng mối quan hệ dựa trên sự minh bạch, uy tín và tin cậy, tạo nên nền tảng vững chắc."
                  : "We build relationships based on trust, transparency, and reliability, creating a platform everyone can depend on."}
              </p>
            </div>

            <div className="text-center md:col-start-1 md:col-end-2">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3">
                {isVietnamese ? "Đổi Mới" : "Innovation"}
              </h3>
              <p className="text-gray-700">
                {isVietnamese
                  ? "Chúng tôi luôn tìm cách đổi mới, giải quyết vấn đề và nâng cao trải nghiệm cho cộng đồng."
                  : "We embrace progress and continuously seek new ways to solve problems and enhance experiences for our community."}
              </p>
            </div>

            <div className="text-center md:col-start-2 md:col-end-4">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3">
                {isVietnamese ? "Tôn Vinh" : "Celebration"}
              </h3>
              <p className="text-gray-700">
                {isVietnamese
                  ? "Chúng tôi tôn vinh vẻ đẹp dưới mọi hình thức, nghệ thuật sáng tạo và sự tự tin nó mang lại cho mỗi người."
                  : "We celebrate beauty in all its forms, the artistry behind it, and the confidence it inspires in everyone it touches."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-xl md:text-2xl mb-6">
            {isVietnamese
              ? "Bạn đã sẵn sàng trở thành một phần của cộng đồng EmviApp chưa?"
              : "Ready to be part of something beautiful? Join our community today."}
          </h2>
          <MobileButton size="lg" className="min-w-[200px]">
            {isVietnamese ? "Bắt đầu hành trình của bạn cùng EmviApp ngay hôm nay." : "Start Your Journey with EmviApp"}
          </MobileButton>
        </motion.div>
      </Container>
    </div>
  );
};

export default About;
