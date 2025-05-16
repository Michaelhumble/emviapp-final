
import { IndustryType, JobFormValues } from './jobFormSchema';

type JobTemplate = {
  title: string;
  description: string;
  salary_range: string;
  jobType: string;
  experience_level: string;
};

type JobTemplatesCollection = Record<IndustryType, JobTemplate>;

export const jobTemplates: JobTemplatesCollection = {
  nails: {
    title: "Experienced Nail Technician - High Tips & Flexible Hours",
    description: `We're seeking a talented Nail Technician to join our busy salon in a high-traffic location! 

🔹 What we offer:
• Consistent client flow with loyal customer base
• Weekly pay + commission structure that rewards your skills
• Modern, clean workspace with all high-quality supplies provided
• Supportive team environment focused on growth
• Flexible scheduling options

🔹 Responsibilities:
• Provide exceptional manicure and pedicure services
• Perform nail enhancements including acrylics, gel, and dip powder
• Create nail art designs based on client requests
• Maintain clean, sanitized work area
• Build relationships with clients and encourage rebooking

🔹 Requirements:
• Valid nail technician license
• Minimum 1 year experience preferred
• Excellent customer service skills
• Reliable transportation
• Portfolio of your work

Join our team and be appreciated for your talents! Apply today for immediate consideration.`,
    salary_range: "$25-35/hour + tips (average $150-250/day in tips)",
    jobType: "full-time",
    experience_level: "intermediate"
  },
  
  hair: {
    title: "Creative Hair Stylist - $1,000 Signing Bonus!",
    description: `Ready to showcase your hair styling talent in a salon where you're valued and supported? Join our award-winning team!

🔹 Why stylists love working with us:
• $1,000 signing bonus for experienced stylists
• Guaranteed base pay + competitive commission structure
• Extensive continuing education allowance
• Health benefits for full-time stylists
• Modern, Instagram-worthy salon with top-tier products

🔹 What you'll do:
• Provide expert haircuts, color services, and treatments
• Consult with clients to determine their ideal style
• Recommend appropriate hair products
• Stay current with latest trends and techniques
• Build a loyal clientele (or join with your existing clients!)

🔹 What you'll need:
• Current cosmetology license
• 2+ years of salon experience preferred
• Color knowledge and technical skills
• Portfolio showcasing your versatile work
• Passion for continuing education

Join our collaborative team where your creativity and career growth are our priority!`,
    salary_range: "$50,000-75,000/year (base + commission)",
    jobType: "full-time",
    experience_level: "experienced"
  },
  
  lashes: {
    title: "Lash Artist - High-End Clientele - Booth Rental Available",
    description: `Calling all lash artists! Prime booth rental opportunity in our luxury beauty studio!

🔹 Our booth rental includes:
• Premium location with high-end clientele
• Beautiful, fully-equipped private room
• All utilities included
• Front desk reception service
• Marketing support through our salon's social media
• Flexible schedule - you set your hours!

🔹 About the position:
• Perfect for established lash artists with existing clientele
• Opportunity to grow your personal brand within our space
• Full creative control over your services and pricing
• Collaborative environment with other beauty professionals

🔹 Requirements:
• Current esthetician or cosmetology license
• Certification in lash extensions
• 1+ year experience as a lash artist
• Professional portfolio of your work
• Strong client communication skills
• Reliable and detail-oriented

Ready to elevate your lash business? Reach out today to schedule a tour of our beautiful space!`,
    salary_range: "$800-1,200/week booth rental (keep 100% of service revenue)",
    jobType: "booth-rental",
    experience_level: "intermediate"
  },
  
  massage: {
    title: "Licensed Massage Therapist - $35/hr + Tips & Benefits",
    description: `Join our wellness center as a Massage Therapist and help our clients live their best lives!

🔹 What sets us apart:
• Stable hourly pay ($35/hr) plus tips - no commission structure
• Full benefits package including health insurance
• Paid time off and paid continuing education
• All supplies provided - no out-of-pocket expenses
• Dedicated room with high-quality equipment
• Balanced schedule with recovery time between sessions

🔹 Daily responsibilities:
• Perform various therapeutic massage modalities
• Create customized treatment plans for clients
• Maintain accurate records and treatment notes
• Provide home care recommendations
• Create a relaxing, professional environment for clients

🔹 Qualifications:
• Current massage therapy license
• Minimum 500 hours of certified training
• Professional liability insurance
• Knowledge of multiple modalities (deep tissue, Swedish, etc.)
• Strong communication skills
• Physical stamina and attention to detail

We value work-life balance and create a supportive environment where therapists can thrive without burnout. Apply today!`,
    salary_range: "$35/hour plus tips and benefits",
    jobType: "part-time",
    experience_level: "experienced"
  },
  
  tattoo: {
    title: "Tattoo Artist - Commission or Booth Rental in Modern Studio",
    description: `Seeking a talented Tattoo Artist to join our respected studio with an established client base!

🔹 We offer:
• Choice of competitive commission split or booth rental
• High-traffic location with walk-ins and appointments
• Professional, clean, and modern studio environment
• Marketing support through our 50k+ social media following
• Collaborative atmosphere with other creative artists
• Flexible scheduling options

🔹 What you'll do:
• Create custom tattoo designs based on client consultations
• Provide professional tattooing services
• Maintain the highest standards of safety and sterilization
• Contribute to our studio's artistic reputation
• Participate in occasional art shows and events (optional)

🔹 Requirements:
• Minimum 3 years professional tattooing experience
• Strong, diverse portfolio showing your range and style
• Knowledge of proper sterilization techniques
• Excellent customer service skills
• Reliable and professional attitude
• Valid tattoo license/permit

Ready to take your tattoo career to the next level? Send us your portfolio today!`,
    salary_range: "70/30 commission split (70% to artist) or $200/day booth rental",
    jobType: "commission",
    experience_level: "experienced"
  },
  
  brows: {
    title: "Microblading & Brow Artist - Guaranteed Clientele",
    description: `Skilled Brow Artist needed for our expanding beauty studio! Perfect for someone passionate about creating perfect brows!

🔹 Why you'll love working with us:
• Base pay + commission structure
• Guaranteed clientele from day one - we're booked months in advance!
• All supplies and equipment provided
• Modern, Instagram-ready studio environment
• Paid training for advanced techniques
• Supportive team atmosphere

🔹 Services you'll provide:
• Microblading and powder brows
• Brow mapping and shaping
• Brow tinting and lamination
• Eyebrow waxing and threading
• Client consultations and aftercare instructions

🔹 Requirements:
• Current esthetician or cosmetology license
• Microblading certification
• 1+ year experience with brow services
• Attention to detail and steady hands
• Portfolio showcasing your work
• Excellent customer service skills

Join our team and help clients achieve their brow goals! Limited positions available - apply now!`,
    salary_range: "$50-65K/year (base + commission)",
    jobType: "full-time",
    experience_level: "intermediate"
  },
  
  skincare: {
    title: "Licensed Esthetician - Medical Spa - Full Benefits Package",
    description: `Join our luxury medical spa as a Licensed Esthetician and help clients achieve their skincare goals!

🔹 Benefits package:
• Competitive hourly rate + commission on products and services
• Medical, dental and vision insurance
• 401(k) with company match
• Paid vacation and sick time
• Free treatments and product discounts
• Ongoing advanced training and certification opportunities

🔹 Responsibilities:
• Perform facials and other skincare treatments
• Conduct thorough skin analyses and consultations
• Recommend appropriate home care products
• Assist with light medical procedures under physician supervision
• Maintain detailed client records
• Ensure immaculate treatment room cleanliness

🔹 Required qualifications:
• Current esthetician license
• 2+ years of esthetics experience, preferably in a medical setting
• Knowledge of medical-grade skincare lines
• Experience with chemical peels and microdermabrasion
• Excellent communication and sales skills
• Professional appearance and demeanor

We're seeking someone passionate about results-driven skincare in a professional medical environment. Apply today!`,
    salary_range: "$60-80K/year (base + commission) plus benefits",
    jobType: "full-time",
    experience_level: "experienced"
  }
};
