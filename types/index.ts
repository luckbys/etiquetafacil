// types/index.ts

export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  created_at: string;
}

export interface Integration {
  id: string;
  user_id: string;
  platform: 'mercadolivre' | 'shopee' | 'tiktok';
  access_token: string;
  refresh_token: string;
  is_active: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  platform: 'mercadolivre' | 'shopee' | 'tiktok';
  platform_order_id: string;
  status: 'pending' | 'printed' | 'shipped';
  
  // Customer Info
  customer_name: string;
  customer_phone?: string;
  customer_email?: string;
  
  // Shipping Address
  address_street: string;
  address_number?: string;
  address_complement?: string;
  address_neighborhood: string;
  address_city: string;
  address_state: string;
  address_zipcode: string;
  
  // Shipping Info
  shipping_method: 'correios' | 'loggi' | 'jadlog' | 'azul' | 'other';
  tracking_code?: string;
  
  // Products
  products: Product[];
  
  // Timestamps
  created_at: string;
  updated_at: string;
  printed_at?: string;
}

export interface Product {
  name: string;
  quantity: number;
  price?: number;
}

export interface Label {
  id: string;
  order_id: string;
  pdf_url: string;
  format: '10x15' | 'A4';
  created_at: string;
}

export type PlanLimits = {
  free: { maxLabels: number; maxIntegrations: number; batchSize: number };
  starter: { maxLabels: number; maxIntegrations: number; batchSize: number };
  pro: { maxLabels: number | null; maxIntegrations: number; batchSize: number };
  enterprise: { maxLabels: number | null; maxIntegrations: number; batchSize: number };
};

export const PLAN_LIMITS: PlanLimits = {
  free: { maxLabels: 10, maxIntegrations: 1, batchSize: 5 },
  starter: { maxLabels: 100, maxIntegrations: 10, batchSize: 50 },
  pro: { maxLabels: null, maxIntegrations: 100, batchSize: 500 },
  enterprise: { maxLabels: null, maxIntegrations: 1000, batchSize: 10000 },
};

export const PLAN_PRICES = {
  free: 0,
  starter: 19.90,
  pro: 49.90,
  enterprise: 149.90,
};
