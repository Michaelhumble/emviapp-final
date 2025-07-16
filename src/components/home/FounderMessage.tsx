
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const FounderMessage = () => {
  const englishContent = {
    title: "✨ Founder's Message",
    message: `To everyone who believes beauty changes lives:
We see your hard work, your late nights, and the silent sacrifices no one else understands.
We know the dreams you carry and the pressure you feel—to make people look and feel their best, to build a better future for your family.
EmviApp exists because you deserve more: more recognition, more respect, more real opportunity.
This is your community—a place to be seen, supported, and celebrated.
Thank you for inspiring us every day. Together, we're making the beauty world more human.`,
    signature: "— The EmviApp Team"
  };

  const vietnameseContent = {
    title: "✨ Thông điệp Người sáng lập",
    message: `Gửi đến những người làm đẹp bằng cả trái tim:
EmviApp hiểu nỗi vất vả, nỗi lo, và cả những ước mơ thầm lặng của bạn.
Chúng tôi biết cảm giác mệt mỏi, những hy sinh vì gia đình, vì khách hàng, vì một ngày mai tốt đẹp hơn.
EmviApp ra đời để bạn không còn phải tự mình cố gắng—ở đây, bạn được lắng nghe, tôn trọng và nâng đỡ.
Cộng đồng này là chỗ dựa, là nơi bạn thực sự thuộc về.
Cảm ơn bạn đã làm đẹp cho cuộc sống này.
Chúng ta cùng nhau thay đổi ngành làm đẹp, bắt đầu từ sự yêu thương và chân thành.`,
    signature: "— Đội ngũ EmviApp"
  };

  const MessageBlock = ({ content, delay }: { content: typeof englishContent; delay: number }) => (
    <motion.div 
      className="relative group mb-16 last:mb-0"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
    >
      {/* Section Title */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair flex items-center justify-center gap-3"
          style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #8b5cf6 50%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          <Sparkles className="text-yellow-400" size={32} />
          {content.title.replace('✨ ', '')}
        </h2>
      </motion.div>

      {/* Glassmorphism card */}
      <div 
        className="relative bg-white/15 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-12 lg:p-16 border border-white/20 overflow-hidden group-hover:shadow-3xl transition-all duration-700"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.15), 0 0 0 1px rgba(255,255,255,0.1)'
        }}
      >
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 via-pink-300/20 to-amber-400/20 p-[1px] group-hover:from-purple-400/40 group-hover:via-pink-300/40 group-hover:to-amber-400/40 transition-all duration-700">
          <div className="h-full w-full rounded-2xl bg-transparent" />
        </div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
        
        <div className="relative z-10">
          {/* Message content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay + 0.4 }}
            className="space-y-8"
          >
            <div className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground font-inter font-bold tracking-wide">
              {content.message.split('\n').map((line, index) => (
                <p key={index} className="mb-6 last:mb-0">
                  {line}
                </p>
              ))}
            </div>
            
            {/* Signature */}
            <div className="pt-8 text-right">
              <p 
                className="text-xl md:text-2xl font-playfair italic"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {content.signature}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-200/15 via-pink-200/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tr from-indigo-200/15 via-blue-200/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating sparkles */}
        <div className="absolute top-20 left-1/4 text-yellow-300/40 animate-pulse text-2xl">✨</div>
        <div className="absolute top-32 right-1/3 text-purple-300/30 animate-pulse text-xl" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-32 left-1/3 text-pink-300/40 animate-pulse text-lg" style={{ animationDelay: '2.5s' }}>✨</div>
        <div className="absolute bottom-20 right-1/4 text-indigo-300/30 animate-pulse text-xl" style={{ animationDelay: '3.5s' }}>✨</div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* English Block */}
        <MessageBlock content={englishContent} delay={0.2} />
        
        {/* Vietnamese Block */}
        <MessageBlock content={vietnameseContent} delay={0.6} />
      </div>
    </section>
  );
};

export default FounderMessage;
