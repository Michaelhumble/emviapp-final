import { lazy } from 'react';

const Index = lazy(() => import('./pages/Index'));
const Artists = lazy(() => import('./pages/Artists'));
const Jobs = lazy(() => import('./pages/Jobs'));
const PostJob = lazy(() => import('./pages/PostJob'));
const PostJobBillion = lazy(() => import('./pages/PostJobBillion'));
const PostJobExperimental = lazy(() => import('./pages/PostJobExperimental'));
const CreateJobPosting = lazy(() => import('./pages/CreateJobPosting'));
const SalonOwners = lazy(() => import('./pages/SalonOwners'));
const PostSalon = lazy(() => import('./pages/PostSalon'));
const SalonMarketplace = lazy(() => import('./pages/SalonMarketplace'));
const About = lazy(() => import('./pages/About.routes'));
const Contact = lazy(() => import('./pages/Contact'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Refund = lazy(() => import('./pages/Refund'));
const Cookies = lazy(() => import('./pages/Cookies'));
const Welcome = lazy(() => import('./pages/Welcome'));
const Analysis = lazy(() => import('./pages/Analysis'));
const TestEnhancedSignUp = lazy(() => import('./pages/TestEnhancedSignUp'));
const Settings = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Community = lazy(() => import('./pages/Community'));

const Dashboard = lazy(() => import('./pages/Dashboard'));
const DashboardArtist = lazy(() => import('./pages/dashboard/artist/DashboardArtist'));
const DashboardArtistBookingCalendar = lazy(() => import('./pages/dashboard/artist/DashboardArtistBookingCalendar'));
const DashboardArtistInbox = lazy(() => import('./pages/dashboard/artist/DashboardArtistInbox'));
const DashboardArtistProfile = lazy(() => import('./pages/dashboard/artist/DashboardArtistProfile'));
const DashboardArtistPortfolio = lazy(() => import('./pages/dashboard/artist/DashboardArtistPortfolio'));
const DashboardArtistServices = lazy(() => import('./pages/dashboard/artist/DashboardArtistServices'));
const DashboardArtistAvailability = lazy(() => import('./pages/dashboard/artist/DashboardArtistAvailability'));
const DashboardArtistReviews = lazy(() => import('./pages/dashboard/artist/DashboardArtistReviews'));
const DashboardArtistSettings = lazy(() => import('./pages/dashboard/artist/DashboardArtistSettings'));
const DashboardArtistAnalytics = lazy(() => import('./pages/dashboard/artist/DashboardArtistAnalytics'));
const DashboardArtistPayments = lazy(() => import('./pages/dashboard/artist/DashboardArtistPayments'));
const DashboardArtistBookings = lazy(() => import('./pages/dashboard/artist/DashboardArtistBookings'));
const DashboardArtistBookingDetails = lazy(() => import('./pages/dashboard/artist/DashboardArtistBookingDetails'));
const DashboardSalon = lazy(() => import('./pages/dashboard/salon/DashboardSalon'));
const DashboardSalonProfile = lazy(() => import('./pages/dashboard/salon/DashboardSalonProfile'));
const DashboardSalonTeam = lazy(() => import('./pages/dashboard/salon/DashboardSalonTeam'));
const DashboardSalonServices = lazy(() => import('./pages/dashboard/salon/DashboardSalonServices'));
const DashboardSalonBookings = lazy(() => import('./pages/dashboard/salon/DashboardSalonBookings'));
const DashboardSalonAnalytics = lazy(() => import('./pages/dashboard/salon/DashboardSalonAnalytics'));
const DashboardSalonSettings = lazy(() => import('./pages/dashboard/salon/DashboardSalonSettings'));
const DashboardSalonPayments = lazy(() => import('./pages/dashboard/salon/DashboardSalonPayments'));
const DashboardSalonMarketing = lazy(() => import('./pages/dashboard/salon/DashboardSalonMarketing'));
const DashboardSalonInventory = lazy(() => import('./pages/dashboard/salon/DashboardSalonInventory'));
const DashboardSalonReviews = lazy(() => import('./pages/dashboard/salon/DashboardSalonReviews'));
const DashboardSalonJobs = lazy(() => import('./pages/dashboard/salon/DashboardSalonJobs'));
const DashboardSalonJobDetails = lazy(() => import('./pages/dashboard/salon/DashboardSalonJobDetails'));
const DashboardSalonCreateJob = lazy(() => import('./pages/dashboard/salon/DashboardSalonCreateJob'));
const DashboardSalonEditJob = lazy(() => import('./pages/dashboard/salon/DashboardSalonEditJob'));
const DashboardClient = lazy(() => import('./pages/dashboard/client/DashboardClient'));
const DashboardClientBookings = lazy(() => import('./pages/dashboard/client/DashboardClientBookings'));
const DashboardClientFavorites = lazy(() => import('./pages/dashboard/client/DashboardClientFavorites'));
const DashboardClientProfile = lazy(() => import('./pages/dashboard/client/DashboardClientProfile'));
const DashboardClientSettings = lazy(() => import('./pages/dashboard/client/DashboardClientSettings'));
const DashboardClientPayments = lazy(() => import('./pages/dashboard/client/DashboardClientPayments'));
const DashboardClientReviews = lazy(() => import('./pages/dashboard/client/DashboardClientReviews'));
const DashboardClientInbox = lazy(() => import('./pages/dashboard/client/DashboardClientInbox'));

const SignIn = lazy(() => import('./pages/auth/SignIn'));
const SignUp = lazy(() => import('./pages/auth/SignUp'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));
const VerifyEmail = lazy(() => import('./pages/auth/VerifyEmail'));
const VerifyPhone = lazy(() => import('./pages/auth/VerifyPhone'));
const OnboardingArtist = lazy(() => import('./pages/auth/OnboardingArtist'));
const OnboardingSalon = lazy(() => import('./pages/auth/OnboardingSalon'));
const OnboardingClient = lazy(() => import('./pages/auth/OnboardingClient'));
const OnboardingComplete = lazy(() => import('./pages/auth/OnboardingComplete'));
const AuthCallback = lazy(() => import('./pages/auth/AuthCallback'));
const TeamInvite = lazy(() => import('./pages/auth/TeamInvite'));

const ArtistProfile = lazy(() => import('./pages/u'));
const SalonProfile = lazy(() => import('./pages/s'));
const BookingFlow = lazy(() => import('./pages/BookingFlow'));
const BookingConfirmation = lazy(() => import('./pages/BookingConfirmation'));
const BookingDetails = lazy(() => import('./pages/BookingDetails'));
const BookingCancel = lazy(() => import('./pages/BookingCancel'));
const BookingReschedule = lazy(() => import('./pages/BookingReschedule'));
const BookingReview = lazy(() => import('./pages/BookingReview'));

const Salons = lazy(() => import('./pages/Salons'));
const SalonDetails = lazy(() => import('./pages/SalonDetails'));
const JobDetails = lazy(() => import('./pages/JobDetails'));
const ArtistDetails = lazy(() => import('./pages/ArtistDetails'));
const Chat = lazy(() => import('./pages/Chat'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Search = lazy(() => import('./pages/Search'));
const Checkout = lazy(() => import('./pages/Checkout'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));
const PaymentCancel = lazy(() => import('./pages/PaymentCancel'));
const PaymentFailure = lazy(() => import('./pages/PaymentFailure'));
const StripeConnect = lazy(() => import('./pages/StripeConnect'));
const StripeConnectCallback = lazy(() => import('./pages/StripeConnectCallback'));
const StripeConnectRefresh = lazy(() => import('./pages/StripeConnectRefresh'));
const StripeConnectSettings = lazy(() => import('./pages/StripeConnectSettings'));
const StripeConnectOnboarding = lazy(() => import('./pages/StripeConnectOnboarding'));
const StripeConnectOnboardingCallback = lazy(() => import('./pages/StripeConnectOnboardingCallback'));
const StripeConnectDashboard = lazy(() => import('./pages/StripeConnectDashboard'));
const StripeConnectPayouts = lazy(() => import('./pages/StripeConnectPayouts'));
const StripeConnectPayments = lazy(() => import('./pages/StripeConnectPayments'));
const StripeConnectBalance = lazy(() => import('./pages/StripeConnectBalance'));
const StripeConnectCustomers = lazy(() => import('./pages/StripeConnectCustomers'));
const StripeConnectProducts = lazy(() => import('./pages/StripeConnectProducts'));
const StripeConnectSubscriptions = lazy(() => import('./pages/StripeConnectSubscriptions'));
const StripeConnectInvoices = lazy(() => import('./pages/StripeConnectInvoices'));
const StripeConnectBilling = lazy(() => import('./pages/StripeConnectBilling'));
const StripeConnectTaxes = lazy(() => import('./pages/StripeConnectTaxes'));
const StripeConnectReports = lazy(() => import('./pages/StripeConnectReports'));
const StripeConnectSettings2 = lazy(() => import('./pages/StripeConnectSettings2'));
const StripeConnectHelp = lazy(() => import('./pages/StripeConnectHelp'));
const StripeConnectLogs = lazy(() => import('./pages/StripeConnectLogs'));
const StripeConnectWebhooks = lazy(() => import('./pages/StripeConnectWebhooks'));
const StripeConnectApiKeys = lazy(() => import('./pages/StripeConnectApiKeys'));
const StripeConnectTeam = lazy(() => import('./pages/StripeConnectTeam'));
const StripeConnectBranding = lazy(() => import('./pages/StripeConnectBranding'));
const StripeConnectEmails = lazy(() => import('./pages/StripeConnectEmails'));
const StripeConnectNotifications = lazy(() => import('./pages/StripeConnectNotifications'));
const StripeConnectIntegrations = lazy(() => import('./pages/StripeConnectIntegrations'));
const StripeConnectDevelopers = lazy(() => import('./pages/StripeConnectDevelopers'));
const StripeConnectApps = lazy(() => import('./pages/StripeConnectApps'));
const StripeConnectExtensions = lazy(() => import('./pages/StripeConnectExtensions'));
const StripeConnectMarketplace = lazy(() => import('./pages/StripeConnectMarketplace'));
const StripeConnectPartners = lazy(() => import('./pages/StripeConnectPartners'));
const StripeConnectResources = lazy(() => import('./pages/StripeConnectResources'));
const StripeConnectDocumentation = lazy(() => import('./pages/StripeConnectDocumentation'));
const StripeConnectSupport = lazy(() => import('./pages/StripeConnectSupport'));
const StripeConnectFeedback = lazy(() => import('./pages/StripeConnectFeedback'));
const StripeConnectStatus = lazy(() => import('./pages/StripeConnectStatus'));
const StripeConnectRoadmap = lazy(() => import('./pages/StripeConnectRoadmap'));
const StripeConnectChangelog = lazy(() => import('./pages/StripeConnectChangelog'));
const StripeConnectBlog = lazy(() => import('./pages/StripeConnectBlog'));
const StripeConnectEvents = lazy(() => import('./pages/StripeConnectEvents'));
const StripeConnectCommunity = lazy(() => import('./pages/StripeConnectCommunity'));
const StripeConnectForums = lazy(() => import('./pages/StripeConnectForums'));
const StripeConnectSlack = lazy(() => import('./pages/StripeConnectSlack'));
const StripeConnectTwitter = lazy(() => import('./pages/StripeConnectTwitter'));
const StripeConnectFacebook = lazy(() => import('./pages/StripeConnectFacebook'));
const StripeConnectInstagram = lazy(() => import('./pages/StripeConnectInstagram'));
const StripeConnectLinkedin = lazy(() => import('./pages/StripeConnectLinkedin'));
const StripeConnectYoutube = lazy(() => import('./pages/StripeConnectYoutube'));
const StripeConnectTiktok = lazy(() => import('./pages/StripeConnectTiktok'));
const StripeConnectSnapchat = lazy(() => import('./pages/StripeConnectSnapchat'));
const StripeConnectPinterest = lazy(() => import('./pages/StripeConnectPinterest'));
const StripeConnectReddit = lazy(() => import('./pages/StripeConnectReddit'));
const StripeConnectDiscord = lazy(() => import('./pages/StripeConnectDiscord'));
const StripeConnectTelegram = lazy(() => import('./pages/StripeConnectTelegram'));
const StripeConnectWhatsapp = lazy(() => import('./pages/StripeConnectWhatsapp'));
const StripeConnectMessenger = lazy(() => import('./pages/StripeConnectMessenger'));
const StripeConnectSignal = lazy(() => import('./pages/StripeConnectSignal'));
const StripeConnectWechat = lazy(() => import('./pages/StripeConnectWechat'));
const StripeConnectLine = lazy(() => import('./pages/StripeConnectLine'));
const StripeConnectKakao = lazy(() => import('./pages/StripeConnectKakao'));
const StripeConnectViber = lazy(() => import('./pages/StripeConnectViber'));
const StripeConnectSkype = lazy(() => import('./pages/StripeConnectSkype'));
const StripeConnectZoom = lazy(() => import('./pages/StripeConnectZoom'));
const StripeConnectTeams = lazy(() => import('./pages/StripeConnectTeams'));
const StripeConnectSlack2 = lazy(() => import('./pages/StripeConnectSlack2'));
const StripeConnectMeet = lazy(() => import('./pages/StripeConnectMeet'));
const StripeConnectHangouts = lazy(() => import('./pages/StripeConnectHangouts'));
const StripeConnectDuo = lazy(() => import('./pages/StripeConnectDuo'));
const StripeConnectFacetime = lazy(() => import('./pages/StripeConnectFacetime'));
const StripeConnectWebex = lazy(() => import('./pages/StripeConnectWebex'));
const StripeConnectGotoMeeting = lazy(() => import('./pages/StripeConnectGotoMeeting'));
const StripeConnectJoin = lazy(() => import('./pages/StripeConnectJoin'));
const StripeConnectMicrosoft = lazy(() => import('./pages/StripeConnectMicrosoft'));
const StripeConnectGoogle = lazy(() => import('./pages/StripeConnectGoogle'));
const StripeConnectApple = lazy(() => import('./pages/StripeConnectApple'));
const StripeConnectFacebook2 = lazy(() => import('./pages/StripeConnectFacebook2'));
const StripeConnectTwitter2 = lazy(() => import('./pages/StripeConnectTwitter2'));
const StripeConnectLinkedin2 = lazy(() => import('./pages/StripeConnectLinkedin2'));
const StripeConnectGithub = lazy(() => import('./pages/StripeConnectGithub'));
const StripeConnectGitlab = lazy(() => import('./pages/StripeConnectGitlab'));
const StripeConnectBitbucket = lazy(() => import('./pages/StripeConnectBitbucket'));
const StripeConnectJira = lazy(() => import('./pages/StripeConnectJira'));
const StripeConnectConfluence = lazy(() => import('./pages/StripeConnectConfluence'));
const StripeConnectTrello = lazy(() => import('./pages/StripeConnectTrello'));
const StripeConnectAsana = lazy(() => import('./pages/StripeConnectAsana'));
const StripeConnectNotion = lazy(() => import('./pages/StripeConnectNotion'));
const StripeConnectClickup = lazy(() => import('./pages/StripeConnectClickup'));
const StripeConnectMonday = lazy(() => import('./pages/StripeConnectMonday'));
const StripeConnectAirtable = lazy(() => import('./pages/StripeConnectAirtable'));
const StripeConnectCoda = lazy(() => import('./pages/StripeConnectCoda'));
const StripeConnectFigma = lazy(() => import('./pages/StripeConnectFigma'));
const StripeConnectSketch = lazy(() => import('./pages/StripeConnectSketch'));
const StripeConnectInvision = lazy(() => import('./pages/StripeConnectInvision'));
const StripeConnectZeplin = lazy(() => import('./pages/StripeConnectZeplin'));
const StripeConnectAbstract = lazy(() => import('./pages/StripeConnectAbstract'));
const StripeConnectMiro = lazy(() => import('./pages/StripeConnectMiro'));
const StripeConnectMural = lazy(() => import('./pages/StripeConnectMural'));
const StripeConnectWhimsical = lazy(() => import('./pages/StripeConnectWhimsical'));
const StripeConnectLucidchart = lazy(() => import('./pages/StripeConnectLucidchart'));
const StripeConnectDraw = lazy(() => import('./pages/StripeConnectDraw'));
const StripeConnectCanva = lazy(() => import('./pages/StripeConnectCanva'));
const StripeConnectPrezi = lazy(() => import('./pages/StripeConnectPrezi'));
const StripeConnectSlides = lazy(() => import('./pages/StripeConnectSlides'));
const StripeConnectDocs = lazy(() => import('./pages/StripeConnectDocs'));
const StripeConnectSheets = lazy(() => import('./pages/StripeConnectSheets'));
const StripeConnectWord = lazy(() => import('./pages/StripeConnectWord'));
const StripeConnectExcel = lazy(() => import('./pages/StripeConnectExcel'));
const StripeConnectPowerpoint = lazy(() => import('./pages/StripeConnectPowerpoint'));
const StripeConnectOnedrive = lazy(() => import('./pages/StripeConnectOnedrive'));
const StripeConnectDropbox = lazy(() => import('./pages/StripeConnectDropbox'));
const StripeConnectBox = lazy(() => import('./pages/StripeConnectBox'));
const StripeConnectDrive = lazy(() => import('./pages/StripeConnectDrive'));
const StripeConnectIcloud = lazy(() => import('./pages/StripeConnectIcloud'));
const StripeConnectEvernote = lazy(() => import('./pages/StripeConnectEvernote'));
const StripeConnectOneNote = lazy(() => import('./pages/StripeConnectOneNote'));
const StripeConnectBear = lazy(() => import('./pages/StripeConnectBear'));
const StripeConnectNotion2 = lazy(() => import('./pages/StripeConnectNotion2'));
const StripeConnectRoam = lazy(() => import('./pages/StripeConnectRoam'));
const StripeConnectObsidian = lazy(() => import('./pages/StripeConnectObsidian'));
const StripeConnectLogseq = lazy(() => import('./pages/StripeConnectLogseq'));
const StripeConnectCraft = lazy(() => import('./pages/StripeConnectCraft'));
const StripeConnectNotion3 = lazy(() => import('./pages/StripeConnectNotion3'));
const StripeConnectCoda2 = lazy(() => import('./pages/StripeConnectCoda2'));
const StripeConnectAirtable2 = lazy(() => import('./pages/StripeConnectAirtable2'));
const StripeConnectMonday2 = lazy(() => import('./pages/StripeConnectMonday2'));
const StripeConnectClickup2 = lazy(() => import('./pages/StripeConnectClickup2'));
const StripeConnectAsana2 = lazy(() => import('./pages/StripeConnectAsana2'));
const StripeConnectTrello2 = lazy(() => import('./pages/StripeConnectTrello2'));
const StripeConnectJira2 = lazy(() => import('./pages/StripeConnectJira2'));
const StripeConnectConfluence2 = lazy(() => import('./pages/StripeConnectConfluence2'));
const StripeConnectGithub2 = lazy(() => import('./pages/StripeConnectGithub2'));
const StripeConnectGitlab2 = lazy(() => import('./pages/StripeConnectGitlab2'));
const StripeConnectBitbucket2 = lazy(() => import('./pages/StripeConnectBitbucket2'));
const StripeConnectSlack3 = lazy(() => import('./pages/StripeConnectSlack3'));
const StripeConnectTeams2 = lazy(() => import('./pages/StripeConnectTeams2'));
const StripeConnectDiscord2 = lazy(() => import('./pages/StripeConnectDiscord2'));
const StripeConnectZoom2 = lazy(() => import('./pages/StripeConnectZoom2'));
const StripeConnectMeet2 = lazy(() => import('./pages/StripeConnectMeet2'));
const StripeConnectWebex2 = lazy(() => import('./pages/StripeConnectWebex2'));
const StripeConnectGotoMeeting2 = lazy(() => import('./pages/StripeConnectGotoMeeting2'));
const StripeConnectJoin2 = lazy(() => import('./pages/StripeConnectJoin2'));
const StripeConnectHangouts2 = lazy(() => import('./pages/StripeConnectHangouts2'));
const StripeConnectDuo2 = lazy(() => import('./pages/StripeConnectDuo2'));
const StripeConnectFacetime2 = lazy(() => import('./pages/StripeConnectFacetime2'));
const StripeConnectSkype2 = lazy(() => import('./pages/StripeConnectSkype2'));
const StripeConnectWhatsapp2 = lazy(() => import('./pages/StripeConnectWhatsapp2'));
const StripeConnectMessenger2 = lazy(() => import('./pages/StripeConnectMessenger2'));
const StripeConnectTelegram2 = lazy(() => import('./pages/StripeConnectTelegram2'));
const StripeConnectSignal2 = lazy(() => import('./pages/StripeConnectSignal2'));
const StripeConnectWechat2 = lazy(() => import('./pages/StripeConnectWechat2'));
const StripeConnectLine2 = lazy(() => import('./pages/StripeConnectLine2'));
const StripeConnectKakao2 = lazy(() => import('./pages/StripeConnectKakao2'));
const StripeConnectViber2 = lazy(() => import('./pages/StripeConnectViber2'));
const StripeConnectTwitter3 = lazy(() => import('./pages/StripeConnectTwitter3'));
const StripeConnectFacebook3 = lazy(() => import('./pages/StripeConnectFacebook3'));
const StripeConnectInstagram2 = lazy(() => import('./pages/StripeConnectInstagram2'));
const StripeConnectLinkedin3 = lazy(() => import('./pages/StripeConnectLinkedin3'));
const StripeConnectYoutube2 = lazy(() => import('./pages/StripeConnectYoutube2'));
const StripeConnectTiktok2 = lazy(() => import('./pages/StripeConnectTiktok2'));
const StripeConnectSnapchat2 = lazy(() => import('./pages/StripeConnectSnapchat2'));
const StripeConnectPinterest2 = lazy(() => import('./pages/StripeConnectPinterest2'));
const StripeConnectReddit2 = lazy(() => import('./pages/StripeConnectReddit2'));
const StripeConnectGoogle2 = lazy(() => import('./pages/StripeConnectGoogle2'));
const StripeConnectMicrosoft2 = lazy(() => import('./pages/StripeConnectMicrosoft2'));
const StripeConnectApple2 = lazy(() => import('./pages/StripeConnectApple2'));
const StripeConnectFigma2 = lazy(() => import('./pages/StripeConnectFigma2'));
const StripeConnectSketch2 = lazy(() => import('./pages/StripeConnectSketch2'));
const StripeConnectInvision2 = lazy(() => import('./pages/StripeConnectInvision2'));
const StripeConnectZeplin2 = lazy(() => import('./pages/StripeConnectZeplin2'));
const StripeConnectAbstract2 = lazy(() => import('./pages/StripeConnectAbstract2'));
const StripeConnectMiro2 = lazy(() => import('./pages/StripeConnectMiro2'));
const StripeConnectMural2 = lazy(() => import('./pages/StripeConnectMural2'));
const StripeConnectWhimsical2 = lazy(() => import('./pages/StripeConnectWhimsical2'));
const StripeConnectLucidchart2 = lazy(() => import('./pages/StripeConnectLucidchart2'));
const StripeConnectDraw2 = lazy(() => import('./pages/StripeConnectDraw2'));
const StripeConnectCanva2 = lazy(() => import('./pages/StripeConnectCanva2'));
const StripeConnectPrezi2 = lazy(() => import('./pages/StripeConnectPrezi2'));
const StripeConnectSlides2 = lazy(() => import('./pages/StripeConnectSlides2'));
const StripeConnectDocs2 = lazy(() => import('./pages/StripeConnectDocs2'));
const StripeConnectSheets2 = lazy(() => import('./pages/StripeConnectSheets2'));
const StripeConnectWord2 = lazy(() => import('./pages/StripeConnectWord2'));
const StripeConnectExcel2 = lazy(() => import('./pages/StripeConnectExcel2'));
const StripeConnectPowerpoint2 = lazy(() => import('./pages/StripeConnectPowerpoint2'));
const StripeConnectOnedrive2 = lazy(() => import('./pages/StripeConnectOnedrive2'));
const StripeConnectDropbox2 = lazy(() => import('./pages/StripeConnectDropbox2'));
const StripeConnectBox2 = lazy(() => import('./pages/StripeConnectBox2'));
const StripeConnectDrive2 = lazy(() => import('./pages/StripeConnectDrive2'));
const StripeConnectIcloud2 = lazy(() => import('./pages/StripeConnectIcloud2'));
const StripeConnectEvernote2 = lazy(() => import('./pages/StripeConnectEvernote2'));
const StripeConnectOneNote2 = lazy(() => import('./pages/StripeConnectOneNote2'));
const StripeConnectBear2 = lazy(() => import('./pages/StripeConnectBear2'));
const StripeConnectNotion4 = lazy(() => import('./pages/StripeConnectNotion4'));
const StripeConnectRoam2 = lazy(() => import('./pages/StripeConnectRoam2'));
const StripeConnectObsidian2 = lazy(() => import('./pages/StripeConnectObsidian2'));
const StripeConnectLogseq2 = lazy(() => import('./pages/StripeConnectLogseq2'));
const StripeConnectCraft2 = lazy(() => import('./pages/StripeConnectCraft2'));

const routes = [
  {
    path: "/",
    element: Index
  },
  {
    path: "/artists",
    element: Artists
  },
  {
    path: "/jobs",
    element: Jobs
  },
  {
    path: "/post-job",
    element: PostJob
  },
  {
    path: "/post-job-billion",
    element: PostJobBillion
  },
  {
    path: "/post-job-experimental",
    element: PostJobExperimental
  },
  {
    path: "/create-job-posting",
    element: CreateJobPosting
  },
  {
    path: "/salon-owners",
    element: SalonOwners
  },
  {
    path: "/post-salon",
    element: PostSalon
  },
  {
    path: "/salon-marketplace",
    element: SalonMarketplace
  },
  {
    path: "/about/*",
    element: About
  },
  {
    path: "/contact",
    element: Contact
  },
  {
    path: "/terms",
    element: Terms
  },
  {
    path: "/privacy",
    element: Privacy
  },
  {
    path: "/refund",
    element: Refund
  },
  {
    path: "/cookies",
    element: Cookies
  },
  {
    path: "/welcome",
    element: Welcome
  },
  {
    path: "/analysis",
    element: Analysis
  },
  {
    path: "/test-enhanced-sign-up",
    element: TestEnhancedSignUp
  },
  {
    path: "/settings",
    element: Settings
  },
  {
    path: "/dashboard",
    element: Dashboard
  },
  {
    path: "/dashboard/artist",
    element: DashboardArtist
  },
  {
    path: "/dashboard/artist/booking-calendar",
    element: DashboardArtistBookingCalendar
  },
  {
    path: "/dashboard/artist/inbox",
    element: DashboardArtistInbox
  },
  {
    path: "/dashboard/artist/profile",
    element: DashboardArtistProfile
  },
  {
    path: "/dashboard/artist/portfolio",
    element: DashboardArtistPortfolio
  },
  {
    path: "/dashboard/artist/services",
    element: DashboardArtistServices
  },
  {
    path: "/dashboard/artist/availability",
    element: DashboardArtistAvailability
  },
  {
    path: "/dashboard/artist/reviews",
    element: DashboardArtistReviews
  },
  {
    path: "/dashboard/artist/settings",
    element: DashboardArtistSettings
  },
  {
    path: "/dashboard/artist/analytics",
    element: DashboardArtistAnalytics
  },
  {
    path: "/dashboard/artist/payments",
    element: DashboardArtistPayments
  },
  {
    path: "/dashboard/artist/bookings",
    element: DashboardArtistBookings
  },
  {
    path: "/dashboard/artist/bookings/:id",
    element: DashboardArtistBookingDetails
  },
  {
    path: "/dashboard/salon",
    element: DashboardSalon
  },
  {
    path: "/dashboard/salon/profile",
    element: DashboardSalonProfile
  },
  {
    path: "/dashboard/salon/team",
    element: DashboardSalonTeam
  },
  {
    path: "/dashboard/salon/services",
    element: DashboardSalonServices
  },
  {
    path: "/dashboard/salon/bookings",
    element: DashboardSalonBookings
  },
  {
    path: "/dashboard/salon/analytics",
    element: DashboardSalonAnalytics
  },
  {
    path: "/dashboard/salon/settings",
    element: DashboardSalonSettings
  },
  {
    path: "/dashboard/salon/payments",
    element: DashboardSalonPayments
  },
  {
    path: "/dashboard/salon/marketing",
    element: DashboardSalonMarketing
  },
  {
    path: "/dashboard/salon/inventory",
    element: DashboardSalonInventory
  },
  {
    path: "/dashboard/salon/reviews",
    element: DashboardSalonReviews
  },
  {
    path: "/dashboard/salon/jobs",
    element: DashboardSalonJobs
  },
  {
    path: "/dashboard/salon/jobs/:id",
    element: DashboardSalonJobDetails
  },
  {
    path: "/dashboard/salon/jobs/create",
    element: DashboardSalonCreateJob
  },
  {
    path: "/dashboard/salon/jobs/:id/edit",
    element: DashboardSalonEditJob
  },
  {
    path: "/dashboard/client",
    element: DashboardClient
  },
  {
    path: "/dashboard/client/bookings",
    element: DashboardClientBookings
  },
  {
    path: "/dashboard/client/favorites",
    element: DashboardClientFavorites
  },
  {
    path: "/dashboard/client/profile",
    element: DashboardClientProfile
  },
  {
    path: "/dashboard/client/settings",
    element: DashboardClientSettings
  },
  {
    path: "/dashboard/client/payments",
    element: DashboardClientPayments
  },
  {
    path: "/dashboard/client/reviews",
    element: DashboardClientReviews
  },
  {
    path: "/dashboard/client/inbox",
    element: DashboardClientInbox
  },
  {
    path: "/auth/signin",
    element: SignIn
  },
  {
    path: "/auth/signup",
    element: SignUp
  },
  {
    path: "/auth/forgot-password",
    element: ForgotPassword
  },
  {
    path: "/auth/reset-password",
    element: ResetPassword
  },
  {
    path: "/auth/verify-email",
    element: VerifyEmail
  },
  {
    path: "/auth/verify-phone",
    element: VerifyPhone
  },
  {
    path: "/auth/onboarding/artist",
    element: OnboardingArtist
  },
  {
    path: "/auth/onboarding/salon",
    element: OnboardingSalon
  },
  {
    path: "/auth/onboarding/client",
    element: OnboardingClient
  },
  {
    path: "/auth/onboarding/complete",
    element: OnboardingComplete
  },
  {
    path: "/auth/callback",
    element: AuthCallback
  },
  {
    path: "/auth/team-invite",
    element: TeamInvite
  },
  {
    path: "/u/:username",
    element: ArtistProfile
  },
  {
    path: "/s/:slug",
    element: SalonProfile
  },
  {
    path: "/booking/:id",
    element: BookingFlow
  },
  {
    path: "/booking/:id/confirmation",
    element: BookingConfirmation
  },
  {
    path: "/booking/:id/details",
    element: BookingDetails
  },
  {
    path: "/booking/:id/cancel",
    element: BookingCancel
  },
  {
    path: "/booking/:id/reschedule",
    element: BookingReschedule
  },
  {
    path: "/booking/:id/review",
    element: BookingReview
  },
  {
    path: "/salons",
    element: Salons
  },
  {
    path: "/salons/:id",
    element: SalonDetails
  },
  {
    path: "/jobs/:id",
    element: JobDetails
  },
  {
    path: "/artists/:id",
    element: ArtistDetails
  },
  {
    path: "/chat",
    element: Chat
  },
  {
    path: "/notifications",
    element: Notifications
  },
  {
    path: "/search",
    element: Search
  },
  {
    path: "/checkout",
    element: Checkout
  },
  {
    path: "/payment/success",
    element: PaymentSuccess
  },
  {
    path: "/payment/cancel",
    element: PaymentCancel
  },
  {
    path: "/payment/failure",
    element: PaymentFailure
  },
  {
    path: "/stripe/connect",
    element: StripeConnect
  },
  {
    path: "/stripe/connect/callback",
    element: StripeConnectCallback
  },
  {
    path: "/stripe/connect/refresh",
    element: StripeConnectRefresh
  },
  {
    path: "/stripe/connect/settings",
    element: StripeConnectSettings
  },
  {
    path: "/stripe/connect/onboarding",
    element: StripeConnectOnboarding
  },
  {
    path: "/stripe/connect/onboarding/callback",
    element: StripeConnectOnboardingCallback
  },
  {
    path: "/stripe/connect/dashboard",
    element: StripeConnectDashboard
  },
  {
    path: "/stripe/connect/payouts",
    element: StripeConnectPayouts
  },
  {
    path: "/stripe/connect/payments",
    element: StripeConnectPayments
  },
  {
    path: "/stripe/connect/balance",
    element: StripeConnectBalance
  },
  {
    path: "/stripe/connect/customers",
    element: StripeConnectCustomers
  },
  {
    path: "/stripe/connect/products",
    element: StripeConnectProducts
  },
  {
    path: "/stripe/connect/subscriptions",
    element: StripeConnectSubscriptions
  },
  {
    path: "/stripe/connect/invoices",
    element: StripeConnectInvoices
  },
  {
    path: "/stripe/connect/billing",
    element: StripeConnectBilling
  },
  {
    path: "/stripe/connect/taxes",
    element: StripeConnectTaxes
  },
  {
    path: "/stripe/connect/reports",
    element: StripeConnectReports
  },
  {
    path: "/stripe/connect/settings2",
    element: StripeConnectSettings2
  },
  {
    path: "/stripe/connect/help",
    element: StripeConnectHelp
  },
  {
    path: "/stripe/connect/logs",
    element: StripeConnectLogs
  },
  {
    path: "/stripe/connect/webhooks",
    element: StripeConnectWebhooks
  },
  {
    path: "/stripe/connect/api-keys",
    element: StripeConnectApiKeys
  },
  {
    path: "/stripe/connect/team",
    element: StripeConnectTeam
  },
  {
    path: "/stripe/connect/branding",
    element: StripeConnectBranding
  },
  {
    path: "/stripe/connect/emails",
    element: StripeConnectEmails
  },
  {
    path: "/stripe/connect/notifications",
    element: StripeConnectNotifications
  },
  {
    path: "/stripe/connect/integrations",
    element: StripeConnectIntegrations
  },
  {
    path: "/stripe/connect/developers",
    element: StripeConnectDevelopers
  },
  {
    path: "/stripe/connect/apps",
    element: StripeConnectApps
  },
  {
    path: "/stripe/connect/extensions",
    element: StripeConnectExtensions
  },
  {
    path: "/stripe/connect/marketplace",
    element: StripeConnectMarketplace
  },
  {
    path: "/stripe/connect/partners",
    element: StripeConnectPartners
  },
  {
    path: "/stripe/connect/resources",
    element: StripeConnectResources
  },
  {
    path: "/stripe/connect/documentation",
    element: StripeConnectDocumentation
  },
  {
    path: "/stripe/connect/support",
    element: StripeConnectSupport
  },
  {
    path: "/stripe/connect/feedback",
    element: StripeConnectFeedback
  },
  {
    path: "/stripe/connect/status",
    element: StripeConnectStatus
  },
  {
    path: "/stripe/connect/roadmap",
    element: StripeConnectRoadmap
  },
  {
    path: "/stripe/connect/changelog",
    element: StripeConnectChangelog
  },
  {
    path: "/stripe/connect/blog",
    element: StripeConnectBlog
  },
  {
    path: "/stripe/connect/events",
    element: StripeConnectEvents
  },
  {
    path: "/stripe/connect/community",
    element: StripeConnectCommunity
  },
  {
    path: "/stripe/connect/forums",
    element: StripeConnectForums
  },
  {
    path: "/stripe/connect/slack",
    element: StripeConnectSlack
  },
  {
    path: "/stripe/connect/twitter",
    element: StripeConnectTwitter
  },
  {
    path: "/stripe/connect/facebook",
    element: StripeConnectFacebook
  },
  {
    path: "/stripe/connect/instagram",
    element: StripeConnectInstagram
  },
  {
    path: "/stripe/connect/linkedin",
    element: StripeConnectLinkedin
  },
  {
    path: "/stripe/connect/youtube",
    element: StripeConnectYoutube
  },
  {
    path: "/stripe/connect/tiktok",
    element: StripeConnectTiktok
  },
  {
    path: "/stripe/connect/snapchat",
    element: StripeConnectSnapchat
  },
  {
    path: "/stripe/connect/pinterest",
    element: StripeConnectPinterest
  },
  {
    path: "/stripe/connect/reddit",
    element: StripeConnectReddit
  },
  {
    path: "/stripe/connect/discord",
    element: StripeConnectDiscord
  },
  {
    path: "/stripe/connect/telegram",
    element: StripeConnectTelegram
  },
  {
    path: "/stripe/connect/whatsapp",
    element: StripeConnectWhatsapp
  },
  {
    path: "/stripe/connect/messenger",
    element: StripeConnectMessenger
  },
  {
    path: "/stripe/connect/signal",
    element: StripeConnectSignal
  },
  {
    path: "/stripe/connect/wechat",
    element: StripeConnectWechat
  },
  {
    path: "/stripe/connect/line",
    element: StripeConnectLine
  },
  {
    path: "/stripe/connect/kakao",
    element: StripeConnectKakao
  },
  {
    path: "/stripe/connect/viber",
    element: StripeConnectViber
  },
  {
    path: "/stripe/connect/skype",
    element: StripeConnectSkype
  },
  {
    path: "/stripe/connect/zoom",
    element: StripeConnectZoom
  },
  {
    path: "/stripe/connect/teams",
    element: StripeConnectTeams
  },
  {
    path: "/stripe/connect/slack2",
    element: StripeConnectSlack2
  },
  {
    path: "/stripe/connect/meet",
    element: StripeConnectMeet
  },
  {
    path: "/stripe/connect/hangouts",
    element: StripeConnectHangouts
  },
  {
    path: "/stripe/connect/duo",
    element: StripeConnectDuo
  },
  {
    path: "/stripe/connect/facetime",
    element: StripeConnectFacetime
  },
  {
    path: "/stripe/connect/webex",
    element: StripeConnectWebex
  },
  {
    path: "/stripe/connect/gotomeeting",
    element: StripeConnectGotoMeeting
  },
  {
    path: "/stripe/connect/join",
    element: StripeConnectJoin
  },
  {
    path: "/stripe/connect/microsoft",
    element: StripeConnectMicrosoft
  },
  {
    path: "/stripe/connect/google",
    element: StripeConnectGoogle
  },
  {
    path: "/stripe/connect/apple",
    element: StripeConnectApple
  },
  {
    path: "/stripe/connect/facebook2",
    element: StripeConnectFacebook2
  },
  {
    path: "/stripe/connect/twitter2",
    element: StripeConnectTwitter2
  },
  {
    path: "/stripe/connect/linkedin2",
    element: StripeConnectLinkedin2
  },
  {
    path: "/stripe/connect/github",
    element: StripeConnectGithub
  },
  {
    path: "/stripe/connect/gitlab",
    element: StripeConnectGitlab
  },
  {
    path: "/stripe/connect/bitbucket",
    element: StripeConnectBitbucket
  },
  {
    path: "/stripe/connect/jira",
    element: StripeConnectJira
  },
  {
    path: "/stripe/connect/confluence",
    element: StripeConnectConfluence
  },
  {
    path: "/stripe/connect/trello",
    element: StripeConnectTrello
  },
  {
    path: "/stripe/connect/asana",
    element: StripeConnectAsana
  },
  {
    path: "/stripe/connect/notion",
    element: StripeConnectNotion
  },
  {
    path: "/stripe/connect/clickup",
    element: StripeConnectClickup
  },
  {
    path: "/stripe/connect/monday",
    element: StripeConnectMonday
  },
  {
    path: "/stripe/connect/airtable",
    element: StripeConnectAirtable
  },
  {
    path: "/stripe/connect/coda",
    element: StripeConnectCoda
  },
  {
    path: "/stripe/connect/figma",
    element: StripeConnectFigma
  },
  {
    path: "/stripe/connect/sketch",
    element: StripeConnectSketch
  },
  {
    path: "/stripe/connect/invision",
    element: StripeConnectInvision
  },
  {
    path: "/stripe/connect/zeplin",
    element: StripeConnectZeplin
  },
  {
    path: "/stripe/connect/abstract",
    element: StripeConnectAbstract
  },
  {
    path: "/stripe/connect/miro",
    element: StripeConnectMiro
  },
  {
    path: "/stripe/connect/mural",
    element: StripeConnectMural
  },
  {
    path: "/stripe/connect/whimsical",
    element: StripeConnectWhimsical
  },
  {
    path: "/stripe/connect/lucidchart",
    element: StripeConnectLucidchart
  },
  {
    path: "/stripe/connect/draw",
    element: StripeConnectDraw
  },
  {
    path: "/stripe/connect/canva",
    element: StripeConnectCanva
  },
  {
    path: "/stripe/connect/prezi",
    element: StripeConnectPrezi
  },
  {
    path: "/stripe/connect/slides",
    element: StripeConnectSlides
  },
  {
    path: "/stripe/connect/docs",
    element: StripeConnectDocs
  },
  {
    path: "/stripe/connect/sheets",
    element: StripeConnectSheets
  },
  {
    path: "/stripe/connect/word",
    element: StripeConnectWord
  },
  {
    path: "/stripe/connect/excel",
    element: StripeConnectExcel
  },
  {
    path: "/stripe/connect/powerpoint",
    element: StripeConnectPowerpoint
  },
  {
    path: "/stripe/connect/onedrive",
    element: StripeConnectOnedrive
  },
  {
    path: "/stripe/connect/dropbox",
    element: StripeConnectDropbox
  },
  {
    path: "/stripe/connect/box",
    element: StripeConnectBox
  },
  {
    path: "/stripe/connect/drive",
    element: StripeConnectDrive
  },
  {
    path: "/stripe/connect/icloud",
    element: StripeConnectIcloud
  },
  {
    path: "/stripe/connect/evernote",
    element: StripeConnectEvernote
  },
  {
    path: "/stripe/connect/onenote",
    element: StripeConnectOneNote
  },
  {
    path: "/stripe/connect/bear",
    element: StripeConnectBear
  },
  {
    path: "/stripe/connect/notion2",
    element: StripeConnectNotion2
  },
  {
    path: "/stripe/connect/roam",
    element: StripeConnectRoam
  },
  {
    path: "/stripe/connect/obsidian",
    element: StripeConnectObsidian
  },
  {
    path: "/stripe/connect/logseq",
    element: StripeConnectLogseq
  },
  {
    path: "/stripe/connect/craft",
    element: StripeConnectCraft
  },
  {
    path: "/stripe/connect/notion3",
    element: StripeConnectNotion3
  },
  {
    path: "/stripe/connect/coda2",
    element: StripeConnectCoda2
  },
  {
    path: "/stripe/connect/airtable2",
    element: StripeConnectAirtable2
  },
  {
    path: "/stripe/connect/monday2",
    element: StripeConnectMonday2
  },
  {
    path: "/stripe/connect/clickup2",
    element: StripeConnectClickup2
  },
  {
    path: "/stripe/connect/asana2",
    element: StripeConnectAsana2
  },
  {
    path: "/stripe/connect/trello2",
    element: StripeConnectTrello2
  },
  {
    path: "/stripe/connect/jira2",
    element: StripeConnectJira2
  },
  {
    path: "/stripe/connect/confluence2",
    element: StripeConnectConfluence2
  },
  {
    path: "/stripe/connect/github2",
    element: StripeConnectGithub2
  },
  {
    path: "/stripe/connect/gitlab2",
    element: StripeConnectGitlab2
  },
  {
    path: "/stripe/connect/bitbucket2",
    element: StripeConnectBitbucket2
  },
  {
    path: "/stripe/connect/slack3",
    element: StripeConnectSlack3
  },
  {
    path: "/stripe/connect/teams2",
    element: StripeConnectTeams2
  },
  {
    path: "/stripe/connect/discord2",
    element: StripeConnectDiscord2
  },
  {
    path: "/stripe/connect/zoom2",
    element: StripeConnectZoom2
  },
  {
    path: "/stripe/connect/meet2",
    element: StripeConnectMeet2
  },
  {
    path: "/stripe/connect/webex2",
    element: StripeConnectWebex2
  },
  {
    path: "/stripe/connect/gotomeeting2",
    element: StripeConnectGotoMeeting2
  },
  {
    path: "/stripe/connect/join2",
    element: StripeConnectJoin2
  },
  {
    path: "/stripe/connect/hangouts2",
    element: StripeConnectHangouts2
  },
  {
    path: "/stripe/connect/duo2",
    element: StripeConnectDuo2
  },
  {
    path: "/stripe/connect/facetime2",
    element: StripeConnectFacetime2
  },
  {
    path: "/stripe/connect/skype2",
    element: StripeConnectSkype2
  },
  {
    path: "/stripe/connect/whatsapp2",
    element: StripeConnectWhatsapp2
  },
  {
    path: "/stripe/connect/messenger2",
    element: StripeConnectMessenger2
  },
  {
    path: "/stripe/connect/telegram2",
    element: StripeConnectTelegram2
  },
  {
    path: "/stripe/connect/signal2",
    element: StripeConnectSignal2
  },
  {
    path: "/stripe/connect/wechat2",
    element: StripeConnectWechat2
  },
  {
    path: "/stripe/connect/line2",
    element: StripeConnectLine2
  },
  {
    path: "/stripe/connect/kakao2",
    element: StripeConnectKakao2
  },
  {
    path: "/stripe/connect/viber2",
    element: StripeConnectViber2
  },
  {
    path: "/stripe/connect/twitter3",
    element: StripeConnectTwitter3
  },
  {
    path: "/stripe/connect/facebook3",
    element: StripeConnectFacebook3
  },
  {
    path: "/stripe/connect/instagram2",
    element: StripeConnectInstagram2
  },
  {
    path: "/stripe/connect/linkedin3",
    element: StripeConnectLinkedin3
  },
  {
    path: "/stripe/connect/youtube2",
    element: StripeConnectYoutube2
  },
  {
    path: "/stripe/connect/tiktok2",
    element: StripeConnectTiktok2
  },
  {
    path: "/stripe/connect/snapchat2",
    element: StripeConnectSnapchat2
  },
  {
    path: "/stripe/connect/pinterest2",
    element: StripeConnectPinterest2
  },
  {
    path: "/stripe/connect/reddit2",
    element: StripeConnectReddit2
  },
  {
    path: "/stripe/connect/google2",
    element: StripeConnectGoogle2
  },
  {
    path: "/stripe/connect/microsoft2",
    element: StripeConnectMicrosoft2
  },
  {
    path: "/stripe/connect/apple2",
    element: StripeConnectApple2
  },
  {
    path: "/stripe/connect/figma2",
    element: StripeConnectFigma2
  },
  {
    path: "/stripe/connect/sketch2",
    element: StripeConnectSketch2
  },
  {
    path: "/stripe/connect/invision2",
    element: StripeConnectInvision2
  },
  {
    path: "/stripe/connect/zeplin2",
    element: StripeConnectZeplin2
  },
  {
    path: "/stripe/connect/abstract2",
    element: StripeConnectAbstract2
  },
  {
    path: "/stripe/connect/miro2",
    element: StripeConnectMiro2
  },
  {
    path: "/stripe/connect/mural2",
    element: StripeConnectMural2
  },
  {
    path: "/stripe/connect/whimsical2",
    element: StripeConnectWhimsical2
  },
  {
    path: "/stripe/connect/lucidchart2",
    element: StripeConnectLucidchart2
  },
  {
    path: "/stripe/connect/draw2",
    element: StripeConnectDraw2
  },
  {
    path: "/stripe/connect/canva2",
    element: StripeConnectCanva2
  },
  {
    path: "/stripe/connect/prezi2",
    element: StripeConnectPrezi2
  },
  {
    path: "/stripe/connect/slides2",
    element: StripeConnectSlides2
  },
  {
    path: "/stripe/connect/docs2",
    element: StripeConnectDocs2
  },
  {
    path: "/stripe/connect/sheets2",
    element: StripeConnectSheets2
  },
  {
    path: "/stripe/connect/word2",
    element: StripeConnectWord2
  },
  {
    path: "/stripe/connect/excel2",
    element: StripeConnectExcel2
  },
  {
    path: "/stripe/connect/powerpoint2",
    element: StripeConnectPowerpoint2
  },
  {
    path: "/stripe/connect/onedrive2",
    element: StripeConnectOnedrive2
  },
  {
    path: "/stripe/connect/dropbox2",
    element: StripeConnectDropbox2
  },
  {
    path: "/stripe/connect/box2",
    element: StripeConnectBox2
  },
  {
    path: "/stripe/connect/drive2",
    element: StripeConnectDrive2
  },
  {
    path: "/stripe/connect/icloud2",
    element: StripeConnectIcloud2
  },
  {
    path: "/stripe/connect/evernote2",
    element: StripeConnectEvernote2
  },
  {
    path: "/stripe/connect/onenote2",
    element: StripeConnectOneNote2
  },
  {
    path: "/stripe/connect/bear2",
    element: StripeConnectBear2
  },
  {
    path: "/stripe/connect/notion4",
    element: StripeConnectNotion4
  },
  {
    path: "/stripe/connect/roam2",
    element: StripeConnectRoam2
  },
  {
    path: "/stripe/connect/obsidian2",
    element: StripeConnectObsidian2
  },
  {
    path: "/stripe/connect/logseq2",
    element: StripeConnectLogseq2
  },
  {
    path: "/stripe/connect/craft2",
    element: StripeConnectCraft2
  },
  {
    path: "*",
    element: NotFound
  },
  {
    path: "/community",
    element: Community
  }
];

export default routes;
