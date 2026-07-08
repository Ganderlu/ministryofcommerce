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
