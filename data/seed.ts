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
  GalleryItem,
  CooperativeBenefit,
  EligibilityRequirement,
  ProcessStep,
  RegistrationCategory,
  RequiredDocument,
  RegistrationGuideline,
  BusinessBenefit,
  BusinessEligibility,
  BusinessType as IBusinessType,
  BusinessCategory as IBusinessCategory,
  BusinessNature as IBusinessNature,
  BusinessStructure as IBusinessStructure,
  StateOption,
  KpiCard,
  TopService,
  RecentApplication,
  SystemAlert,
  QuickAction,
  FooterStat,
  BusinessCategoryItem,
  BusinessRow,
  BusinessStatus,
  CooperativeCategoryItem,
  CooperativeRow,
  SMEBenefit,
  SMEEligibility,
  SMEDocument,
  SMEProcessStep,
  NumberOfEmployees as INumberOfEmployees,
  AnnualTurnover as IAnnualTurnover,
  MSMEBenefit,
  MSMEEligibility,
  MSMEDocument,
  MSMEProcessStep,
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
    image: "/images/images1.jpg",
    title: "Business Registration",
    description: "Register your business online in minutes",
  },
  {
    id: "2",
    icon: "Verified",
    image: "/images/images2.jpg",
    title: "Permit & Licensing",
    description: "Apply for permits and renew your licenses",
  },
  {
    id: "3",
    icon: "People",
    image: "/images/images3.jpg",
    title: "Cooperative Registration",
    description: "Register and manage cooperative societies",
  },
  {
    id: "4",
    icon: "ShowChart",
    image: "/images/images4.webp",
    title: "Export Promotion",
    description: "Explore opportunities and investment support",
  },
  {
    id: "5",
    icon: "AccountBalanceWallet",
    image: "/images/images5.webp",
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
    image: "/images/mi3.jpg",
    name: "Hon. Nomso Chukwuma Ebonwu",
    position: "Commissioner for Commerce, Anambra State",
  },
  {
    id: "3",
    image: "/images/mi5.jpg",
    name: "Engr. Michael Obiekwe",
    position: "Permanent Secretary, Ministry of Commerce",
  },
  {
    id: "4",
    image: "/images/mi2.jpg",
    name: "Mrs Anagbakwu Chioma Uzoamaka",
    position: "Director of Account, Ministry of Commerce",
  },
  {
    id: "5",
    image: "/images/mi4.jpg",
    name: "Mrs. Odegbunam Chinyere B.",
    position: "Director of Cooperative Department",
  },
  {
    id: "6",
    image: "/images/d1.png",
    name: "Mrs. Eboh Nwosu J.N",
    position: "Director of Industry, Ministry of Commerce",
  },
  {
    id: "7",
    image: "/images/d3.jpg",
    name: "Mr IIoduba Ifeatu Francis JP",
    position: "Director of Market Department",
  },
  {
    id: "8",
    image: "/images/d2.png",
    name: "Henrietta Basil Ideh",
    position: "Ag. D. Commerce",
  },
  {
    id: "9",
    image: "/images/d5.png",
    name: "Nweze Nkiru Mercy",
    position: "Ag. D. (PRS) Ministry of Commerce",
  },
  {
    id: "10",
    image: "/images/d4.jpg",
    name: "Mrs Nwakpudolu Juliet Ifeoma",
    position: "Director SMES Department, Ministry of Commerce",
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

export const gallery: GalleryItem[] = [
  {
    id: "1",
    image: "/images/soludo11.png",
    title: "Anambra Investment Summit",
  },
  {
    id: "2",
    image: "/images/soludo12.png",
    title: "MSME Training Workshop",
  },
  {
    id: "3",
    image: "/images/soludo13.png",
    title: "Business Registration Launch",
  },
  {
    id: "4",
    image: "/images/soludo14.png",
    title: "Governor's Office Visit",
  },
  {
    id: "5",
    image: "/images/soludo15.png",
    title: "Trade Fair Opening",
  },
  {
    id: "6",
    image: "/images/soludo16.png",
    title: "Cooperative Society Meeting",
  },
  {
    id: "7",
    image: "/images/soludo17.png",
    title: "Export Promotion Seminar",
  },
  {
    id: "8",
    image: "/images/soludo18.png",
    title: "Industry Stakeholders Meeting",
  },
  {
    id: "9",
    image: "/images/soludo19.png",
    title: "Youth Empowerment Program",
  },
];

export const cooperativeBenefits: CooperativeBenefit[] = [
  {
    id: "1",
    icon: "Gavel",
    title: "Legal Recognition",
    description: "Gain legal status and operate as a registered cooperative society in Anambra State.",
  },
  {
    id: "2",
    icon: "AccountBalanceWallet",
    title: "Access to Funding",
    description: "Qualify for government grants, soft loans, and financial support programs.",
  },
  {
    id: "3",
    icon: "School",
    title: "Capacity Building",
    description: "Access training, workshops, and business development programs.",
  },
  {
    id: "4",
    icon: "Storefront",
    title: "Market Opportunities",
    description: "Get connected to markets, exhibitions, and business networking events.",
  },
  {
    id: "5",
    icon: "ReceiptLong",
    title: "Tax Advantages",
    description: "Enjoy tax incentives and other financial benefits available to cooperatives.",
  },
  {
    id: "6",
    icon: "Balance",
    title: "Conflict Resolution",
    description: "Access dispute resolution mechanisms and legal support.",
  },
  {
    id: "7",
    icon: "SupportAgent",
    title: "Business Support",
    description: "Receive continuous support from the Ministry for growth and sustainability.",
  },
  {
    id: "8",
    icon: "Verified",
    title: "Credibility & Trust",
    description: "Build trust with partners, investors, and the community.",
  },
];

export const eligibilityRequirements: EligibilityRequirement[] = [
  {
    id: "1",
    text: "Minimum of 10 members with common economic interests",
  },
  {
    id: "2",
    text: "Democratic control and voluntary membership",
  },
  {
    id: "3",
    text: "Registered office address within Anambra State",
  },
  {
    id: "4",
    text: "Aims and objectives must be for the benefit of members",
  },
  {
    id: "5",
    text: "Compliance with the Cooperative Societies Law of Anambra State",
  },
];

export const registrationProcessSteps: ProcessStep[] = [
  {
    id: "1",
    step: 1,
    title: "Create Account",
    description: "Sign up or log in to your account on the portal.",
  },
  {
    id: "2",
    step: 2,
    title: "Fill Application",
    description: "Complete the cooperative registration form with accurate details.",
  },
  {
    id: "3",
    step: 3,
    title: "Upload Documents",
    description: "Upload all required documents in the specified format.",
  },
  {
    id: "4",
    step: 4,
    title: "Review & Submit",
    description: "Review your application and submit for processing.",
  },
  {
    id: "5",
    step: 5,
    title: "Approval",
    description: "Receive approval and your cooperative certificate.",
  },
];

export const cooperativeTypes: RegistrationCategory[] = [
  { id: "1", name: "Agricultural Cooperative" },
  { id: "2", name: "Thrift & Credit Cooperative" },
  { id: "3", name: "Consumer Cooperative" },
  { id: "4", name: "Producer Cooperative" },
  { id: "5", name: "Marketing Cooperative" },
  { id: "6", name: "Housing Cooperative" },
  { id: "7", name: "Worker Cooperative" },
  { id: "8", name: "Multi-Purpose Cooperative" },
];

export const registrationCategories: RegistrationCategory[] = [
  { id: "1", name: "New Registration" },
  { id: "2", name: "Re-Registration" },
  { id: "3", name: "Amalgamation" },
];

export const lgas: RegistrationCategory[] = [
  { id: "1", name: "Awka South" },
  { id: "2", name: "Awka North" },
  { id: "3", name: "Onitsha South" },
  { id: "4", name: "Onitsha North" },
  { id: "5", name: "Nnewi South" },
  { id: "6", name: "Nnewi North" },
  { id: "7", name: "Oyi" },
  { id: "8", name: "Dunukofia" },
  { id: "9", name: "Anaocha" },
  { id: "10", name: "Njikoka" },
  { id: "11", name: "Idemili South" },
  { id: "12", name: "Idemili North" },
  { id: "13", name: "Orumba South" },
  { id: "14", name: "Orumba North" },
  { id: "15", name: "Ayamelum" },
  { id: "16", name: "Ohaozara" },
  { id: "17", name: "Ihiala" },
  { id: "18", name: "Ekwusigo" },
  { id: "19", name: "Ogbaru" },
  { id: "20", name: "Anambra East" },
  { id: "21", name: "Anambra West" },
];

export const operationalAreas: RegistrationCategory[] = [
  { id: "1", name: "Community Level" },
  { id: "2", name: "Local Government Level" },
  { id: "3", name: "State Level" },
  { id: "4", name: "Multi-State Level" },
  { id: "5", name: "National Level" },
];

export const yearsOfEstablishment: RegistrationCategory[] = Array.from(
  { length: 50 },
  (_, i) => ({
    id: String(i + 1),
    name: String(new Date().getFullYear() - i),
  })
);

export const requiredDocuments: RequiredDocument[] = [
  { id: "1", name: "Constitution & Bye-Laws" },
  { id: "2", name: "Minutes of Inaugural Meeting" },
  { id: "3", name: "List of Executive Members" },
  { id: "4", name: "Means of Identification" },
  { id: "5", name: "Proof of Address" },
  { id: "6", name: "Passport Photograph" },
];

export interface RequiredCooperativeDocument {
  id: string;
  label: string;
  description: string;
  required: boolean;
  acceptedFormats: string[];
  maxSizeMB: number;
  category: "Legal" | "Governance" | "Identity" | "Financial";
  placeholderExample: string;
}

export const cooperativeUploadDocuments: RequiredCooperativeDocument[] = [
  {
    id: "constitution",
    label: "Constitution & Bye-Laws",
    description:
      "Signed and adopted constitution and bye-laws of the cooperative society.",
    required: true,
    acceptedFormats: [".pdf", ".doc", ".docx"],
    maxSizeMB: 10,
    category: "Legal",
    placeholderExample: "e.g. AnambraFarmersCoop_Constitution.pdf",
  },
  {
    id: "inaugural_minutes",
    label: "Minutes of Inaugural Meeting",
    description:
      "Minutes of the first/inaugural general meeting, signed by Chairman and Secretary.",
    required: true,
    acceptedFormats: [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"],
    maxSizeMB: 10,
    category: "Governance",
    placeholderExample: "e.g. Inaugural_Minutes_2025.pdf",
  },
  {
    id: "executive_list",
    label: "List of Executive Members",
    description:
      "List showing executive positions, full names, phone numbers and signatures.",
    required: true,
    acceptedFormats: [".pdf", ".doc", ".docx", ".xlsx", ".xls"],
    maxSizeMB: 5,
    category: "Governance",
    placeholderExample: "e.g. Executive_Members_List.pdf",
  },
  {
    id: "chairman_id",
    label: "Chairman's Means of Identification",
    description:
      "Valid Government ID: NIN slip, PVC, Driver's License or International Passport.",
    required: true,
    acceptedFormats: [".pdf", ".jpg", ".jpeg", ".png"],
    maxSizeMB: 5,
    category: "Identity",
    placeholderExample: "e.g. Chairman_NIN_Front.jpg",
  },
  {
    id: "secretary_id",
    label: "Secretary's Means of Identification",
    description:
      "Valid Government ID of the Secretary (same accepted documents as Chairman).",
    required: true,
    acceptedFormats: [".pdf", ".jpg", ".jpeg", ".png"],
    maxSizeMB: 5,
    category: "Identity",
    placeholderExample: "e.g. Secretary_PVC.pdf",
  },
  {
    id: "proof_of_address",
    label: "Proof of Office Address",
    description:
      "Utility bill, tenancy agreement or any recent (≤3 months) proof of address document.",
    required: true,
    acceptedFormats: [".pdf", ".jpg", ".jpeg", ".png"],
    maxSizeMB: 8,
    category: "Legal",
    placeholderExample: "e.g. ElectricityBill_June2025.pdf",
  },
  {
    id: "passport_photos",
    label: "Executive Passport Photographs",
    description:
      "Colored passport photographs (at least Chairman, Secretary, Treasurer) — bundled PDF or multi-JPG ZIP.",
    required: true,
    acceptedFormats: [".pdf", ".jpg", ".jpeg", ".png", ".zip"],
    maxSizeMB: 15,
    category: "Identity",
    placeholderExample: "e.g. Executive_Passports.zip",
  },
  {
    id: "financial_records",
    label: "Financial Records / Share Register",
    description:
      "Opening statement of accounts or a share register showing members' contributions.",
    required: false,
    acceptedFormats: [".pdf", ".xlsx", ".xls", ".csv"],
    maxSizeMB: 10,
    category: "Financial",
    placeholderExample: "e.g. ShareRegister_Q2.xlsx",
  },
];

export const registrationGuidelines: RegistrationGuideline[] = [
  {
    id: "1",
    icon: "Verified",
    text: "Ensure all information provided is accurate and up to date.",
  },
  {
    id: "2",
    icon: "Star",
    text: "All fields marked with * are required.",
  },
  {
    id: "3",
    icon: "UploadFile",
    text: "You will be able to upload documents in the next step.",
  },
  {
    id: "4",
    icon: "FactCheck",
    text: "Review your information carefully before final submission.",
  },
];

export const businessBenefits: BusinessBenefit[] = [
  {
    id: "1",
    icon: "Gavel",
    title: "Legal Recognition",
    description: "Gain legal status and operate lawfully within Anambra State and across Nigeria.",
  },
  {
    id: "2",
    icon: "EmojiEvents",
    title: "Access to Opportunities",
    description: "Qualify for government contracts, grants, loans and incentive support programs.",
  },
  {
    id: "3",
    icon: "WorkspacePremium",
    title: "Business Credibility",
    description: "Build trust and credibility with customers, partners, investors and financial institutions.",
  },
  {
    id: "4",
    icon: "Security",
    title: "Protection & Security",
    description: "Enjoy legal protection for your business name, brand and intellectual property.",
  },
  {
    id: "5",
    icon: "Public",
    title: "Market Expansion",
    description: "Easily expand your business locally and internationally with official recognition.",
  },
  {
    id: "6",
    icon: "School",
    title: "Access to Training",
    description: "Get access to business development training, mentorship and capacity building programs.",
  },
  {
    id: "7",
    icon: "ReceiptLong",
    title: "Tax Compliance",
    description: "Operate transparently and benefit from tax incentives and reliefs.",
  },
  {
    id: "8",
    icon: "Gavel",
    title: "Dispute Resolution",
    description: "Access government support in resolving business disputes and conflicts.",
  },
];

export const businessEligibility: BusinessEligibility[] = [
  {
    id: "1",
    text: "Business must be legally permitted to operate in Nigeria.",
  },
  {
    id: "2",
    text: "Valid means of identification of owner(s)/director(s).",
  },
  {
    id: "3",
    text: "Business name must not be misleading or identical to existing businesses.",
  },
  {
    id: "4",
    text: "Physical business address within Anambra State.",
  },
  {
    id: "5",
    text: "Tax Identification Number (TIN) (where applicable).",
  },
];

export const businessTypes: IBusinessType[] = [
  { id: "1", name: "Sole Proprietorship" },
  { id: "2", name: "Partnership" },
  { id: "3", name: "Private Limited Liability Company (Ltd)" },
  { id: "4", name: "Public Limited Company (PLC)" },
  { id: "5", name: "Limited Liability Partnership (LLP)" },
  { id: "6", name: "Company Limited by Guarantee" },
  { id: "7", name: "Non-Governmental Organization (NGO)" },
  { id: "8", name: "Social Enterprise" },
];

export const businessCategories: IBusinessCategory[] = [
  { id: "1", name: "Micro Enterprise (1-9 employees)" },
  { id: "2", name: "Small Enterprise (10-49 employees)" },
  { id: "3", name: "Medium Enterprise (50-199 employees)" },
  { id: "4", name: "Large Enterprise (200+ employees)" },
  { id: "5", name: "Startup" },
  { id: "6", name: "Family Business" },
];

export const businessNatures: IBusinessNature[] = [
  { id: "1", name: "Trading / Commerce" },
  { id: "2", name: "Manufacturing / Production" },
  { id: "3", name: "Services" },
  { id: "4", name: "Agriculture / Agro-Allied" },
  { id: "5", name: "Construction / Real Estate" },
  { id: "6", name: "Hospitality / Tourism" },
  { id: "7", name: "Information Technology" },
  { id: "8", name: "Healthcare" },
  { id: "9", name: "Education" },
  { id: "10", name: "Finance / FinTech" },
  { id: "11", name: "Transportation / Logistics" },
  { id: "12", name: "Creative / Entertainment" },
  { id: "13", name: "Other" },
];

export const businessStructures: IBusinessStructure[] = [
  { id: "1", name: "B2B (Business to Business)" },
  { id: "2", name: "B2C (Business to Consumer)" },
  { id: "3", name: "B2G (Business to Government)" },
  { id: "4", name: "C2C (Consumer to Consumer)" },
  { id: "5", name: "D2C (Direct to Consumer)" },
  { id: "6", name: "Hybrid / Mixed" },
];

export const nigerianStates: StateOption[] = [
  { id: "1", name: "Anambra State" },
  { id: "2", name: "Abia State" },
  { id: "3", name: "Adamawa State" },
  { id: "4", name: "Akwa Ibom State" },
  { id: "5", name: "Bauchi State" },
  { id: "6", name: "Bayelsa State" },
  { id: "7", name: "Benue State" },
  { id: "8", name: "Borno State" },
  { id: "9", name: "Cross River State" },
  { id: "10", name: "Delta State" },
  { id: "11", name: "Ebonyi State" },
  { id: "12", name: "Edo State" },
  { id: "13", name: "Ekiti State" },
  { id: "14", name: "Enugu State" },
  { id: "15", name: "FCT - Abuja" },
  { id: "16", name: "Gombe State" },
  { id: "17", name: "Imo State" },
  { id: "18", name: "Jigawa State" },
  { id: "19", name: "Kaduna State" },
  { id: "20", name: "Kano State" },
  { id: "21", name: "Katsina State" },
  { id: "22", name: "Kebbi State" },
  { id: "23", name: "Kogi State" },
  { id: "24", name: "Kwara State" },
  { id: "25", name: "Lagos State" },
  { id: "26", name: "Nasarawa State" },
  { id: "27", name: "Niger State" },
  { id: "28", name: "Ogun State" },
  { id: "29", name: "Ondo State" },
  { id: "30", name: "Osun State" },
  { id: "31", name: "Oyo State" },
  { id: "32", name: "Plateau State" },
  { id: "33", name: "Rivers State" },
  { id: "34", name: "Sokoto State" },
  { id: "35", name: "Taraba State" },
  { id: "36", name: "Yobe State" },
  { id: "37", name: "Zamfara State" },
];

export const businessRequiredDocs: RequiredDocument[] = [
  { id: "1", name: "CAC Certificate (if registered)" },
  { id: "2", name: "Means of Identification" },
  { id: "3", name: "Proof of Address" },
  { id: "4", name: "Tax Identification Number (TIN)" },
  { id: "5", name: "Business Plan (Optional)" },
  { id: "6", name: "Passport Photograph" },
];

export const businessRegistrationGuidelines: RegistrationGuideline[] = [
  {
    id: "1",
    icon: "Verified",
    text: "Ensure all information provided is accurate and up to date.",
  },
  {
    id: "2",
    icon: "Star",
    text: "All fields marked with * are required.",
  },
  {
    id: "3",
    icon: "UploadFile",
    text: "You will be able to upload documents in the next step.",
  },
  {
    id: "4",
    icon: "FactCheck",
    text: "Review your information carefully before final submission.",
  },
];

export const kpiCards: KpiCard[] = [
  {
    id: "1",
    title: "Total Applications",
    value: "2,847",
    change: 12.5,
    changeDirection: "up",
    icon: "Description",
    color: "#0B6B3A",
  },
  {
    id: "2",
    title: "Business Registrations",
    value: "1,523",
    change: 15.3,
    changeDirection: "up",
    icon: "Business",
    color: "#2563EB",
  },
  {
    id: "3",
    title: "Cooperative Registrations",
    value: "654",
    change: 8.7,
    changeDirection: "up",
    icon: "Diversity3",
    color: "#7C3AED",
  },
  {
    id: "4",
    title: "Total Revenue",
    value: "₦24.8M",
    change: 18.2,
    changeDirection: "up",
    icon: "Payments",
    color: "#D4AF37",
  },
  {
    id: "5",
    title: "Active Users",
    value: "892",
    change: 10.1,
    changeDirection: "up",
    icon: "SupervisorAccount",
    color: "#16A34A",
  },
];

export const topServices: TopService[] = [
  {
    id: "1",
    serviceName: "Business Registration",
    applications: 1523,
    growth: 15.3,
    icon: "Business",
    color: "#0B6B3A",
  },
  {
    id: "2",
    serviceName: "Cooperative Registration",
    applications: 654,
    growth: 8.7,
    icon: "Diversity3",
    color: "#7C3AED",
  },
  {
    id: "3",
    serviceName: "Permit & Licensing",
    applications: 432,
    growth: 12.1,
    icon: "VerifiedUser",
    color: "#2563EB",
  },
  {
    id: "4",
    serviceName: "Trader's License",
    applications: 238,
    growth: 5.4,
    icon: "Storefront",
    color: "#DC2626",
  },
];

export const recentApplications: RecentApplication[] = [
  {
    id: "1",
    applicantName: "Tech Solutions Ltd",
    applicationType: "Business Registration",
    submissionTime: "2 mins ago",
    status: "Pending",
    icon: "Business",
    color: "#0B6B3A",
  },
  {
    id: "2",
    applicantName: "Green Farmers Coop",
    applicationType: "Cooperative Registration",
    submissionTime: "15 mins ago",
    status: "Under Review",
    icon: "Diversity3",
    color: "#7C3AED",
  },
  {
    id: "3",
    applicantName: "Fashion Hub NG",
    applicationType: "Business Registration",
    submissionTime: "1 hour ago",
    status: "Approved",
    icon: "Business",
    color: "#16A34A",
  },
  {
    id: "4",
    applicantName: "Unity Women Coop",
    applicationType: "Cooperative Registration",
    submissionTime: "2 hours ago",
    status: "Pending",
    icon: "Diversity3",
    color: "#F59E0B",
  },
  {
    id: "5",
    applicantName: "BuildRight Construction",
    applicationType: "Business Registration",
    submissionTime: "3 hours ago",
    status: "Rejected",
    icon: "Business",
    color: "#DC2626",
  },
];

export const systemAlerts: SystemAlert[] = [
  {
    id: "1",
    title: "High number of pending applications",
    description: "Requires attention",
    type: "warning",
    time: "30 mins ago",
    badge: 24,
  },
  {
    id: "2",
    title: "System backup completed successfully",
    description: "2 hours ago",
    type: "success",
    time: "2 hours ago",
  },
  {
    id: "3",
    title: "Security scan completed",
    description: "No threats detected",
    type: "success",
    time: "4 hours ago",
  },
];

export const quickActions: QuickAction[] = [
  { id: "1", label: "Add New User", icon: "PersonAdd" },
  { id: "2", label: "Review Applications", icon: "RateReview", badge: 24 },
  { id: "3", label: "Register Business", icon: "Business" },
  { id: "4", label: "Register Cooperative", icon: "Diversity3" },
  { id: "5", label: "Send Notification", icon: "Campaign" },
  { id: "6", label: "Generate Report", icon: "Analytics" },
];

export const footerStats: FooterStat[] = [
  {
    id: "1",
    label: "Total Users",
    value: "1,245",
    icon: "Group",
    color: "#2563EB",
  },
  {
    id: "2",
    label: "System Roles",
    value: "15",
    icon: "VerifiedUser",
    color: "#0B6B3A",
  },
  {
    id: "3",
    label: "Storage Used",
    value: "3.2GB",
    icon: "Storage",
    color: "#7C3AED",
  },
  {
    id: "4",
    label: "System Uptime",
    value: "99.9%",
    icon: "Schedule",
    color: "#084C2E",
  },
];

export const applicationsByMonth = [
  { date: "May 1", thisMonth: 80, lastMonth: 60 },
  { date: "May 3", thisMonth: 110, lastMonth: 75 },
  { date: "May 6", thisMonth: 170, lastMonth: 100 },
  { date: "May 8", thisMonth: 210, lastMonth: 140 },
  { date: "May 11", thisMonth: 280, lastMonth: 180 },
  { date: "May 13", thisMonth: 350, lastMonth: 200 },
  { date: "May 16", thisMonth: 440, lastMonth: 230 },
  { date: "May 18", thisMonth: 520, lastMonth: 260 },
  { date: "May 21", thisMonth: 650, lastMonth: 310 },
  { date: "May 23", thisMonth: 780, lastMonth: 360 },
  { date: "May 24", thisMonth: 900, lastMonth: 400 },
];

export const applicationsByStatus = [
  { label: "Pending", value: 1245, color: "#FBBF24" },
  { label: "Under Review", value: 892, color: "#3B82F6" },
  { label: "Approved", value: 542, color: "#16A34A" },
  { label: "Rejected", value: 168, color: "#EF4444" },
];

export const revenueAnalytics = [
  { month: "Jan", revenue: 6.2 },
  { month: "Feb", revenue: 10.8 },
  { month: "Mar", revenue: 13.5 },
  { month: "Apr", revenue: 18.1 },
  { month: "May", revenue: 22.5 },
  { month: "Jun", revenue: 24.8 },
];

/* ============ Admin: Business Management ============ */

export const businessAdminCategories: BusinessCategoryItem[] = [
  { id: "ict", name: "ICT Services", icon: "Computer", color: "#3B82F6" },
  { id: "agriculture", name: "Agriculture", icon: "Agriculture", color: "#16A34A" },
  { id: "construction", name: "Construction", icon: "Construction", color: "#8B5CF6" },
  { id: "retail", name: "Retail", icon: "Storefront", color: "#F59E0B" },
  { id: "cooperative", name: "Cooperative", icon: "Diversity3", color: "#EF4444" },
  { id: "food", name: "Food & Beverage", icon: "Fastfood", color: "#14B8A6" },
  { id: "transport", name: "Transport", icon: "DirectionsCar", color: "#EF4444" },
  { id: "logistics", name: "Logistics", icon: "LocalShipping", color: "#78716C" },
];

export const businessStatusOptions: { id: string; name: string }[] = [
  { id: "Approved", name: "Approved" },
  { id: "Under Review", name: "Under Review" },
  { id: "Pending", name: "Pending" },
  { id: "Rejected", name: "Rejected" },
  { id: "Suspended", name: "Suspended" },
];

export const businessRows: BusinessRow[] = [
  {
    id: "ans-bus-2025-0001",
    businessName: "Tech Solutions Ltd",
    applicationNumber: "ANS-BUS-2025-0001",
    ownerName: "Chinedu Okafor",
    ownerEmail: "chinedu@techsolutions.com",
    ownerPhone: "0803 123 4567",
    categoryId: "ict",
    categoryName: "ICT Services",
    lga: "Awka North",
    status: "Approved",
    registeredOnDate: "May 24, 2025",
    registeredOnTime: "10:30 AM",
    logoColor: "#3B82F6",
  },
  {
    id: "ans-bus-2025-0002",
    businessName: "Green Farmers Coop",
    applicationNumber: "ANS-BUS-2025-0002",
    ownerName: "Amaka Nwosu",
    ownerEmail: "amaka@greenfarmers.com",
    ownerPhone: "0805 887 6543",
    categoryId: "agriculture",
    categoryName: "Agriculture",
    lga: "Njikoka",
    status: "Under Review",
    registeredOnDate: "May 24, 2025",
    registeredOnTime: "9:15 AM",
    logoColor: "#16A34A",
  },
  {
    id: "ans-bus-2025-0003",
    businessName: "BuildRight Construction",
    applicationNumber: "ANS-BUS-2025-0003",
    ownerName: "Emeka Obi",
    ownerEmail: "emeka@buildright.com",
    ownerPhone: "0806 234 5678",
    categoryId: "construction",
    categoryName: "Construction",
    lga: "Dunukofia",
    status: "Approved",
    registeredOnDate: "May 23, 2025",
    registeredOnTime: "4:45 PM",
    logoColor: "#8B5CF6",
  },
  {
    id: "ans-bus-2025-0004",
    businessName: "Fashion Hub NG",
    applicationNumber: "ANS-BUS-2025-0004",
    ownerName: "Adaobi Eze",
    ownerEmail: "adaobi@fashionhub.ng",
    ownerPhone: "0802 345 6789",
    categoryId: "retail",
    categoryName: "Retail",
    lga: "Awka South",
    status: "Pending",
    registeredOnDate: "May 23, 2025",
    registeredOnTime: "2:30 PM",
    logoColor: "#F59E0B",
  },
  {
    id: "ans-bus-2025-0005",
    businessName: "Unity Women Coop",
    applicationNumber: "ANS-BUS-2025-0005",
    ownerName: "Ngozi Umeh",
    ownerEmail: "ngozi@unitycoop.com",
    ownerPhone: "0809 876 5432",
    categoryId: "cooperative",
    categoryName: "Cooperative",
    lga: "Orumba North",
    status: "Approved",
    registeredOnDate: "May 22, 2025",
    registeredOnTime: "11:20 AM",
    logoColor: "#EF4444",
  },
  {
    id: "ans-bus-2025-0006",
    businessName: "Royal Foods Ltd",
    applicationNumber: "ANS-BUS-2025-0006",
    ownerName: "Ikechukwu Mba",
    ownerEmail: "ike@royalfoods.com",
    ownerPhone: "0807 654 3210",
    categoryId: "food",
    categoryName: "Food & Beverage",
    lga: "Idemili North",
    status: "Under Review",
    registeredOnDate: "May 22, 2025",
    registeredOnTime: "9:05 AM",
    logoColor: "#14B8A6",
  },
  {
    id: "ans-bus-2025-0007",
    businessName: "Sunrise Transport",
    applicationNumber: "ANS-BUS-2025-0007",
    ownerName: "Chuka Nnadi",
    ownerEmail: "chuks@sunrisetransport.com",
    ownerPhone: "0801 234 5678",
    categoryId: "transport",
    categoryName: "Transport",
    lga: "Anaocha",
    status: "Approved",
    registeredOnDate: "May 21, 2025",
    registeredOnTime: "3:10 PM",
    logoColor: "#EF4444",
  },
  {
    id: "ans-bus-2025-0008",
    businessName: "Prime Logistics",
    applicationNumber: "ANS-BUS-2025-0008",
    ownerName: "Obinna Anyanwu",
    ownerEmail: "obinna@primelogistics.com",
    ownerPhone: "0805 765 4321",
    categoryId: "logistics",
    categoryName: "Logistics",
    lga: "Awka North",
    status: "Rejected",
    registeredOnDate: "May 21, 2025",
    registeredOnTime: "1:40 PM",
    logoColor: "#78716C",
  },
  {
    id: "ans-bus-2025-0009",
    businessName: "Nnewi Auto Parts",
    applicationNumber: "ANS-BUS-2025-0009",
    ownerName: "Ifeanyi Okafor",
    ownerEmail: "ifeanyi@nnewiauto.com",
    ownerPhone: "0806 111 2233",
    categoryId: "retail",
    categoryName: "Retail",
    lga: "Nnewi North",
    status: "Approved",
    registeredOnDate: "May 20, 2025",
    registeredOnTime: "10:00 AM",
    logoColor: "#F59E0B",
  },
  {
    id: "ans-bus-2025-0010",
    businessName: "Onitsha Market Traders",
    applicationNumber: "ANS-BUS-2025-0010",
    ownerName: "Chidi Okeke",
    ownerEmail: "chidi@onitshatraders.ng",
    ownerPhone: "0802 999 8877",
    categoryId: "cooperative",
    categoryName: "Cooperative",
    lga: "Onitsha South",
    status: "Pending",
    registeredOnDate: "May 20, 2025",
    registeredOnTime: "8:30 AM",
    logoColor: "#EF4444",
  },
];

export const TOTAL_BUSINESSES = 1532;

export const cooperativeAdminCategories: CooperativeCategoryItem[] = [
  { id: "agriculture", name: "Agriculture", icon: "Agriculture", color: "#16A34A" },
  { id: "business", name: "Business", icon: "Business", color: "#3B82F6" },
  { id: "cooperative", name: "Cooperative", icon: "Cooperative", color: "#EF4444" },
  { id: "youth", name: "Youth", icon: "Youth", color: "#A855F7" },
  { id: "trade", name: "Trade", icon: "Trade", color: "#F59E0B" },
  { id: "multipurpose", name: "Multipurpose", icon: "Multipurpose", color: "#14B8A6" },
  { id: "transport", name: "Transport", icon: "Transport", color: "#F97316" },
  { id: "artisan", name: "Artisan", icon: "Artisan", color: "#6366F1" },
];

export const cooperativeStatusOptions: { id: string; name: string }[] = [
  { id: "Approved", name: "Approved" },
  { id: "Under Review", name: "Under Review" },
  { id: "Pending", name: "Pending" },
  { id: "Rejected", name: "Rejected" },
];

export const cooperativeRows: CooperativeRow[] = [
  {
    id: "ans-coop-2025-0001",
    cooperativeName: "Awka Farmers Cooperative",
    registrationNumber: "ANS-COOP-2025-0001",
    chairmanName: "Ngozi Umeh",
    chairmanEmail: "ngozi@awkafarmers.ng",
    chairmanPhone: "0803 123 4567",
    categoryId: "agriculture",
    categoryName: "Agriculture",
    lga: "Awka North",
    status: "Approved",
    registeredOnDate: "May 24, 2025",
    registeredOnTime: "10:30 AM",
    logoColor: "#16A34A",
  },
  {
    id: "ans-coop-2025-0002",
    cooperativeName: "Nnewi Entrepreneurs Coop",
    registrationNumber: "ANS-COOP-2025-0002",
    chairmanName: "Chinedu Okafor",
    chairmanEmail: "chinedu@nnewientrepreneurs.ng",
    chairmanPhone: "0806 987 6543",
    categoryId: "business",
    categoryName: "Business",
    lga: "Nnewi North",
    status: "Under Review",
    registeredOnDate: "May 24, 2025",
    registeredOnTime: "9:15 AM",
    logoColor: "#3B82F6",
  },
  {
    id: "ans-coop-2025-0003",
    cooperativeName: "Ogbaru Women Cooperative",
    registrationNumber: "ANS-COOP-2025-0003",
    chairmanName: "Amaka Nwosu",
    chairmanEmail: "amaka@ogbaruwomen.ng",
    chairmanPhone: "0805 567 4321",
    categoryId: "cooperative",
    categoryName: "Cooperative",
    lga: "Ogbaru",
    status: "Pending",
    registeredOnDate: "May 23, 2025",
    registeredOnTime: "4:45 PM",
    logoColor: "#EF4444",
  },
  {
    id: "ans-coop-2025-0004",
    cooperativeName: "Ekwusigo Youth Coop",
    registrationNumber: "ANS-COOP-2025-0004",
    chairmanName: "Emeka Obi",
    chairmanEmail: "emeka@ekwusigoyouth.ng",
    chairmanPhone: "0802 345 6789",
    categoryId: "youth",
    categoryName: "Youth",
    lga: "Ekwusigo",
    status: "Approved",
    registeredOnDate: "May 23, 2025",
    registeredOnTime: "2:30 PM",
    logoColor: "#A855F7",
  },
  {
    id: "ans-coop-2025-0005",
    cooperativeName: "Idemili Traders Cooperative",
    registrationNumber: "ANS-COOP-2025-0005",
    chairmanName: "Ifeanyi Eze",
    chairmanEmail: "ifeanyi@idemilitraders.ng",
    chairmanPhone: "0807 890 1234",
    categoryId: "trade",
    categoryName: "Trade",
    lga: "Idemili North",
    status: "Rejected",
    registeredOnDate: "May 22, 2025",
    registeredOnTime: "11:20 AM",
    logoColor: "#F59E0B",
  },
  {
    id: "ans-coop-2025-0006",
    cooperativeName: "Orumba Agric Cooperative",
    registrationNumber: "ANS-COOP-2025-0006",
    chairmanName: "Chuka Nnadi",
    chairmanEmail: "chuka@orumbaagric.ng",
    chairmanPhone: "0801 234 5678",
    categoryId: "agriculture",
    categoryName: "Agriculture",
    lga: "Orumba North",
    status: "Approved",
    registeredOnDate: "May 22, 2025",
    registeredOnTime: "9:05 AM",
    logoColor: "#16A34A",
  },
  {
    id: "ans-coop-2025-0007",
    cooperativeName: "Aguleri Multipurpose Coop",
    registrationNumber: "ANS-COOP-2025-0007",
    chairmanName: "Obinna Anyanwu",
    chairmanEmail: "obinna@agulericoop.ng",
    chairmanPhone: "0808 765 4321",
    categoryId: "multipurpose",
    categoryName: "Multipurpose",
    lga: "Aguleri",
    status: "Under Review",
    registeredOnDate: "May 21, 2025",
    registeredOnTime: "3:10 PM",
    logoColor: "#14B8A6",
  },
  {
    id: "ans-coop-2025-0008",
    cooperativeName: "Ansecha Women Coop",
    registrationNumber: "ANS-COOP-2025-0008",
    chairmanName: "Nonye Okeke",
    chairmanEmail: "nonye@anasechawomen.ng",
    chairmanPhone: "0803 456 7890",
    categoryId: "cooperative",
    categoryName: "Cooperative",
    lga: "Ansecha",
    status: "Pending",
    registeredOnDate: "May 21, 2025",
    registeredOnTime: "1:40 PM",
    logoColor: "#EF4444",
  },
];

export const TOTAL_COOPERATIVES = 654;

/* ============ SME Registration Data ============ */

export const smeBenefits: SMEBenefit[] = [
  {
    id: "1",
    icon: "Gavel",
    title: "Legal Recognition",
    description: "Gain official recognition and credibility for businesses operating in Anambra State.",
  },
  {
    id: "2",
    icon: "EmojiEvents",
    title: "Access to Opportunities",
    description: "Government tenders, contracts, grants and business support programmes.",
  },
  {
    id: "3",
    icon: "AccountBalanceWallet",
    title: "Financial Support",
    description: "Access to loans, grants and funding opportunities for SMEs.",
  },
  {
    id: "4",
    icon: "School",
    title: "Capacity Building",
    description: "Training, workshops, mentorship and entrepreneurship programmes.",
  },
  {
    id: "5",
    icon: "Public",
    title: "Market Visibility",
    description: "Improve visibility and access to new markets and business networks.",
  },
  {
    id: "6",
    icon: "SupportAgent",
    title: "Business Advisory",
    description: "Access professional business development guidance and consultancy.",
  },
  {
    id: "7",
    icon: "People",
    title: "Networking",
    description: "Connect with other SMEs, investors and industry stakeholders.",
  },
  {
    id: "8",
    icon: "Policy",
    title: "Policy Support",
    description: "Access government policies and initiatives supporting SME growth.",
  },
];

export const smeEligibility: SMEEligibility[] = [
  {
    id: "1",
    text: "Business is registered or operating in Anambra State.",
  },
  {
    id: "2",
    text: "Business qualifies as a Small or Medium Enterprise.",
  },
  {
    id: "3",
    text: "Business has a valid means of identification.",
  },
  {
    id: "4",
    text: "Applicant provides accurate and verifiable information.",
  },
  {
    id: "5",
    text: "Applicant agrees to comply with Ministry requirements.",
  },
];

export const smeDocuments: SMEDocument[] = [
  {
    id: "1",
    icon: "Description",
    name: "CAC Certificate",
    note: "If registered.",
  },
  {
    id: "2",
    icon: "Badge",
    name: "Means of Identification",
    note: "National ID, Voter's Card or Driver's Licence.",
  },
  {
    id: "3",
    icon: "Home",
    name: "Proof of Address",
    note: "Utility Bill or Tenancy Agreement.",
  },
  {
    id: "4",
    icon: "Article",
    name: "Business Profile",
    note: "Brief description of the business.",
  },
  {
    id: "5",
    icon: "PermContactCalendar",
    name: "Passport Photograph",
    note: "Recent passport photograph.",
  },
];

export const smeProcessSteps: SMEProcessStep[] = [
  {
    id: "1",
    step: 1,
    title: "Create Account",
    description: "Sign up or log in to your account.",
  },
  {
    id: "2",
    step: 2,
    title: "Fill Application",
    description: "Provide your business information.",
  },
  {
    id: "3",
    step: 3,
    title: "Upload Documents",
    description: "Upload required documents.",
  },
  {
    id: "4",
    step: 4,
    title: "Review & Submit",
    description: "Review and submit your application.",
  },
];

export const smeBusinessTypes: IBusinessType[] = [
  { id: "1", name: "Sole Proprietorship" },
  { id: "2", name: "Partnership" },
  { id: "3", name: "Limited Liability Company" },
  { id: "4", name: "Cooperative" },
  { id: "5", name: "Family Business" },
  { id: "6", name: "Other" },
];

export const smeBusinessCategories: IBusinessCategory[] = [
  { id: "1", name: "Agriculture" },
  { id: "2", name: "Manufacturing" },
  { id: "3", name: "Retail" },
  { id: "4", name: "ICT" },
  { id: "5", name: "Construction" },
  { id: "6", name: "Transportation" },
  { id: "7", name: "Hospitality" },
  { id: "8", name: "Food & Beverage" },
  { id: "9", name: "Fashion" },
  { id: "10", name: "Professional Services" },
  { id: "11", name: "Other" },
];

export const smeBusinessNatures: IBusinessNature[] = [
  { id: "1", name: "Trading / Commerce" },
  { id: "2", name: "Manufacturing / Production" },
  { id: "3", name: "Services" },
  { id: "4", name: "Agriculture / Agro-Allied" },
  { id: "5", name: "Construction / Real Estate" },
  { id: "6", name: "Hospitality / Tourism" },
  { id: "7", name: "Information Technology" },
  { id: "8", name: "Healthcare" },
  { id: "9", name: "Education" },
  { id: "10", name: "Fashion & Textiles" },
  { id: "11", name: "Food Processing" },
  { id: "12", name: "Other" },
];

export const smeBusinessStructures: IBusinessStructure[] = [
  { id: "1", name: "B2B (Business to Business)" },
  { id: "2", name: "B2C (Business to Consumer)" },
  { id: "3", name: "B2G (Business to Government)" },
  { id: "4", name: "D2C (Direct to Consumer)" },
  { id: "5", name: "Hybrid / Mixed" },
];

export const numberOfEmployees: INumberOfEmployees[] = [
  { id: "1", name: "1–5" },
  { id: "2", name: "6–10" },
  { id: "3", name: "11–20" },
  { id: "4", name: "21–50" },
  { id: "5", name: "51–100" },
  { id: "6", name: "100+" },
];

export const annualTurnover: IAnnualTurnover[] = [
  { id: "1", name: "Below ₦5 Million" },
  { id: "2", name: "₦5 Million – ₦20 Million" },
  { id: "3", name: "₦20 Million – ₦50 Million" },
  { id: "4", name: "₦50 Million – ₦100 Million" },
  { id: "5", name: "₦100 Million – ₦250 Million" },
  { id: "6", name: "₦250 Million – ₦500 Million" },
  { id: "7", name: "Above ₦500 Million" },
];

export const smeRequiredDocs: RequiredDocument[] = [
  { id: "1", name: "CAC Certificate (if registered)" },
  { id: "2", name: "Means of Identification" },
  { id: "3", name: "Proof of Address" },
  { id: "4", name: "Business Profile" },
  { id: "5", name: "Passport Photograph" },
];

export const smeRegistrationGuidelines: RegistrationGuideline[] = [
  {
    id: "1",
    icon: "Verified",
    text: "Provide accurate and valid information.",
  },
  {
    id: "2",
    icon: "Star",
    text: "All fields marked with * are required.",
  },
  {
    id: "3",
    icon: "Save",
    text: "You can save and continue later.",
  },
  {
    id: "4",
    icon: "UploadFile",
    text: "Upload clear and valid documents.",
  },
  {
    id: "5",
    icon: "FactCheck",
    text: "Review all information before final submission.",
  },
];

/* ============ MSME Registration Data ============ */

export const msmeBenefits: MSMEBenefit[] = [
  {
    id: "1",
    icon: "Gavel",
    title: "Legal Recognition",
    description: "Gain official recognition and credibility for your business in Anambra State.",
  },
  {
    id: "2",
    icon: "EmojiEvents",
    title: "Access to Opportunities",
    description: "Get access to government tenders, contracts, grants and business support programs.",
  },
  {
    id: "3",
    icon: "AccountBalanceWallet",
    title: "Financial Support",
    description: "Qualify for loans, grants and funding opportunities to grow your business.",
  },
  {
    id: "4",
    icon: "School",
    title: "Capacity Building",
    description: "Participate in training, workshops and mentorship programs.",
  },
  {
    id: "5",
    icon: "Public",
    title: "Market Access",
    description: "Increase your visibility and access new markets locally and globally.",
  },
  {
    id: "6",
    icon: "SupportAgent",
    title: "Business Advisory",
    description: "Receive expert guidance and advisory services to improve your business performance.",
  },
  {
    id: "7",
    icon: "People",
    title: "Networking",
    description: "Connect with other MSMEs, investors, industry players and stakeholders.",
  },
  {
    id: "8",
    icon: "Policy",
    title: "Policy Support",
    description: "Benefit from government policies and initiatives that promote MSME growth.",
  },
];

export const msmeEligibility: MSMEEligibility[] = [
  {
    id: "1",
    text: "Your business is registered or operating in Anambra State.",
  },
  {
    id: "2",
    text: "You are a Micro, Small or Medium Enterprise (MSME) as defined by the Federal Government.",
  },
  {
    id: "3",
    text: "You have a valid means of identification.",
  },
  {
    id: "4",
    text: "You are committed to providing accurate and verifiable information.",
  },
];

export const msmeDocuments: MSMEDocument[] = [
  {
    id: "1",
    icon: "Description",
    name: "CAC Certificate",
    note: "If registered",
  },
  {
    id: "2",
    icon: "Badge",
    name: "Means of Identification",
    note: "NIN, Voter's Card or Driver's License",
  },
  {
    id: "3",
    icon: "Home",
    name: "Proof of Address",
    note: "Utility Bill or Tenancy Agreement",
  },
  {
    id: "4",
    icon: "Article",
    name: "Business Profile",
    note: "Brief description of your business",
  },
  {
    id: "5",
    icon: "PermContactCalendar",
    name: "Passport Photograph",
    note: "Recent passport photograph",
  },
];

export const msmeProcessSteps: MSMEProcessStep[] = [
  {
    id: "1",
    step: 1,
    title: "Create Account",
    description: "Sign up or log in to your account.",
  },
  {
    id: "2",
    step: 2,
    title: "Fill Application",
    description: "Provide your business and owner information.",
  },
  {
    id: "3",
    step: 3,
    title: "Upload Documents",
    description: "Upload required documents.",
  },
  {
    id: "4",
    step: 4,
    title: "Review & Submit",
    description: "Review and submit your application.",
  },
];

export const msmeRequiredDocs: RequiredDocument[] = [
  { id: "1", name: "CAC Certificate (if registered)" },
  { id: "2", name: "Means of Identification" },
  { id: "3", name: "Proof of Address" },
  { id: "4", name: "Business Profile" },
  { id: "5", name: "Passport Photograph" },
];

export const msmeRegistrationGuidelines: RegistrationGuideline[] = [
  {
    id: "1",
    icon: "Verified",
    text: "Provide accurate and valid information.",
  },
  {
    id: "2",
    icon: "Star",
    text: "All fields marked with * are required.",
  },
  {
    id: "3",
    icon: "Save",
    text: "You can save and continue later.",
  },
  {
    id: "4",
    icon: "UploadFile",
    text: "Upload clear and valid documents.",
  },
  {
    id: "5",
    icon: "FactCheck",
    text: "Review all information before final submission.",
  },
];
