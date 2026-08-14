export interface Statistic {
  id: string;
  icon: string;
  iconColor: string;
  count: string;
  label: string;
}

export interface Service {
  id: string;
  icon: string;
  image: string;
  title: string;
  description: string;
}

export interface NewsItem {
  id: string;
  image: string;
  title: string;
  date: string;
}

export interface Event {
  id: string;
  date: string;
  day: string;
  month: string;
  title: string;
  venue: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export interface FooterLink {
  id: string;
  title: string;
  links: { name: string; href: string }[];
}

// Contact Page Interfaces
export interface ContactCard {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string | string[];
  ctaText: string;
  ctaHref?: string;
}

export interface SocialLink {
  id: string;
  name: string;
  icon: React.ElementType;
  href: string;
}

export interface NewsletterSubscriber {
  id?: string;
  email: string;
  createdAt: Date;
}

export interface ContactInformation {
  id: string;
  phone: string;
  altPhone: string;
  email: string;
  supportEmail: string;
  officeHours: string;
  officeHoursNote: string;
}

export interface TeamMember {
  id: string;
  image: string;
  name: string;
  position: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
}

export interface CooperativeBenefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface EligibilityRequirement {
  id: string;
  text: string;
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface RegistrationCategory {
  id: string;
  name: string;
}

export interface RequiredDocument {
  id: string;
  name: string;
}

export interface RegistrationGuideline {
  id: string;
  icon: string;
  text: string;
}

export interface CooperativeRegistrationFormData {
  cooperativeName: string;
  cooperativeType: string;
  registrationCategory: string;
  yearOfEstablishment: string;
  operationalArea: string;
  officeAddress: string;
  localGovernmentArea: string;
  communityTown: string;
  emailAddress: string;
  phoneNumber: string;
  whatsappNumber: string;
  website: string;
  objectives: string;
}

export type CooperativeMemberRole =
  | "Chairman"
  | "Vice Chairman"
  | "Secretary"
  | "Assistant Secretary"
  | "Treasurer"
  | "Financial Secretary"
  | "PRO"
  | "Auditor"
  | "Ex-Officio"
  | "Member";

export interface CooperativeMember {
  id: string;
  role: CooperativeMemberRole;
  fullName: string;
  position?: string;
  gender: "Male" | "Female" | "Other" | "";
  dateOfBirth?: string;
  phoneNumber: string;
  emailAddress: string;
  residentialAddress: string;
  occupation: string;
  bvn?: string;
  nin?: string;
  shareHolding?: number | string;
  yearsInCooperative?: number | string;
  signatureUrl?: string;
  passportUrl?: string;
}

export interface CooperativeDocument {
  documentId: string;
  name: string;
  fileName: string;
  fileUrl: string;
  fileSizeBytes: number;
  mimeType: string;
  uploadedAt: string;
  uploadedBy: string;
  publicId?: string;
  cloudinary?: {
    publicId: string;
    secureUrl: string;
    format: string;
    resourceType: string;
    bytes: number;
    width?: number;
    height?: number;
    folder?: string;
    version?: number;
  };
  id?: string;
  label?: string;
  required?: boolean;
  uploaded?: boolean;
  url?: string;
}

export interface CooperativeRegistrationDocument {
  id?: string;
  cooperativeDetails: CooperativeRegistrationFormData;
  members: CooperativeMember[];
  documents?: CooperativeDocument[];
  reviewSubmission?: {
    declarationAgreed?: boolean;
    submissionDate?: any;
    termsAgreed?: boolean;
    certificationAccuracy?: boolean;
  };
  status?: "draft" | "submitted" | "Under Review" | "Approved" | "Rejected" | "Suspended";
  currentStep?: number;
  registrationNumber?: string;
  createdAt?: any;
  updatedAt?: any;
  submittedAt?: any;
}

export interface BusinessBenefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface BusinessEligibility {
  id: string;
  text: string;
}

export interface BusinessType {
  id: string;
  name: string;
}

export interface BusinessCategory {
  id: string;
  name: string;
}

export interface BusinessNature {
  id: string;
  name: string;
}

export interface BusinessStructure {
  id: string;
  name: string;
}

export interface StateOption {
  id: string;
  name: string;
}

export interface OwnerDirector {
  id: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  nationality: string;
  bvn: string;
  nin: string;
  meansOfId: string;
  residentialAddress: string;
  occupation: string;
  email: string;
  phoneNumber: string;
}

export interface BusinessRegistrationFormData {
  businessName: string;
  businessType: string;
  businessCategory: string;
  natureOfBusiness: string;
  dateOfIncorporation: string;
  cacRegNumber: string;
  taxIdentificationNumber: string;
  businessStructure: string;
  businessAddress: string;
  localGovernmentArea: string;
  communityTown: string;
  state: string;
  postalCode: string;
  emailAddress: string;
  phoneNumber: string;
  alternativePhoneNumber: string;
  website: string;
  businessDescription: string;
  owners: OwnerDirector[];
}

export interface BusinessDocumentUpload {
  documentId: string;
  name: string;
  fileName?: string;
  fileUrl?: string;
  fileSizeBytes?: number;
  mimeType?: string;
  uploadedAt?: string;
  uploadedBy?: string;
  label?: string;
  required?: boolean;
  cloudinary?: {
    publicId?: string;
    secureUrl?: string;
    format?: string;
    resourceType?: string;
    bytes?: number;
    folder?: string;
  };
}

export interface BusinessRegistrationDocument {
  id?: string;
  applicationId?: string;
  userId?: string;
  businessInformation?: BusinessRegistrationFormData;
  owners?: OwnerDirector[];
  documents?: BusinessDocumentUpload[];
  reviewSubmission?: {
    declarationAgreed?: boolean;
    termsAgreed?: boolean;
    certificationAccuracy?: boolean;
    submissionDate?: string;
  };
  status?: "draft" | "pending" | "submitted" | "Under Review" | "Approved" | "Rejected" | "Suspended";
  currentStep?: number;
  registrationNumber?: string;
  createdAt?: any;
  updatedAt?: any;
  submittedAt?: any;
}

export interface KpiCard {
  id: string;
  title: string;
  value: string;
  change: number;
  changeDirection: "up" | "down";
  icon: string;
  color: string;
}

export interface TopService {
  id: string;
  serviceName: string;
  applications: number;
  growth: number;
  icon: string;
  color: string;
}

export interface RecentApplication {
  id: string;
  applicantName: string;
  applicationType: string;
  submissionTime: string;
  status: "Pending" | "Under Review" | "Approved" | "Rejected";
  icon: string;
  color: string;
}

export interface SystemAlert {
  id: string;
  title: string;
  description: string;
  type: "warning" | "success" | "info" | "error";
  time: string;
  badge?: string | number;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  badge?: string | number;
}

export interface FooterStat {
  id: string;
  label: string;
  value: string;
  icon: string;
  color: string;
}

export type ApplicationStatus =
  | "Pending"
  | "Under Review"
  | "Approved"
  | "Rejected";

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
  children?: SidebarItem[];
}

export type AdminRole =
  | "Super Admin"
  | "Commissioner"
  | "Permanent Secretary"
  | "Director"
  | "Staff Administrator"
  | "Content Manager"
  | "Finance Officer"
  | "ICT Administrator";

export type BusinessStatus = "Approved" | "Under Review" | "Pending" | "Rejected" | "Suspended";

export interface BusinessCategoryItem {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface BusinessRow {
  id: string;
  businessName: string;
  applicationNumber: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  categoryId: string;
  categoryName: string;
  lga: string;
  status: BusinessStatus;
  registeredOnDate: string;
  registeredOnTime: string;
  logoColor: string;
}

export type CooperativeStatus = "Approved" | "Under Review" | "Pending" | "Rejected" | "Suspended";

export interface CooperativeCategoryItem {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface CooperativeRow {
  id: string;
  cooperativeName: string;
  registrationNumber: string;
  chairmanName: string;
  chairmanEmail: string;
  chairmanPhone: string;
  categoryId: string;
  categoryName: string;
  lga: string;
  status: CooperativeStatus;
  registeredOnDate: string;
  registeredOnTime: string;
  logoColor: string;
}

export interface SMEBenefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface SMEEligibility {
  id: string;
  text: string;
}

export interface SMEDocument {
  id: string;
  icon: string;
  name: string;
  note?: string;
}

export interface SMEProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface NumberOfEmployees {
  id: string;
  name: string;
}

export interface AnnualTurnover {
  id: string;
  name: string;
}

export interface SMERegistrationFormData {
  businessName: string;
  businessType: string;
  businessCategory: string;
  natureOfBusiness: string;
  cacRegistrationNumber: string;
  dateOfCommencement: string;
  businessStructure: string;
  numberOfEmployees: string;
  annualTurnoverRange: string;
  businessAddress: string;
  localGovernmentArea: string;
  community: string;
  state: string;
  postalCode: string;
  email: string;
  phoneNumber: string;
  alternativePhone: string;
  website: string;
  businessDescription: string;
}

export type SMERegistrationStatus = "draft" | "pending" | "under_review" | "approved" | "rejected";

export interface SMEOwnerDirector {
  id: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  nationality: string;
  meansOfId: string;
  idNumber: string;
  residentialAddress: string;
  occupation: string;
  email: string;
  phoneNumber: string;
  position: string;
}

export interface SMEDocumentUpload {
  documentId: string;
  name: string;
  label?: string;
  fileName?: string;
  fileUrl?: string;
  fileSizeBytes?: number;
  mimeType?: string;
  uploadedAt?: string;
  uploadedBy?: string;
  required?: boolean;
  cloudinary?: {
    publicId?: string;
    secureUrl?: string;
    format?: string;
    resourceType?: string;
    bytes?: number;
    folder?: string;
  };
}

export interface SMERegistrationDocument {
  id?: string;
  applicationId?: string;
  userId?: string;
  businessInformation: SMERegistrationFormData;
  ownerDirectors: SMEOwnerDirector[];
  documents: SMEDocumentUpload[];
  status: SMERegistrationStatus;
  currentStep: number;
  registrationNumber?: string;
  createdAt?: any;
  updatedAt?: any;
  submittedAt?: any;
  reviewSubmission?: {
    declarationAgreed: boolean;
    termsAgreed: boolean;
    certificationAccuracy: boolean;
    submissionDate: string;
  };
  documentsSummary?: {
    total: number;
    onCloudinary: number;
  };
  submissionSummary?: {
    totalOwners: number;
    primaryOwnerName: string;
    primaryOwnerEmail: string;
    businessName: string;
    lga: string;
    emailAddress: string;
    phoneNumber: string;
  };
}

export interface SMERegistration {
  applicationId?: string;
  userId?: string;
  businessName?: string;
  businessType?: string;
  businessCategory?: string;
  natureOfBusiness?: string;
  cacRegistrationNumber?: string;
  dateOfCommencement?: string;
  businessStructure?: string;
  numberOfEmployees?: string;
  annualTurnoverRange?: string;
  businessAddress?: string;
  localGovernmentArea?: string;
  community?: string;
  state?: string;
  postalCode?: string;
  email?: string;
  phoneNumber?: string;
  alternativePhone?: string;
  website?: string;
  businessDescription?: string;
  status?: SMERegistrationStatus;
  currentStep?: number;
  documents?: SMEDocumentUpload[];
  createdAt?: any;
  updatedAt?: any;
  submittedAt?: any;
}

export interface MSMEBenefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface MSMEEligibility {
  id: string;
  text: string;
}

export interface MSMEDocument {
  id: string;
  icon: string;
  name: string;
  note?: string;
}

export interface MSMEProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface MSMERegistrationFormData {
  businessName: string;
  businessType: string;
  businessCategory: string;
  natureOfBusiness: string;
  cacRegistrationNumber: string;
  dateOfCommencement: string;
  businessStructure: string;
  numberOfEmployees: string;
  annualTurnoverRange: string;
  businessAddress: string;
  localGovernmentArea: string;
  community: string;
  state: string;
  postalCode: string;
  email: string;
  phoneNumber: string;
  alternativePhone: string;
  website: string;
  businessDescription: string;
}

export interface MSMEOwnerDirector {
  id: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  nationality: string;
  meansOfId: string;
  idNumber: string;
  residentialAddress: string;
  occupation: string;
  email: string;
  phoneNumber: string;
  position: string;
}

export interface MSMEDocumentUpload {
  documentId: string;
  name: string;
  fileName?: string;
  fileUrl?: string;
  fileSizeBytes?: number;
  mimeType?: string;
  uploadedAt?: string;
  uploadedBy?: string;
  label?: string;
  required?: boolean;
  cloudinary?: {
    publicId?: string;
    secureUrl?: string;
    format?: string;
    resourceType?: string;
    bytes?: number;
    folder?: string;
  };
}

export interface MSMERegistrationDocument {
  id?: string;
  applicationId?: string;
  userId?: string;
  businessInformation?: MSMERegistrationFormData;
  ownerDirectors?: MSMEOwnerDirector[];
  documents?: MSMEDocumentUpload[];
  reviewSubmission?: {
    declarationAgreed?: boolean;
    termsAgreed?: boolean;
    certificationAccuracy?: boolean;
    submissionDate?: string;
  };
  status?: "draft" | "pending" | "submitted" | "Under Review" | "Approved" | "Rejected" | "Suspended";
  currentStep?: number;
  registrationNumber?: string;
  createdAt?: any;
  updatedAt?: any;
  submittedAt?: any;
}
