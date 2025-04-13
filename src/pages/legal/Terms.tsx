
import React from 'react';
import Layout from '@/components/layout/Layout';
import { getLanguagePreference } from '@/utils/languagePreference';

const Terms = () => {
  const language = getLanguagePreference();
  
  const translations = {
    en: {
      title: 'Terms of Service',
      subtitle: 'Please read these terms carefully before using our services.',
      lastUpdated: 'Last updated:',
      sections: [
        {
          title: '1. Introduction',
          content: 'These Terms of Service govern your use of the EmviApp platform and services provided by EmviApp Inc. By accessing or using our platform, you agree to be bound by these Terms.'
        },
        {
          title: '2. Definitions',
          content: 'Throughout these Terms, "EmviApp," "we," "us," and "our" refer to EmviApp Inc., its subsidiaries, and affiliates. "You" and "your" refer to the individual or entity using our platform and services.'
        },
        {
          title: '3. Account Registration',
          content: 'To use certain features of our platform, you may need to register for an account. You agree to provide accurate and complete information during the registration process and to update such information to keep it accurate and current.'
        },
        {
          title: '4. User Conduct',
          content: 'You agree not to use our platform for any illegal or unauthorized purpose. You must not, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).'
        },
        {
          title: '5. Content',
          content: 'You are responsible for all content you upload, post, or otherwise transmit through our platform. We do not claim ownership of your content, but you grant us a worldwide, non-exclusive, royalty-free license to use, display, and distribute your content in connection with our platform.'
        },
        {
          title: '6. Termination',
          content: 'We may terminate or suspend your account and access to our platform immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms.'
        },
        {
          title: '7. Limitation of Liability',
          content: 'In no event shall EmviApp, its officers, directors, employees, or agents, be liable to you for any direct, indirect, incidental, special, punitive, or consequential damages whatsoever resulting from any use or inability to use our platform or services.'
        },
        {
          title: '8. Governing Law',
          content: 'These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.'
        },
        {
          title: '9. Changes to Terms',
          content: 'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. It is your responsibility to check our Terms periodically for changes.'
        },
        {
          title: '10. Contact Us',
          content: 'If you have any questions about these Terms, please contact us at legal@emviapp.com.'
        }
      ]
    },
    vi: {
      title: 'Điều Khoản Dịch Vụ',
      subtitle: 'Vui lòng đọc kỹ các điều khoản này trước khi sử dụng dịch vụ của chúng tôi.',
      lastUpdated: 'Cập nhật lần cuối:',
      sections: [
        {
          title: '1. Giới Thiệu',
          content: 'Những Điều Khoản Dịch Vụ này chi phối việc sử dụng nền tảng EmviApp và các dịch vụ được cung cấp bởi EmviApp Inc. Bằng cách truy cập hoặc sử dụng nền tảng của chúng tôi, bạn đồng ý bị ràng buộc bởi các Điều Khoản này.'
        },
        {
          title: '2. Định Nghĩa',
          content: 'Trong các Điều Khoản này, "EmviApp," "chúng tôi," và "của chúng tôi" đề cập đến EmviApp Inc., các công ty con và các chi nhánh của nó. "Bạn" và "của bạn" đề cập đến cá nhân hoặc tổ chức sử dụng nền tảng và dịch vụ của chúng tôi.'
        },
        {
          title: '3. Đăng Ký Tài Khoản',
          content: 'Để sử dụng một số tính năng của nền tảng, bạn có thể cần phải đăng ký tài khoản. Bạn đồng ý cung cấp thông tin chính xác và đầy đủ trong quá trình đăng ký và cập nhật thông tin đó để giữ cho nó chính xác và hiện tại.'
        },
        {
          title: '4. Hành Vi Người Dùng',
          content: 'Bạn đồng ý không sử dụng nền tảng của chúng tôi cho bất kỳ mục đích bất hợp pháp hoặc trái phép nào. Bạn không được, trong việc sử dụng Dịch vụ, vi phạm bất kỳ luật nào trong khu vực của bạn (bao gồm nhưng không giới hạn ở luật bản quyền).'
        },
        {
          title: '5. Nội Dung',
          content: 'Bạn chịu trách nhiệm về tất cả nội dung bạn tải lên, đăng, hoặc truyền thông qua nền tảng của chúng tôi. Chúng tôi không tuyên bố sở hữu nội dung của bạn, nhưng bạn cấp cho chúng tôi giấy phép toàn cầu, không độc quyền, miễn phí bản quyền để sử dụng, hiển thị và phân phối nội dung của bạn liên quan đến nền tảng của chúng tôi.'
        },
        {
          title: '6. Chấm Dứt',
          content: 'Chúng tôi có thể chấm dứt hoặc đình chỉ tài khoản của bạn và quyền truy cập vào nền tảng của chúng tôi ngay lập tức, không cần thông báo trước hoặc trách nhiệm pháp lý, vì bất kỳ lý do nào, bao gồm nhưng không giới hạn nếu bạn vi phạm các Điều Khoản này.'
        },
        {
          title: '7. Giới Hạn Trách Nhiệm',
          content: 'Trong mọi trường hợp, EmviApp, các cán bộ, giám đốc, nhân viên hoặc đại lý của nó, sẽ không chịu trách nhiệm với bạn về bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt, trừng phạt hoặc do hậu quả nào phát sinh từ bất kỳ việc sử dụng hoặc không thể sử dụng nền tảng hoặc dịch vụ của chúng tôi.'
        },
        {
          title: '8. Luật Áp Dụng',
          content: 'Các Điều Khoản này sẽ được điều chỉnh và hiểu theo luật của Tiểu bang California, không quan tâm đến các quy định xung đột pháp luật của nó.'
        },
        {
          title: '9. Thay Đổi Điều Khoản',
          content: 'Chúng tôi bảo lưu quyền, theo quyết định riêng của mình, sửa đổi hoặc thay thế các Điều Khoản này bất cứ lúc nào. Bạn có trách nhiệm kiểm tra Điều Khoản của chúng tôi định kỳ để biết các thay đổi.'
        },
        {
          title: '10. Liên Hệ Với Chúng Tôi',
          content: 'Nếu bạn có bất kỳ câu hỏi nào về các Điều Khoản này, vui lòng liên hệ với chúng tôi tại legal@emviapp.com.'
        }
      ]
    }
  };

  const t = translations[language === 'vi' ? 'vi' : 'en'];
  
  return (
    <Layout>
      <div className="container max-w-4xl py-12 px-4 md:py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{t.title}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
          <p className="text-sm text-muted-foreground mt-2">{t.lastUpdated} April 13, 2025</p>
        </div>
        
        <div className="bg-card rounded-lg shadow-sm p-6 md:p-8">
          <div className="space-y-8">
            {t.sections.map((section, index) => (
              <div key={index} className="space-y-2">
                <h2 className="text-xl font-semibold">{section.title}</h2>
                <p className="text-muted-foreground">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
