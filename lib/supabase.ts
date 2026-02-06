import { createClient } from '@supabase/supabase-js';
import { User, Order, Integration, Label } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth functions
export async function signUp(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });
  
  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// User functions
export async function getUserProfile(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) return null;
  return data as User;
}

export async function updateUserProfile(userId: string, updates: Partial<User>) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data as User;
}

// Orders functions
export async function getOrders(userId: string, status?: string): Promise<Order[]> {
  let query = supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (status) {
    query = query.eq('status', status);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return (data || []) as Order[];
}

export async function createOrder(order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('orders')
    .insert([order])
    .select()
    .single();
  
  if (error) throw error;
  return data as Order;
}

export async function updateOrder(orderId: string, updates: Partial<Order>) {
  const { data, error } = await supabase
    .from('orders')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', orderId)
    .select()
    .single();
  
  if (error) throw error;
  return data as Order;
}

export async function markOrdersAsPrinted(orderIds: string[]) {
  const { data, error } = await supabase
    .from('orders')
    .update({ 
      status: 'printed', 
      printed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .in('id', orderIds)
    .select();
  
  if (error) throw error;
  return data as Order[];
}

// Integration functions
export async function getIntegrations(userId: string): Promise<Integration[]> {
  const { data, error } = await supabase
    .from('integrations')
    .select('*')
    .eq('user_id', userId)
    .eq('is_active', true);
  
  if (error) throw error;
  return (data || []) as Integration[];
}

export async function createIntegration(integration: Omit<Integration, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('integrations')
    .insert([integration])
    .select()
    .single();
  
  if (error) throw error;
  return data as Integration;
}

export async function deleteIntegration(integrationId: string) {
  const { error } = await supabase
    .from('integrations')
    .delete()
    .eq('id', integrationId);
  
  if (error) throw error;
}

// Labels functions
export async function createLabel(label: Omit<Label, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('labels')
    .insert([label])
    .select()
    .single();
  
  if (error) throw error;
  return data as Label;
}

export async function getLabelsByOrder(orderId: string): Promise<Label[]> {
  const { data, error } = await supabase
    .from('labels')
    .select('*')
    .eq('order_id', orderId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return (data || []) as Label[];
}

// Statistics
export async function getUserStats(userId: string) {
  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('status')
    .eq('user_id', userId);
  
  if (ordersError) throw ordersError;
  
  const { data: labels, error: labelsError } = await supabase
    .from('labels')
    .select('id')
    .eq('user_id', userId);
  
  if (labelsError) throw labelsError;
  
  const pending = orders?.filter(o => o.status === 'pending').length || 0;
  const printed = orders?.filter(o => o.status === 'printed').length || 0;
  const shipped = orders?.filter(o => o.status === 'shipped').length || 0;
  
  return {
    totalOrders: orders?.length || 0,
    pending,
    printed,
    shipped,
    totalLabels: labels?.length || 0,
  };
}
