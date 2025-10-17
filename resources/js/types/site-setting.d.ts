export interface SiteSetting {
  id?: number;
  logo?: string | null;
  favicon?: string | null;
  site_title: string;
  app_name?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  about?: string | null;
  phone?: string | null;
  address?: string | null;
  email?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  pinterest?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  pagination?: number;
  style?: string | null;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown; // allows flexibility
}

export interface SettingsFormData {
  site_title: string;
  app_name: string;
  meta_description: string;
  meta_keywords: string;
  about: string;
  phone: string;
  address: string;
  email: string;
  facebook: string;
  twitter: string;
  pinterest: string;
  instagram: string;
  youtube: string;
  pagination: number;
  style: string;
  logo: File | null;
  favicon: File | null;
}
export interface SmtpSetting {
  id?: number;
  mailer: string;
  host: string;
  port: number;
  username: string;
  password: string;
  encryption: string;
  from_name: string;
  from_address: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown; // allows flexibility for future fields
}
