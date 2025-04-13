
type MockResponse = {
  keywords: string[];
  responses: string[];
};

export const mockAssistantResponses: MockResponse[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'howdy', 'greetings'],
    responses: [
      "Hi there! I'm Little Sunshine, your AI assistant. How can I help you today? 😊",
      "Hello! I'm here to help with bookings, finding salons, or answering any questions about EmviApp.",
      "Hey there! I'm Little Sunshine. Looking for a salon, want to book an appointment, or have questions?",
      "Welcome to EmviApp! I'm Little Sunshine, and I'm here to make your beauty service experience seamless."
    ]
  },
  {
    keywords: ['book', 'appointment', 'schedule', 'reservation'],
    responses: [
      "I'd be happy to help you book an appointment! Do you have a specific artist or service in mind? 📅",
      "Looking to book a service? I can help with that! What kind of appointment are you looking for?",
      "Ready to book? Tell me what service you're interested in, and I'll help you find the perfect artist. ✨",
      "Booking is easy with EmviApp! Let me know what service you need, and I can show you available artists in your area."
    ]
  },
  {
    keywords: ['job', 'hiring', 'position', 'work', 'employ'],
    responses: [
      "Looking to post a job or find work? EmviApp makes connecting salons with talented artists simple! 💼",
      "EmviApp's job marketplace helps salon owners find the perfect staff and artists find great opportunities.",
      "You can post job openings or browse available positions right here on EmviApp. What specifically are you looking for?",
      "Whether you're hiring or looking for work, EmviApp's job marketplace has you covered. What would you like to know about it?"
    ]
  },
  {
    keywords: ['salon', 'shop', 'store', 'business'],
    responses: [
      "EmviApp helps salon owners manage their business, attract clients, and grow their team all in one place! 🏪",
      "Looking to promote your salon? EmviApp connects you with clients searching for exactly what you offer.",
      "Salon owners love EmviApp because it simplifies booking, team management, and client communication.",
      "Whether you're running a small salon or a large business, EmviApp has tools to help you succeed."
    ]
  },
  {
    keywords: ['artist', 'stylist', 'professional', 'talent'],
    responses: [
      "EmviApp helps beauty artists showcase their work, get booked, and build their client base! 🧑‍🎨",
      "Are you a beauty professional? EmviApp helps you manage your schedule, display your portfolio, and connect with clients.",
      "Beauty artists on EmviApp can build their personal brand, set their availability, and get discovered by new clients.",
      "EmviApp supports beauty professionals with tools to grow their business, whether they work at a salon or independently."
    ]
  },
  {
    keywords: ['price', 'cost', 'fee', 'pricing', 'expensive'],
    responses: [
      "EmviApp offers different pricing plans to fit your needs. Basic listings are free, with premium options for increased visibility! 💰",
      "Our pricing is flexible - salon owners, artists, and clients all have different options. What specific pricing are you curious about?",
      "EmviApp's basic features are free! Premium plans add extra visibility and business tools starting at affordable monthly rates.",
      "Using EmviApp to find and book services is always free for clients! Businesses can choose from several pricing tiers."
    ]
  },
  {
    keywords: ['how', 'work', 'use', 'function', 'feature'],
    responses: [
      "EmviApp is an all-in-one platform connecting beauty professionals with clients. What specific feature would you like to learn about? ✨",
      "EmviApp helps salon owners, independent artists, and clients connect seamlessly. Our platform handles bookings, payments, and communication!",
      "EmviApp works by connecting beauty service providers with clients looking for those services. We handle scheduling, promotion, and more!",
      "The EmviApp platform makes it easy to discover, book, and manage beauty services. What part would you like me to explain?"
    ]
  },
  {
    keywords: ['refer', 'invite', 'friend', 'share'],
    responses: [
      "Our referral program rewards you for sharing EmviApp! Both you and your friends get credits when they join. 🎁",
      "You can earn rewards by inviting friends and colleagues to EmviApp! Each successful referral gives you platform credits.",
      "Referring friends to EmviApp is rewarding! You'll both receive credits that can be used for profile boosts and premium features.",
      "Want to invite friends to EmviApp? Our referral program gives you both credits to use on the platform when they sign up!"
    ]
  },
  {
    keywords: ['problem', 'issue', 'error', 'trouble', 'help', 'support'],
    responses: [
      "I'm sorry to hear you're having trouble! I'd be happy to help resolve the issue or connect you with our support team. 🛟",
      "Let me help troubleshoot that for you. Could you provide more details about what's happening?",
      "I'm here to help! What specific problem are you experiencing with EmviApp?",
      "I'd be happy to assist with any issues you're having. Would you like me to guide you through some troubleshooting steps?"
    ]
  },
  {
    keywords: ['thank', 'thanks', 'appreciate'],
    responses: [
      "You're very welcome! I'm always here if you need anything else. 😊",
      "Happy to help! Is there anything else you'd like to know about EmviApp?",
      "Anytime! Don't hesitate to reach out if you have more questions.",
      "It's my pleasure! I'm here to make your EmviApp experience better. Anything else I can assist with?"
    ]
  },
  {
    keywords: ['what is emviapp', 'about emviapp', 'emviapp purpose'],
    responses: [
      "EmviApp is a complete platform for the beauty industry that connects clients, artists, and salon owners in one seamless ecosystem. We make booking, managing, and growing beauty businesses simple! ✨",
      "EmviApp is the all-in-one solution for the beauty industry! We help salon owners grow their business, artists showcase their work, and clients find and book perfect services.",
      "Think of EmviApp as the hub where beauty professionals and clients connect. We provide tools for booking, business management, portfolio showcasing, and more!",
      "EmviApp is revolutionizing the beauty industry by bringing everything together in one place - booking, business management, artist discovery, and client connections."
    ]
  }
];
