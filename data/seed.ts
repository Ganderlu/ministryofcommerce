import { Statistic, Service, NewsItem, Event, Partner, FooterLink } from "@/types";

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
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    title: "Business Registration",
    description: "Register your business online in minutes",
  },
  {
    id: "2",
    icon: "Verified",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    title: "Permit & Licensing",
    description: "Apply for permits and renew your licenses",
  },
  {
    id: "3",
    icon: "People",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    title: "Cooperative Registration",
    description: "Register and manage cooperative societies",
  },
  {
    id: "4",
    icon: "ShowChart",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    title: "Investment Portal",
    description: "Explore opportunities and investment support",
  },
  {
    id: "5",
    icon: "AccountBalanceWallet",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=250&fit=crop",
    title: "Anambra State Signs MoU to Boost Industrial Growth and Investment",
    date: "May 10, 2025",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop",
    title: "Ministry Launches Digital Platform for Business Registration Services",
    date: "April 28, 2025",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop",
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
      { name: "Contact Us", href: "#" },
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
