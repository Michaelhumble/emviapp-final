
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/container';
import { Link } from 'react-router-dom';

const Refund = () => {
  return (
    <Layout>
      <Container className="py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-8">Refund Policy</h1>
          
          <div className="space-y-6">
            <section className="space-y-4">
              <p className="text-gray-800">
                At EmviApp, we strive to ensure complete satisfaction with all our services. Our refund policy 
                is designed to be fair while maintaining the integrity of our platform.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-playfair font-semibold">General Refund Guidelines</h2>
              <p className="text-gray-800">
                All payments for services on EmviApp are processed securely. Prices are subject to change with notice. 
                Refunds may be issued at our discretion, typically for technical issues preventing service delivery.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-playfair font-semibold">Eligible Refund Scenarios</h2>
              <ul className="list-disc pl-6 text-gray-800 space-y-2">
                <li>Technical failures that prevent the delivery of purchased services</li>
                <li>Duplicate charges or billing errors</li>
                <li>Services not rendered due to platform issues</li>
                <li>Other circumstances evaluated on a case-by-case basis</li>
              </ul>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-playfair font-semibold">Refund Process</h2>
              <p className="text-gray-800">
                To request a refund, please contact our support team at support@emviapp.com with your 
                account details and reason for the refund request. We aim to respond to all refund 
                requests within 3 business days.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-playfair font-semibold">Non-Refundable Items</h2>
              <p className="text-gray-800">
                The following services are generally non-refundable:
              </p>
              <ul className="list-disc pl-6 text-gray-800 space-y-2">
                <li>Subscription renewals after the initial 24-hour period</li>
                <li>Premium job listings that have already received applicants</li>
                <li>Featured salon listings that have been live for more than 72 hours</li>
                <li>Boost and promotional features that have been activated</li>
              </ul>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-playfair font-semibold">Contact Us</h2>
              <p className="text-gray-800">
                If you have questions about our refund policy or need assistance with a refund request, 
                please contact our customer support team at support@emviapp.com.
              </p>
            </section>
            
            <div className="mt-12">
              <p className="text-gray-600">
                For our full Terms of Service, please visit our <Link to="/terms" className="text-purple-600 hover:underline">Terms of Service</Link> page.
              </p>
            </div>
          </div>
          
          <hr className="my-12 border-gray-300" />
          
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-8">Chính Sách Hoàn Tiền</h1>
            
            <section className="space-y-4">
              <p className="text-gray-800">
                Tại EmviApp, chúng tôi luôn nỗ lực đảm bảo sự hài lòng hoàn toàn với tất cả các dịch vụ của chúng tôi. 
                Chính sách hoàn tiền của chúng tôi được thiết kế để công bằng đồng thời duy trì tính toàn vẹn của nền tảng.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-playfair font-semibold">Nguyên Tắc Hoàn Tiền Chung</h2>
              <p className="text-gray-800">
                Tất cả các khoản thanh toán cho dịch vụ trên EmviApp đều được xử lý an toàn. Giá có thể thay đổi kèm theo thông báo. 
                Hoàn tiền có thể được thực hiện theo quyết định của chúng tôi, thường là cho các vấn đề kỹ thuật ngăn cản việc 
                cung cấp dịch vụ.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-playfair font-semibold">Các Trường Hợp Đủ Điều Kiện Hoàn Tiền</h2>
              <ul className="list-disc pl-6 text-gray-800 space-y-2">
                <li>Lỗi kỹ thuật ngăn cản việc cung cấp dịch vụ đã mua</li>
                <li>Tính phí trùng lặp hoặc lỗi thanh toán</li>
                <li>Dịch vụ không được cung cấp do vấn đề của nền tảng</li>
                <li>Các trường hợp khác được đánh giá theo từng trường hợp cụ thể</li>
              </ul>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-playfair font-semibold">Quy Trình Hoàn Tiền</h2>
              <p className="text-gray-800">
                Để yêu cầu hoàn tiền, vui lòng liên hệ với đội ngũ hỗ trợ của chúng tôi tại support@emviapp.com với 
                thông tin tài khoản của bạn và lý do yêu cầu hoàn tiền. Chúng tôi cố gắng phản hồi tất cả các yêu cầu 
                hoàn tiền trong vòng 3 ngày làm việc.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-playfair font-semibold">Các Mục Không Được Hoàn Tiền</h2>
              <p className="text-gray-800">
                Các dịch vụ sau đây thường không được hoàn tiền:
              </p>
              <ul className="list-disc pl-6 text-gray-800 space-y-2">
                <li>Gia hạn đăng ký sau thời gian 24 giờ đầu tiên</li>
                <li>Đăng tin tuyển dụng cao cấp đã nhận được ứng viên</li>
                <li>Đăng tin salon nổi bật đã hiển thị hơn 72 giờ</li>
                <li>Tính năng tăng cường và quảng cáo đã được kích hoạt</li>
              </ul>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-playfair font-semibold">Liên Hệ Với Chúng Tôi</h2>
              <p className="text-gray-800">
                Nếu bạn có câu hỏi về chính sách hoàn tiền của chúng tôi hoặc cần hỗ trợ với yêu cầu hoàn tiền, 
                vui lòng liên hệ với đội ngũ hỗ trợ khách hàng của chúng tôi tại support@emviapp.com.
              </p>
            </section>
            
            <div className="mt-12">
              <p className="text-gray-600">
                Để xem đầy đủ Điều Khoản Dịch Vụ của chúng tôi, vui lòng truy cập trang <Link to="/terms" className="text-purple-600 hover:underline">Điều Khoản Dịch Vụ</Link> của chúng tôi.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Refund;
