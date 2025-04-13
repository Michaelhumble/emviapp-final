
import React from 'react';
import Layout from '@/components/layout/Layout';
import { getLanguagePreference } from '@/utils/languagePreference';

const Privacy = () => {
  const language = getLanguagePreference();
  
  const translations = {
    en: {
      title: 'Privacy Policy',
      subtitle: 'How we collect, use, and protect your personal information.',
      lastUpdated: 'Last updated:',
      sections: [
        {
          title: '1. Information We Collect',
          content: 'We collect information when you register on our platform, sign in, complete a form, or engage with our services. The information we collect may include your name, email address, phone number, location, and professional details relevant to the beauty industry.'
        },
        {
          title: '2. How We Use Your Information',
          content: 'We use the information we collect to provide, maintain, and improve our services, to develop new features and services, to process transactions, to send periodic emails, to personalize your experience, and to administer promotions, surveys, or other site features.'
        },
        {
          title: '3. Information Sharing',
          content: 'We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except as described in this policy. This does not include trusted third parties who assist us in operating our platform, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.'
        },
        {
          title: '4. Cookies and Tracking',
          content: 'We use cookies and similar tracking technologies to track activity on our platform and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.'
        },
        {
          title: '5. Data Security',
          content: 'We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.'
        },
        {
          title: '6. Third-Party Links',
          content: 'Occasionally, at our discretion, we may include or offer third-party products or services on our platform. These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites.'
        },
        {
          title: '7. Children\'s Privacy',
          content: 'Our platform is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.'
        },
        {
          title: '8. Changes to This Privacy Policy',
          content: 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this page.'
        },
        {
          title: '9. Your Rights',
          content: 'Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your personal information, the right to restrict or object to our processing of your personal information, and the right to data portability.'
        },
        {
          title: '10. Contact Us',
          content: 'If you have any questions about this Privacy Policy, please contact us at privacy@emviapp.com.'
        }
      ]
    },
    vi: {
      title: 'Chính Sách Bảo Mật',
      subtitle: 'Cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.',
      lastUpdated: 'Cập nhật lần cuối:',
      sections: [
        {
          title: '1. Thông Tin Chúng Tôi Thu Thập',
          content: 'Chúng tôi thu thập thông tin khi bạn đăng ký trên nền tảng của chúng tôi, đăng nhập, hoàn thành một biểu mẫu, hoặc tương tác với dịch vụ của chúng tôi. Thông tin chúng tôi thu thập có thể bao gồm tên, địa chỉ email, số điện thoại, vị trí và chi tiết nghề nghiệp liên quan đến ngành làm đẹp của bạn.'
        },
        {
          title: '2. Cách Chúng Tôi Sử Dụng Thông Tin Của Bạn',
          content: 'Chúng tôi sử dụng thông tin thu thập được để cung cấp, duy trì và cải thiện dịch vụ, phát triển tính năng và dịch vụ mới, xử lý giao dịch, gửi email định kỳ, cá nhân hóa trải nghiệm của bạn và quản lý các chương trình khuyến mãi, khảo sát hoặc các tính năng khác của trang web.'
        },
        {
          title: '3. Chia Sẻ Thông Tin',
          content: 'Chúng tôi không bán, trao đổi hoặc chuyển giao thông tin cá nhân của bạn cho các bên bên ngoài trừ khi được mô tả trong chính sách này. Điều này không bao gồm các bên thứ ba đáng tin cậy giúp chúng tôi vận hành nền tảng, tiến hành kinh doanh hoặc phục vụ bạn, miễn là các bên đó đồng ý giữ bí mật thông tin này.'
        },
        {
          title: '4. Cookie và Theo Dõi',
          content: 'Chúng tôi sử dụng cookie và các công nghệ theo dõi tương tự để theo dõi hoạt động trên nền tảng của chúng tôi và lưu giữ một số thông tin. Cookie là các tệp với một lượng nhỏ dữ liệu có thể bao gồm một định danh duy nhất ẩn danh. Bạn có thể hướng dẫn trình duyệt của mình từ chối tất cả cookie hoặc chỉ báo khi cookie đang được gửi.'
        },
        {
          title: '5. Bảo Mật Dữ Liệu',
          content: 'Chúng tôi thực hiện nhiều biện pháp bảo mật khác nhau để duy trì sự an toàn của thông tin cá nhân của bạn. Thông tin cá nhân của bạn được chứa đằng sau các mạng bảo mật và chỉ có thể truy cập bởi một số lượng hạn chế những người có quyền truy cập đặc biệt vào các hệ thống như vậy.'
        },
        {
          title: '6. Liên Kết Bên Thứ Ba',
          content: 'Đôi khi, theo quyết định của chúng tôi, chúng tôi có thể bao gồm hoặc cung cấp sản phẩm hoặc dịch vụ của bên thứ ba trên nền tảng của chúng tôi. Các trang web của bên thứ ba này có chính sách bảo mật riêng biệt và độc lập. Do đó, chúng tôi không chịu trách nhiệm hoặc nghĩa vụ đối với nội dung và hoạt động của các trang web được liên kết này.'
        },
        {
          title: '7. Quyền Riêng Tư Của Trẻ Em',
          content: 'Nền tảng của chúng tôi không dành cho cá nhân dưới 18 tuổi sử dụng. Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ em dưới 18 tuổi. Nếu bạn là phụ huynh hoặc người giám hộ và bạn biết rằng con bạn đã cung cấp cho chúng tôi thông tin cá nhân, vui lòng liên hệ với chúng tôi.'
        },
        {
          title: '8. Thay Đổi Đối Với Chính Sách Bảo Mật Này',
          content: 'Chúng tôi có thể cập nhật Chính Sách Bảo Mật của mình theo thời gian. Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi nào bằng cách đăng Chính Sách Bảo Mật mới trên trang này và cập nhật ngày "Cập nhật lần cuối" ở đầu trang này.'
        },
        {
          title: '9. Quyền Của Bạn',
          content: 'Tùy thuộc vào vị trí của bạn, bạn có thể có một số quyền đối với thông tin cá nhân của mình, chẳng hạn như quyền truy cập, sửa chữa hoặc xóa thông tin cá nhân của bạn, quyền hạn chế hoặc phản đối việc xử lý thông tin cá nhân của bạn và quyền tính khả chuyển dữ liệu.'
        },
        {
          title: '10. Liên Hệ Với Chúng Tôi',
          content: 'Nếu bạn có bất kỳ câu hỏi nào về Chính Sách Bảo Mật này, vui lòng liên hệ với chúng tôi tại privacy@emviapp.com.'
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

export default Privacy;
