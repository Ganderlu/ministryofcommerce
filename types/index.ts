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
