export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: Category;
  author: User;
  featured_image: string;
  created_at: string;
  updated_at: string;
  is_featured: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  email: string;
  twitter: string;
  linkedin: string;
  order: number;
}

export interface Partner {
  id: number;
  name: string;
  description: string;
  logo: string;
  website: string;
  order: number;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}