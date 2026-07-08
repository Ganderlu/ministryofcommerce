import {
  Statistic,
  Service,
  NewsItem,
  Event,
  Partner,
  FooterLink,
  ContactCard,
  SocialLink,
  ContactInformation,
  TeamMember,
} from "@/types";
import {
  Phone,
  Email,
  AccessTime,
  HeadsetMic,
  ContactSupport,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  YouTube,
} from "@mui/icons-material";

export const statistics: Statistic[] = [
  {
    id: "1",
    icon: "Business",
    iconColor: "#4A90E2",
    count: "12,458+",
    label: "Registered Businesses",
  },
  {
    id: "2",
    icon: "Group",
    iconColor: "#F5A623",
    count: "563+",
    label: "Registered Cooperatives",
  },
  {
    id: "3",
    icon: "Storefront",
    iconColor: "#50C878",
    count: "2,341+",
    label: "Active MSMEs",
  },
  {
    id: "4",
    icon: "TrendingUp",
    iconColor: "#7ED321",
    count: "98+",
    label: "Investment Projects",
  },
  {
    id: "5",
    icon: "AccountBalance",
    iconColor: "#D4AF37",
    count: "N8.6B+",
    label: "Revenue Generated",
  },
];

export const services: Service[] = [
  {
    id: "1",
    icon: "Description",
    image: "/images/soludo21.png",
    title: "Business Registration",
    description: "Register your business online in minutes",
  },
  {
    id: "2",
    icon: "Verified",
    image: "/images/soludo22.png",
    title: "Permit & Licensing",
    description: "Apply for permits and renew your licenses",
  },
  {
    id: "3",
    icon: "People",
    image: "/images/soludo17.png",
    title: "Cooperative Registration",
    description: "Register and manage cooperative societies",
  },
  {
    id: "4",
    icon: "ShowChart",
    image: "/images/soludo13.png",
    title: "Export Promotion",
    description: "Explore opportunities and investment support",
  },
  {
    id: "5",
    icon: "AccountBalanceWallet",
    image: "/images/soludo19.png",
    title: "Loan & Grants",
    description: "Access loans, grants and enterprise support",
  },
  {
    id: "6",
    icon: "Payment",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    title: "Make Payment",
    description: "Pay fees and remittances securely online",
  },
  {
    id: "7",
    icon: "TaskAlt",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
    title: "Verify Certificate",
    description: "Verify business and cooperative certificates",
  },
  {
    id: "8",
    icon: "Computer",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
    title: "E-Service Centre",
    description: "Complaints, enquiries and service requests",
  },
  {
    id: "9",
    icon: "ShoppingCart",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    title: "Procurement/Tenders",
    description: "View and participate in government tenders",
  },
  {
    id: "10",
    icon: "SupportAgent",
    image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=400&h=300&fit=crop",
    title: "MSME Development",
    description: "Resources and support for MSMEs",
  },
];

export const news: NewsItem[] = [
  {
    id: "1",
    image: "/images/soludo31.jpg",
    title: "Anambra State Signs MoU to Boost Industrial Growth and Investment",
    date: "May 10, 2025",
  },
  {
    id: "2",
    image: "/images/solud032.jpg",
    title: "Ministry Launches Digital Platform for Business Registration Services",
    date: "April 28, 2025",
  },
  {
    id: "3",
    image: "/images/soludo33.jpg",
    title: "Anambra to Host 2025 Investment and Trade Summit",
    date: "April 15, 2025",
  },
];

export const events: Event[] = [
  {
    id: "1",
    date: "22",
    day: "MON",
    month: "JAN",
    title: "Anambra Investment & Trade Summit 2025",
    venue: "International Convention Centre, Awka",
  },
  {
    id: "2",
    date: "10",
    day: "WED",
    month: "FEB",
    title: "MSME Capacity Building Workshop",
    venue: "Professor Kenneth Dike State Central Library, Awka",
  },
  {
    id: "3",
    date: "25",
    day: "THU",
    month: "FEB",
    title: "Export Readiness Training for Businesses",
    venue: "DMGS, Onitsha, Anambra State",
  },
];

