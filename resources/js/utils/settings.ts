import { SettingsFormData, SiteSetting } from "@/types/site-setting";


export const mapSiteSettingToFormData = (settings: SiteSetting): SettingsFormData => ({
  site_title: settings.site_title || "",
  app_name: settings.app_name || "",
  meta_description: settings.meta_description || "",
  meta_keywords: settings.meta_keywords || "",
  about: settings.about || "",
  phone: settings.phone || "",
  address: settings.address || "",
  email: settings.email || "",
  facebook: settings.facebook || "",
  twitter: settings.twitter || "",
  pinterest: settings.pinterest || "",
  instagram: settings.instagram || "",
  youtube: settings.youtube || "",
  pagination: settings.pagination ?? 6,
  style: settings.style || "",
  logo: null,
  favicon: null,
});
