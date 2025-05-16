
import { Job } from '@/types/job';
import { v4 as uuidv4 } from 'uuid';

// This file contains expired Vietnamese job listings that should be shown at the bottom of the jobs page
// These listings are set with created_at dates that make them appear as expired (more than 30 days old)

export const vietnameseExpiredJobs: Job[] = [
  {
    id: uuidv4(),
    title: 'Cần thợ nails gấp (Jonesborough, TN)',
    location: 'Jonesborough, TN',
    created_at: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(), // 40 days ago
    vietnamese_description: 'Tiệm vùng Johnson City TN cần thợ nails gấp.\nTiệm đông khách quanh năm tip cao income từ $1200-$1500/ tuần tuỳ theo tay nghề.\nBao lương từ $1000-$1200/ tuần.\nLiên hệ 423-707-8895',
    specialties: ['CTN', 'SNS', 'thợ bột'],
    image: '/lovable-uploads/2542d0a3-5117-433d-baee-5c0fe2bfeca2.png',
    compensation_details: '$1000-$1500/tuần',
    contact_info: {
      phone: '423-707-8895'
    },
    status: 'expired'
  },
  {
    id: uuidv4(),
    title: 'Tiệm vị trí đẹp (Myrtle Beach, SC)',
    location: 'Myrtle Beach, SC',
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days ago
    vietnamese_description: 'Tiệm đẹp, vị trí đẹp, khách sang. Cần thợ nail có kinh nghiệm. Income lúc cao điểm $1800-$2500/tuần. Bao lương $1000-$1400/tuần. Có chỗ ở thoải mái. Liên lạc: 843-251-6336',
    specialties: ['thợ bột', 'thợ design', 'SNS'],
    image: '/lovable-uploads/8858fff4-1fa3-4803-86b1-beadca5fd1df.png',
    compensation_details: '$1800-$2500/tuần (mùa cao điểm)',
    contact_info: {
      phone: '843-251-6336'
    },
    status: 'expired'
  },
  {
    id: uuidv4(),
    title: 'Sang tiệm đang hoạt động tốt (Newport, TN)',
    location: 'Newport, TN',
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
    vietnamese_description: 'Cần sang tiệm nail gấp.\nTiệm vùng Newport, TN đang hoạt động tốt.\nCó 4 bàn, 4 ghế, đồ đạc đầy đủ.\nRent rẻ chỉ có $1100/tháng.\nGiá sang: $15,000 (có thể thương lượng).\nLiên hệ: 865-719-4372',
    specialties: ['sang nhượng', 'tiệm nail'],
    image: '/lovable-uploads/8283328c-3a93-4562-be8b-32c35c31a600.png',
    price: '$15,000',
    contact_info: {
      phone: '865-719-4372'
    },
    status: 'expired',
    for_sale: true
  },
  {
    id: uuidv4(),
    title: 'Cần thợ nail Full Time (Vancouver, WA)',
    location: 'Vancouver, WA',
    created_at: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(), // 35 days ago
    vietnamese_description: 'Cần thợ làm Full time ở Vancouver WA.\nKhách Mỹ trắng, tip cao, tiệm đẹp.\nBao lương $5000-$6500/tháng.\nTiệm còn cần thợ tay chân nước biết wax. Thu nhập từ $4000-$5000/tháng.\nLiên hệ: 360-798-9311',
    specialties: ['thợ bột', 'thợ tay chân nước', 'wax'],
    image: '/lovable-uploads/89855878-2908-47b5-98b0-1935d73cdd71.png',
    compensation_details: '$5000-$6500/tháng',
    contact_info: {
      phone: '360-798-9311'
    },
    status: 'expired',
    weekly_pay: true
  },
  {
    id: uuidv4(),
    title: 'Cần thợ bột và dip (Orlando, FL)',
    location: 'Orlando, FL',
    created_at: new Date(Date.now() - 38 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: 'Tiệm ở Orlando, FL cần thợ bột và dip gấp. Tiệm khu Mỹ trắng, tip cao, giá đẹp. Thu nhập từ $1300-$1700/tuần tùy theo tay nghề. Bao lương $1000-$1300/tuần. Có chỗ ở thoải mái. Bao đón từ phi trường. Liên hệ: 407-766-9270',
    specialties: ['thợ bột', 'dip', 'SNS'],
    image: '/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png',
    compensation_details: '$1300-$1700/tuần',
    contact_info: {
      phone: '407-766-9270'
    },
    status: 'expired'
  },
  {
    id: uuidv4(),
    title: 'Cần thợ tay chân nước (Louisville, KY)',
    location: 'Louisville, KY',
    created_at: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: 'Cần gấp thợ tay chân nước biết wax lông mày, có kinh nghiệm. Bao lương tối thiểu $4500-$5500/tháng tùy theo khả năng. Tiệm làm 6 ngày/tuần, không khí làm việc vui vẻ, không cạnh tranh, không phân biệt. Liên hệ: 502-314-0897.',
    specialties: ['tay chân nước', 'wax lông mày'],
    image: '/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png',
    compensation_details: '$4500-$5500/tháng',
    contact_info: {
      phone: '502-314-0897'
    },
    status: 'expired'
  },
  {
    id: uuidv4(),
    title: 'Cần thợ nail có kinh nghiệm (Tulsa, OK)',
    location: 'Tulsa, OK',
    created_at: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: 'Tiệm ở Tulsa, OK cần thợ nail có kinh nghiệm, biết làm bột, dip powder, gel polish, và wax. Thu nhập ổn định $1200-$1500/tuần. Tiệm mới remodel, vị trí tốt khu Mỹ trắng tip hậu. Có chỗ ở cho thợ ở xa. Liên hệ: 918-853-4089',
    specialties: ['thợ bột', 'dip powder', 'gel polish', 'wax'],
    image: '/lovable-uploads/d1da4b24-248e-4e84-9289-06237e7d4458.png',
    compensation_details: '$1200-$1500/tuần',
    contact_info: {
      phone: '918-853-4089'
    },
    status: 'expired'
  },
  {
    id: uuidv4(),
    title: 'Sang tiệm nail gấp (Charlotte, NC)',
    location: 'Charlotte, NC',
    created_at: new Date(Date.now() - 65 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: 'Cần sang tiệm nail ở Charlotte, NC. Vị trí đẹp, parking rộng. Tiệm có 10 bàn, 8 ghế, máy giặt sấy đầy đủ. Tiệm hoạt động trên 10 năm, khách hàng ổn định. Giá sang: $85,000. Liên hệ: 704-345-6789',
    specialties: ['sang tiệm', 'tiệm lớn'],
    image: '/lovable-uploads/e1ce1662-fb69-4ad9-995a-364ee16e42f6.png',
    price: '$85,000',
    contact_info: {
      phone: '704-345-6789'
    },
    status: 'expired',
    for_sale: true
  },
  {
    id: uuidv4(),
    title: 'Cần thợ nails gấp (Houston, TX)',
    location: 'Houston, TX',
    created_at: new Date(Date.now() - 37 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: 'Tiệm vùng Houston TX cần nhiều thợ nail. Cần thợ biết làm đủ thứ hoặc thợ bột. Income từ $1300-$2000/tuần. Chủ không làm trong tiệm, chia 6/4. Tiệm rộng, mới remodel, nhiều máy rửa chân mới. Liên hệ: 832-788-5432',
    specialties: ['thợ bột', 'làm đủ thứ'],
    image: '/lovable-uploads/7a58770c-404e-4259-b1a6-f044c8eefdc0.png',
    compensation_details: '$1300-$2000/tuần',
    contact_info: {
      phone: '832-788-5432'
    },
    status: 'expired'
  },
  {
    id: uuidv4(),
    title: 'Cần thợ nails có kinh nghiệm (Austin, TX)',
    location: 'Austin, TX',
    created_at: new Date(Date.now() - 41 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: 'Tiệm vùng Austin, TX cần thợ nail nam/nữ biết làm bột và tay chân nước. Thu nhập từ $1500-$1800/tuần. Cần siêng năng, hòa đồng, làm lâu dài. Bao lương $1200-$1400/tuần tùy theo kinh nghiệm. Liên hệ: 512-765-4321',
    specialties: ['thợ bột', 'tay chân nước'],
    image: '/lovable-uploads/0a78836f-9528-4119-a387-5442ab284cc7.png',
    compensation_details: '$1500-$1800/tuần',
    contact_info: {
      phone: '512-765-4321'
    },
    status: 'expired'
  },
  {
    id: uuidv4(),
    title: 'Cần thợ biết làm dip (Nashville, TN)',
    location: 'Nashville, TN',
    created_at: new Date(Date.now() - 47 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: 'Tiệm khu Nashville, TN cần thợ biết làm dip, gel-x, và tay chân nước. Thu nhập từ $1200-$1600/tuần. Bao lương $1000/tuần. Tiệm đông khách, vị trí đẹp, friendly staff. Liên hệ: 615-234-5678',
    specialties: ['dip', 'gel-x', 'tay chân nước'],
    image: '/lovable-uploads/b0eaa611-27a6-42f3-b005-b259d595db96.png',
    compensation_details: '$1200-$1600/tuần',
    contact_info: {
      phone: '615-234-5678'
    },
    status: 'expired'
  },
  {
    id: uuidv4(),
    title: 'Cần thợ nails gấp (Atlanta, GA)',
    location: 'Atlanta, GA',
    created_at: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: 'Tiệm vùng Atlanta, GA cần thợ nail gấp. Bao lương $900-$1200/tuần tùy theo tay nghề. Tiệm khu Mỹ trắng, giá cao, tip hậu. Làm việc 6 ngày/tuần. Có chỗ ở cho thợ ở xa. Liên hệ: 404-876-5432',
    specialties: ['thợ bột', 'tay chân nước'],
    image: '/lovable-uploads/0f5c9f01-b448-43dd-8c3a-a48589d6bf08.png',
    compensation_details: '$900-$1200/tuần',
    contact_info: {
      phone: '404-876-5432'
    },
    status: 'expired'
  },
  {
    id: uuidv4(),
    title: 'Cần thợ có kinh nghiệm (Denver, CO)',
    location: 'Denver, CO',
    created_at: new Date(Date.now() - 39 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: 'Tiệm ở Denver, CO cần thợ nail có kinh nghiệm. Thu nhập từ $1400-$1800/tuần. Bao lương $1200/tuần nếu làm không được. Môi trường làm việc vui vẻ, khách tip hậu. Không làm quá 8 tiếng/ngày. Liên hệ: 303-654-9876',
    specialties: ['thợ bột', 'dip powder'],
    image: '/lovable-uploads/44caa889-1f3d-4a90-8748-d845241e0bbf.png',
    compensation_details: '$1400-$1800/tuần',
    contact_info: {
      phone: '303-654-9876'
    },
    status: 'expired'
  },
  {
    id: uuidv4(),
    title: 'Cần thợ nails full-time (Minneapolis, MN)',
    location: 'Minneapolis, MN',
    created_at: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: 'Cần thợ nail làm full-time tại Minneapolis, MN. Tiệm đông khách quanh năm, khu thương mại, khách hàng ổn định. Thu nhập từ $1100-$1500/tuần. Môi trường làm việc thân thiện. Liên hệ: 612-345-8765',
    specialties: ['thợ bột', 'tay chân nước', 'wax'],
    image: '/lovable-uploads/a1aec0a2-7c4c-48fe-810c-e932fcd1322c.png',
    compensation_details: '$1100-$1500/tuần',
    contact_info: {
      phone: '612-345-8765'
    },
    status: 'expired'
  },
  {
    id: uuidv4(),
    title: 'Sang tiệm nail vị trí đẹp (Philadelphia, PA)',
    location: 'Philadelphia, PA',
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: 'Cần sang tiệm nail khu Philadelphia, PA. Tiệm rộng 1,400 sqft, có 8 bàn, 7 ghế, 3 phòng wax. Rent $2,200/tháng. Khách walk-in, vị trí đẹp gần trung tâm thương mại. Giá sang: $45,000. Liên hệ: 267-876-1234',
    specialties: ['sang tiệm', 'đông khách'],
    image: '/lovable-uploads/0233127f-811c-4dee-a325-4336f95b8a77.png',
    price: '$45,000',
    contact_info: {
      phone: '267-876-1234'
    },
    status: 'expired',
    for_sale: true
  },
  {
    id: uuidv4(),
    title: 'Cần thợ nails có kinh nghiệm (Seattle, WA)',
    location: 'Seattle, WA',
    created_at: new Date(Date.now() - 43 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: 'Tiệm ở Seattle, WA cần thợ nail có kinh nghiệm làm bột, dip, và tay chân nước. Thu nhập từ $1400-$1900/tuần tùy theo tay nghề. Tiệm đông khách, khu Mỹ trắng, tip hậu. Môi trường làm việc vui vẻ. Liên hệ: 206-543-9876',
    specialties: ['thợ bột', 'dip', 'tay chân nước'],
    image: '/lovable-uploads/291a4fac-a057-4cb2-9ab8-7ada287421c4.png',
    compensation_details: '$1400-$1900/tuần',
    contact_info: {
      phone: '206-543-9876'
    },
    status: 'expired'
  },
  {
    id: uuidv4(),
    title: 'Cần thợ nail gấp (San Diego, CA)',
    location: 'San Diego, CA',
    created_at: new Date(Date.now() - 52 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: 'Tiệm ở San Diego, CA cần thợ nail gấp. Thu nhập từ $1500-$2000+/tuần tùy theo tay nghề. Tiệm khu Mỹ trắng, khách sang, lịch sự, tip cao. Có chỗ ở cho thợ ở xa. Liên hệ: 619-765-4321',
    specialties: ['thợ bột', 'gel-x', 'tay chân nước'],
    image: '/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png',
    compensation_details: '$1500-$2000+/tuần',
    contact_info: {
      phone: '619-765-4321'
    },
    status: 'expired'
  },
  {
    id: uuidv4(),
    title: 'Cần thợ nail có kinh nghiệm (Chicago, IL)',
    location: 'Chicago, IL',
    created_at: new Date(Date.now() - 44 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: 'Tiệm ở Chicago, IL cần thợ nail có kinh nghiệm. Bao lương $1100-$1400/tuần. Tiệm đông khách, vị trí đẹp, environment thân thiện. Làm việc 5-6 ngày/tuần, không khí làm việc vui vẻ. Liên hệ: 312-876-5432',
    specialties: ['thợ bột', 'dip powder', 'tay chân nước'],
    image: '/lovable-uploads/4e47f970-963a-483f-8356-eb64235bc2db.png',
    compensation_details: '$1100-$1400/tuần',
    contact_info: {
      phone: '312-876-5432'
    },
    status: 'expired'
  },
  {
    id: uuidv4(),
    title: 'Cần thợ nail biết làm tất cả (Miami, FL)',
    location: 'Miami, FL',
    created_at: new Date(Date.now() - 58 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: 'Tiệm ở Miami, FL cần thợ nail biết làm tất cả. Thu nhập từ $1400-$2000/tuần. Khách tip hậu, lịch sự. Tiệm mới remodel, nhiều ghế spa mới, vị trí đẹp, không phân biệt, không cạnh tranh. Liên hệ: 305-234-5678',
    specialties: ['thợ đa năng', 'thợ bột', 'dip powder'],
    image: '/lovable-uploads/9a7898e7-739c-4a79-8705-70090e25c10b.png',
    compensation_details: '$1400-$2000/tuần',
    contact_info: {
      phone: '305-234-5678'
    },
    status: 'expired'
  },
  {
    id: uuidv4(),
    title: 'Cần thợ chân tay nước (Phoenix, AZ)',
    location: 'Phoenix, AZ',
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: 'Cần thợ chân tay nước làm việc tại Phoenix, AZ. Thu nhập từ $800-$1200/tuần + tip. Tiệm đông khách, môi trường làm việc thân thiện. Không cần kinh nghiệm, sẽ có người chỉ dẫn. Liên hệ: 602-765-4321',
    specialties: ['chân tay nước', 'wax'],
    image: '/lovable-uploads/b13a3b43-f6e1-4746-9992-03f6e8fac6bf.png',
    compensation_details: '$800-$1200/tuần + tip',
    contact_info: {
      phone: '602-765-4321'
    },
    status: 'expired'
  },
  {
    id: uuidv4(),
    title: 'Cần thợ nail có kinh nghiệm (Portland, OR)',
    location: 'Portland, OR',
    created_at: new Date(Date.now() - 36 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: 'Tiệm ở Portland, OR cần thợ nail có kinh nghiệm làm bột, gel, và dip. Thu nhập từ $1300-$1700/tuần. Tiệm khu Mỹ trắng, tip hậu, không khí làm việc thoải mái, giờ giấc flexible. Liên hệ: 503-234-5678',
    specialties: ['thợ bột', 'gel', 'dip'],
    image: '/lovable-uploads/00ccb907-6755-4698-a289-71b05f7012f1.png',
    compensation_details: '$1300-$1700/tuần',
    contact_info: {
      phone: '503-234-5678'
    },
    status: 'expired'
  },
  {
    id: uuidv4(),
    title: 'Cần thợ nail full-time (Boston, MA)',
    location: 'Boston, MA',
    created_at: new Date(Date.now() - 49 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: 'Tiệm ở Boston, MA cần thợ nail làm full-time. Biết làm bột, dip, tay chân nước. Income $1200-$1600/tuần. Tiệm sang, khu khá giả, tip hậu, chủ dễ tính. Có chỗ ở cho thợ ở xa. Liên hệ: 617-876-5432',
    specialties: ['thợ bột', 'dip', 'tay chân nước'],
    image: '/lovable-uploads/0c68659d-ebd4-4091-aa1a-9329f3690d68.png',
    compensation_details: '$1200-$1600/tuần',
    contact_info: {
      phone: '617-876-5432'
    },
    status: 'expired'
  },
  {
    id: uuidv4(),
    title: 'Cần sang tiệm nail (Las Vegas, NV)',
    location: 'Las Vegas, NV',
    created_at: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: 'Cần sang tiệm nail ở Las Vegas, NV. Vị trí đẹp, tiệm rộng 1,200 sqft, có 6 bàn, 6 ghế, 2 phòng wax. Rent $1,800/tháng. Tiệm hoạt động trên 8 năm, khách hàng ổn định. Giá sang: $35,000. Liên hệ: 702-345-6789',
    specialties: ['sang tiệm', 'established'],
    image: '/lovable-uploads/0f87e7e4-f896-4c6d-a832-eca65e4b20cd.png',
    price: '$35,000',
    contact_info: {
      phone: '702-345-6789'
    },
    status: 'expired',
    for_sale: true
  },
  {
    id: uuidv4(),
    title: 'Cần thợ nails có kinh nghiệm (Sacramento, CA)',
    location: 'Sacramento, CA',
    created_at: new Date(Date.now() - 53 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: 'Tiệm ở Sacramento, CA cần thợ nail có kinh nghiệm. Thu nhập từ $1300-$1800/tuần. Tiệm có máy rửa chân mới, tiệm đẹp, thoáng mát, sạch sẽ, tip cao. Tuỳ theo kinh nghiệm sẽ trả lương tương xứng. Liên hệ: 916-765-4321',
    specialties: ['thợ bột', 'gel-x', 'tay chân nước'],
    image: '/lovable-uploads/5af131ca-038f-40e6-892a-502d1e822395.png',
    compensation_details: '$1300-$1800/tuần',
    contact_info: {
      phone: '916-765-4321'
    },
    status: 'expired'
  },
  {
    id: uuidv4(),
    title: 'Cần thợ nail biết làm tất cả (Dallas, TX)',
    location: 'Dallas, TX',
    created_at: new Date(Date.now() - 48 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: 'Cần thợ nail biết làm tất cả tại Dallas, TX. Thu nhập từ $1200-$1700/tuần. Tiệm khu Mỹ trắng, đông khách, tiền tip cao. Làm việc 5-6 ngày/tuần, môi trường làm việc thân thiện. Liên hệ: 214-876-5432',
    specialties: ['thợ đa năng', 'thợ bột', 'gel'],
    image: '/lovable-uploads/68440114-1848-438a-8b69-5667e8d9ec77.png',
    compensation_details: '$1200-$1700/tuần',
    contact_info: {
      phone: '214-876-5432'
    },
    status: 'expired'
  },
  {
    id: uuidv4(),
    title: 'Cần thợ nail biết làm bột (Pittsburgh, PA)',
    location: 'Pittsburgh, PA',
    created_at: new Date(Date.now() - 46 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: 'Tiệm ở Pittsburgh, PA cần thợ nail biết làm bột và tay chân nước. Thu nhập từ $1100-$1500/tuần. Tiệm đông khách, vị trí đẹp, khu shopping center. Có chỗ ở cho thợ ở xa. Liên hệ: 412-765-4321',
    specialties: ['thợ bột', 'tay chân nước'],
    image: '/lovable-uploads/79cf9064-5740-4752-9ad6-9b7e9b4db31e.png',
    compensation_details: '$1100-$1500/tuần',
    contact_info: {
      phone: '412-765-4321'
    },
    status: 'expired'
  },
  {
    id: uuidv4(),
    title: 'Cần thợ chân tay nước và wax (Tampa, FL)',
    location: 'Tampa, FL',
    created_at: new Date(Date.now() - 51 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: 'Tiệm ở Tampa, FL cần thợ chân tay nước và wax. Thu nhập từ $900-$1300/tuần. Làm việc 5-6 ngày/tuần, tiệm đông khách, khu Mỹ trắng, tip cao. Có chỗ ở cho thợ ở xa. Liên hệ: 813-234-5678',
    specialties: ['chân tay nước', 'wax', 'gel polish'],
    image: '/lovable-uploads/4c2d8a4c-e191-40a0-8666-147cbcc488d4.png',
    compensation_details: '$900-$1300/tuần',
    contact_info: {
      phone: '813-234-5678'
    },
    status: 'expired'
  },
  {
    id: uuidv4(),
    title: 'Cần thợ nail có kinh nghiệm (Raleigh, NC)',
    location: 'Raleigh, NC',
    created_at: new Date(Date.now() - 57 * 24 * 60 * 60 * 1000).toISOString(),
    vietnamese_description: 'Tiệm khu Raleigh, NC cần thợ nail có kinh nghiệm. Thu nhập từ $1200-$1600/tuần. Chia 6/4, không phân biệt, không cạnh tranh. Có chỗ ở thoải mái cho thợ ở xa. Liên hệ: 919-876-5432',
    specialties: ['thợ bột', 'gel', 'dip'],
    image: '/lovable-uploads/f3f2a5ae-65d9-4442-8842-1cb9e26cdb56.png',
    compensation_details: '$1200-$1600/tuần',
    contact_info: {
      phone: '919-876-5432'
    },
    status: 'expired'
  }
];
