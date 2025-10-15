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