export const partners: Partner[] = [
  { id: "1", name: "ANIDA", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG" },
  { id: "2", name: "NIPC", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG" },
  { id: "3", name: "Bank of Industry", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG" },
  { id: "4", name: "Mantrac", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG" },
  { id: "5", name: "Dangote", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG" },
  { id: "6", name: "BOI", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG" },
  { id: "7", name: "AFREXIM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG" },
  { id: "8", name: "NACCIMA", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG" },
];

export const footerLinks: FooterLink[] = [
  {
    id: "1",
    title: "Quick Links",
    links: [
      { name: "About Us", href: "#" },
      { name: "Our Services", href: "#" },
      { name: "Procurement & Tenders", href: "#" },
      { name: "Invest in Anambra", href: "#" },
      { name: "News & Events", href: "#" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
  {
    id: "2",
    title: "Important Links",
    links: [
      { name: "Anambra State Government", href: "#" },
      { name: "CAC Registration", href: "#" },
      { name: "NIPC", href: "#" },
      { name: "BOI", href: "#" },
      { name: "NERFUND", href: "#" },
      { name: "NEPC", href: "#" },
    ],
  },
];

// Contact Page Data
export const contactInformation: ContactInformation = {
  id: "1",
  phone: "+234 813 423 4567",
  altPhone: "+234 906 789 0123",
  email: "info@commerce.anambrastate.gov.ng",
  supportEmail: "support@commerce.anambrastate.gov.ng",
  officeHours: "Monday – Friday",
  officeHoursNote: "8:00 AM – 4:00 PM",
};

export const contactCards: ContactCard[] = [
  {
    id: "phone",
    icon: Phone,
    title: "Phone",
    description: [contactInformation.phone, contactInformation.altPhone],
    ctaText: "Call Us →",
    ctaHref: `tel:${contactInformation.phone}`,
  },
  {
    id: "email",
    icon: Email,
    title: "Email",
    description: [contactInformation.email, contactInformation.supportEmail],
    ctaText: "Send Email →",
    ctaHref: `mailto:${contactInformation.email}`,
  },
  {
    id: "office-hours",
    icon: AccessTime,
    title: "Office Hours",
    description: [
      contactInformation.officeHours,
      contactInformation.officeHoursNote,
      "Public Holidays Closed",
    ],
    ctaText: "View Schedule →",
  },
  {
    id: "live-support",
    icon: HeadsetMic,
    title: "Live Support",
    description: ["Live Chat Available", "Business hours"],
    ctaText: "Start Live Chat →",
  },
  {
    id: "general-enquiries",
    icon: ContactSupport,
    title: "General Enquiries",
    description: [
      "General information requests",
      "Business enquiries",
      "Partnership enquiries",
    ],
    ctaText: "Submit Enquiry →",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    image: "/images/soludon.png",
    name: "Prof. Charles Chukwuma Soludo",
    position: "Executive Governor of Anambra State",
  },
  {
    id: "2",
    image: "/images/soludohead.jpg",
    name: "Hon. Commissioner for Commerce",
    position: "Commissioner for Commerce, Anambra State",
  },
  {
    id: "3",
    image: "/images/soludo21.png",
    name: "Permanent Secretary",
    position: "Permanent Secretary, Ministry of Commerce",
  },
  {
    id: "4",
    image: "/images/soludo22.png",
    name: "Director of Finance",
    position: "Director of Finance, Ministry of Commerce",
  },
  {
    id: "5",
    image: "/images/soludo17.png",
    name: "Director of Trade & Investment",
    position: "Director of Trade & Investment",
  },
  {
    id: "6",
    image: "/images/soludo13.png",
    name: "Director of MSME Development",
    position: "Director of MSME Development",
  },
];

export const socialLinks: SocialLink[] = [
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    href: "#",
  },
  {
    id: "twitter",
    name: "Twitter/X",
    icon: Twitter,
    href: "#",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: LinkedIn,
    href: "#",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    href: "#",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: YouTube,
    href: "#",
  },
];
