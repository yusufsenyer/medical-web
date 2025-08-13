export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  website_name: string;
  website_type: string;
  status: string;
  total_price: number;
  created_at: string;
  purpose?: string;
  target_audience?: string;
  color_palette?: string;
  selected_pages?: string[];
  selected_features?: string[];
  special_requests?: string;
  notes?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  websiteUrl?: string;
}
