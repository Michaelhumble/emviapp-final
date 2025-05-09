
import React from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import Footer from "@/components/layout/Footer";
import { useTranslation } from "@/hooks/useTranslation";

const About = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="pt-16 md:pt-24 pb-12 md:pb-20 px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl font-serif font-medium text-gray-900 mb-6">
              {t("The Beauty of Connection", "Kết Nối Đẹp")}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {t(
                "Born from the heart of the Vietnamese beauty community, EmviApp exists to bridge cultural divides, amplify talent, and create opportunities for those who make the world more beautiful.",
                "Ra đời từ trái tim của cộng đồng làm đẹp Việt Nam, EmviApp tồn tại để xóa bỏ rào cản văn hóa, tôn vinh tài năng, và tạo cơ hội cho những người làm cho thế giới trở nên đẹp đẽ hơn."
              )}
            </p>
          </motion.div>
        </section>

        {/* Our Story Section */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-2xl md:text-3xl font-serif font-medium text-gray-900 mb-8">
                {t("Our Story", "Câu Chuyện Của Chúng Tôi")}
              </h2>
              
              <div className="prose prose-lg text-gray-700 max-w-none">
                <p>
                  {t(
                    "Growing up as the child of Vietnamese immigrants in the beauty industry, I witnessed firsthand the struggle for recognition that many talented artists face. Language barriers, cultural misunderstandings, and lack of representation created invisible walls that kept exceptional talent hidden.",
                    "Lớn lên là con của những người nhập cư Việt Nam trong ngành làm đẹp, tôi đã chứng kiến trực tiếp cuộc đấu tranh để được công nhận mà nhiều nghệ sĩ tài năng phải đối mặt. Rào cản ngôn ngữ, hiểu lầm văn hóa, và sự thiếu đại diện đã tạo ra những bức tường vô hình khiến tài năng xuất sắc bị che khuất."
                  )}
                </p>
                
                <p>
                  {t(
                    "EmviApp was born from a simple truth: the beauty industry thrives on human connection. The gentle hands that perfect your nails, the artist who transforms your appearance, and the business owner who creates a welcoming space – these professionals deserve more than just recognition. They deserve true appreciation.",
                    "EmviApp được sinh ra từ một sự thật đơn giản: ngành công nghiệp làm đẹp phát triển dựa trên kết nối con người. Đôi bàn tay khéo léo làm đẹp móng của bạn, người nghệ sĩ biến đổi diện mạo của bạn, và chủ doanh nghiệp tạo ra một không gian chào đón – những chuyên gia này xứng đáng được nhiều hơn là sự công nhận. Họ xứng đáng được trân trọng thực sự."
                  )}
                </p>
                
                <p>
                  {t(
                    "What began as a dream to help my family's salon is now a mission to transform how the entire beauty industry connects, communicates, and grows together.",
                    "Điều bắt đầu như một ước mơ giúp đỡ tiệm của gia đình tôi giờ đã trở thành sứ mệnh để thay đổi cách toàn bộ ngành công nghiệp làm đẹp kết nối, giao tiếp và phát triển cùng nhau."
                  )}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What Makes Us Different Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-2xl md:text-3xl font-serif font-medium text-gray-900 mb-8">
                {t("What Makes Us Different", "Điều Khiến Chúng Tôi Khác Biệt")}
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">
                    {t("Built With Love, Not Just Code", "Được Xây Dựng Bằng Tình Yêu, Không Chỉ Là Mã")}
                  </h3>
                  <p className="text-gray-700">
                    {t(
                      "Every decision we make, from design to development, starts with a simple question: "How will this help our community?" Our platform is crafted by people who understand the beauty industry from lived experience—not just market research.",
                      "Mỗi quyết định chúng tôi đưa ra, từ thiết kế đến phát triển, bắt đầu với một câu hỏi đơn giản: "Điều này sẽ giúp cộng đồng của chúng ta như thế nào?" Nền tảng của chúng tôi được tạo nên bởi những người hiểu ngành làm đẹp từ trải nghiệm sống thực tế—không chỉ từ nghiên cứu thị trường."
                    )}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">
                    {t("Authentic Representation", "Đại Diện Xác Thực")}
                  </h3>
                  <p className="text-gray-700">
                    {t(
                      "We recognize and celebrate the incredible contributions of Vietnamese and Asian artists to the American beauty landscape. Our platform ensures their stories, talents, and dreams are not just included but celebrated.",
                      "Chúng tôi công nhận và tôn vinh những đóng góp đáng kinh ngạc của các nghệ sĩ Việt Nam và châu Á cho bức tranh làm đẹp của Mỹ. Nền tảng của chúng tôi đảm bảo câu chuyện, tài năng và ước mơ của họ không chỉ được đưa vào mà còn được tôn vinh."
                    )}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">
                    {t("Trust Through Understanding", "Tin Tưởng Thông Qua Hiểu Biết")}
                  </h3>
                  <p className="text-gray-700">
                    {t(
                      "We bridge communication gaps with technology that understands cultural nuances and removes language barriers. When everyone can express themselves fully, magic happens.",
                      "Chúng tôi bắc cầu khoảng cách giao tiếp với công nghệ hiểu biết sắc thái văn hóa và xóa bỏ rào cản ngôn ngữ. Khi mọi người có thể thể hiện bản thân đầy đủ, điều kỳ diệu sẽ xảy ra."
                    )}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">
                    {t("Community, Not Competition", "Cộng Đồng, Không Phải Cạnh Tranh")}
                  </h3>
                  <p className="text-gray-700">
                    {t(
                      "We believe that a rising tide lifts all boats. Our platform is designed to foster collaboration, mentorship, and mutual growth across the beauty community.",
                      "Chúng tôi tin rằng thủy triều dâng sẽ nâng tất cả thuyền lên. Nền tảng của chúng tôi được thiết kế để thúc đẩy hợp tác, sự cố vấn và sự phát triển lẫn nhau trong cộng đồng làm đẹp."
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Closing Message */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-purple-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-serif font-medium text-gray-900 mb-6">
                {t("Our Promise", "Lời Hứa Của Chúng Tôi")}
              </h2>
              
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                {t(
                  "EmviApp will always honor the hands that create beauty, the minds that imagine new possibilities, and the hearts that welcome clients from all walks of life. We're more than a platform—we're a testament to the belief that when talent meets opportunity, everyone wins.",
                  "EmviApp sẽ luôn tôn vinh đôi bàn tay tạo ra vẻ đẹp, khối óc tưởng tượng những khả năng mới, và trái tim chào đón khách hàng từ mọi tầng lớp xã hội. Chúng tôi không chỉ là một nền tảng—chúng tôi là minh chứng cho niềm tin rằng khi tài năng gặp cơ hội, tất cả đều chiến thắng."
                )}
              </p>
              
              <p className="text-lg md:text-xl font-medium text-emvi-accent">
                {t(
                  "With pride in our roots and eyes on the future, we invite you to join us in this journey.",
                  "Với niềm tự hào về nguồn gốc và hướng tới tương lai, chúng tôi mời bạn tham gia cùng chúng tôi trong hành trình này."
                )}
              </p>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </Layout>
  );
};

export default About;
