
import React from 'react';
import Layout from '@/components/layout/Layout';
import { getLanguagePreference } from '@/utils/languagePreference';

const Cookies = () => {
  const language = getLanguagePreference();
  
  const translations = {
    en: {
      title: 'Cookies Policy',
      subtitle: 'How we use cookies and similar technologies on our platform.',
      lastUpdated: 'Last updated:',
      sections: [
        {
          title: '1. What Are Cookies',
          content: 'Cookies are small text files that are placed on your computer or mobile device when you visit our website. They allow us to recognize your device and store certain information about your preferences or past actions.'
        },
        {
          title: '2. Types of Cookies We Use',
          content: 'We use essential cookies that are necessary for the functioning of our platform, analytical cookies that help us understand how users interact with our platform, and advertising cookies that are used to deliver personalized advertisements. We may also use social media cookies to enable the sharing of content on social media platforms.'
        },
        {
          title: '3. Essential Cookies',
          content: 'Essential cookies are necessary for the basic functionality of our platform. These cookies enable core features such as security, network management, and account access. You can disable these by changing your browser settings, but this may affect how the website functions.'
        },
        {
          title: '4. Analytical Cookies',
          content: 'Analytical cookies help us understand how users interact with our platform. This helps us improve our website and services. For example, we may use Google Analytics cookies to track which pages are most popular and how users navigate through the site.'
        },
        {
          title: '5. Advertising Cookies',
          content: 'Advertising cookies are used to make advertising messages more relevant to you. They help to display ads that are based on your browsing patterns and interests, and also help to measure the effectiveness of advertising campaigns.'
        },
        {
          title: '6. Social Media Cookies',
          content: 'Social media cookies allow you to share our content on social media platforms and to engage with our content on those platforms. These cookies may also be used by social media platforms to track your online activity for their own purposes.'
        },
        {
          title: '7. Third-Party Cookies',
          content: 'Our platform may include cookies from third-party services. These third parties have their own privacy policies, and we do not have access to or control over cookies or other technologies they might use. We recommend checking the privacy policies of these third parties to find out more about their use of cookies.'
        },
        {
          title: '8. Managing Cookies',
          content: 'Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies, or to alert you when cookies are being sent. However, if you disable cookies, some parts of our platform may not function properly.'
        },
        {
          title: '9. Changes to This Cookie Policy',
          content: 'We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date at the top of this page.'
        },
        {
          title: '10. Contact Us',
          content: 'If you have any questions about this Cookie Policy, please contact us at privacy@emviapp.com.'
        }
      ]
    },
    vi: {
      title: 'Chính Sách Cookie',
      subtitle: 'Cách chúng tôi sử dụng cookie và các công nghệ tương tự trên nền tảng của chúng tôi.',
      lastUpdated: 'Cập nhật lần cuối:',
      sections: [
        {
          title: '1. Cookie Là Gì',
          content: 'Cookie là các tệp văn bản nhỏ được đặt trên máy tính hoặc thiết bị di động của bạn khi bạn truy cập trang web của chúng tôi. Chúng cho phép chúng tôi nhận diện thiết bị của bạn và lưu trữ một số thông tin về tùy chọn hoặc hành động trước đây của bạn.'
        },
        {
          title: '2. Các Loại Cookie Chúng Tôi Sử Dụng',
          content: 'Chúng tôi sử dụng cookie thiết yếu cần thiết cho hoạt động của nền tảng của chúng tôi, cookie phân tích giúp chúng tôi hiểu cách người dùng tương tác với nền tảng của chúng tôi, và cookie quảng cáo được sử dụng để cung cấp quảng cáo cá nhân hóa. Chúng tôi cũng có thể sử dụng cookie mạng xã hội để cho phép chia sẻ nội dung trên các nền tảng mạng xã hội.'
        },
        {
          title: '3. Cookie Thiết Yếu',
          content: 'Cookie thiết yếu cần thiết cho chức năng cơ bản của nền tảng của chúng tôi. Các cookie này cho phép các tính năng cốt lõi như bảo mật, quản lý mạng và truy cập tài khoản. Bạn có thể vô hiệu hóa chúng bằng cách thay đổi cài đặt trình duyệt của bạn, nhưng điều này có thể ảnh hưởng đến cách trang web hoạt động.'
        },
        {
          title: '4. Cookie Phân Tích',
          content: 'Cookie phân tích giúp chúng tôi hiểu cách người dùng tương tác với nền tảng của chúng tôi. Điều này giúp chúng tôi cải thiện trang web và dịch vụ của mình. Ví dụ, chúng tôi có thể sử dụng cookie Google Analytics để theo dõi trang nào phổ biến nhất và cách người dùng điều hướng qua trang web.'
        },
        {
          title: '5. Cookie Quảng Cáo',
          content: 'Cookie quảng cáo được sử dụng để làm cho thông điệp quảng cáo phù hợp hơn với bạn. Chúng giúp hiển thị quảng cáo dựa trên mô hình duyệt web và sở thích của bạn, và cũng giúp đo lường hiệu quả của các chiến dịch quảng cáo.'
        },
        {
          title: '6. Cookie Mạng Xã Hội',
          content: 'Cookie mạng xã hội cho phép bạn chia sẻ nội dung của chúng tôi trên các nền tảng mạng xã hội và tương tác với nội dung của chúng tôi trên các nền tảng đó. Các cookie này cũng có thể được sử dụng bởi các nền tảng mạng xã hội để theo dõi hoạt động trực tuyến của bạn cho mục đích riêng của họ.'
        },
        {
          title: '7. Cookie Bên Thứ Ba',
          content: 'Nền tảng của chúng tôi có thể bao gồm cookie từ dịch vụ của bên thứ ba. Các bên thứ ba này có chính sách bảo mật riêng, và chúng tôi không có quyền truy cập hoặc kiểm soát đối với cookie hoặc các công nghệ khác mà họ có thể sử dụng. Chúng tôi khuyên bạn nên kiểm tra chính sách bảo mật của các bên thứ ba này để tìm hiểu thêm về việc họ sử dụng cookie.'
        },
        {
          title: '8. Quản Lý Cookie',
          content: 'Hầu hết các trình duyệt web cho phép bạn quản lý tùy chọn cookie của mình. Bạn có thể đặt trình duyệt của mình để từ chối cookie, hoặc cảnh báo bạn khi cookie đang được gửi. Tuy nhiên, nếu bạn vô hiệu hóa cookie, một số phần của nền tảng của chúng tôi có thể không hoạt động đúng.'
        },
        {
          title: '9. Thay Đổi Đối Với Chính Sách Cookie Này',
          content: 'Chúng tôi có thể cập nhật Chính Sách Cookie của mình theo thời gian. Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi nào bằng cách đăng Chính Sách Cookie mới trên trang này và cập nhật ngày "Cập nhật lần cuối" ở đầu trang này.'
        },
        {
          title: '10. Liên Hệ Với Chúng Tôi',
          content: 'Nếu bạn có bất kỳ câu hỏi nào về Chính Sách Cookie này, vui lòng liên hệ với chúng tôi tại privacy@emviapp.com.'
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

export default Cookies;
