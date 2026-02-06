'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Package, 
  Printer, 
  CheckCircle, 
  Truck, 
  LogOut,
  Plus,
  Filter,
  Download,
  ChevronDown
} from 'lucide-react';
import { supabase, getCurrentUser, getOrders, getUserStats, markOrdersAsPrinted } from '@/lib/supabase';
import { Order, User } from '@/types';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pending: 0,
    printed: 0,
    shipped: 0,
  });
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'printed' | 'shipped'>('all');

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user, filter]);

  async function checkAuth() {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      router.push('/auth/login');
      return;
    }
    
    // Get user profile from Supabase
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', currentUser.id)
      .single();
    
    setUser(data);
  }

  async function loadData() {
    if (!user) return;
    
    try {
      const [ordersData, statsData] = await Promise.all([
        getOrders(user.id, filter === 'all' ? undefined : filter),
        getUserStats(user.id),
      ]);
      
      setOrders(ordersData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
  }

  function toggleOrderSelection(orderId: string) {
    const newSelected = new Set(selectedOrders);
    if (newSelected.has(orderId)) {
      newSelected.delete(orderId);
    } else {
      newSelected.add(orderId);
    }
    setSelectedOrders(newSelected);
  }

  function selectAll() {
    if (selectedOrders.size === orders.length) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(orders.map(o => o.id)));
    }
  }

  async function generateLabels() {
    if (selectedOrders.size === 0) return;
    
    // TODO: Implement label generation
    console.log('Generating labels for:', Array.from(selectedOrders));
    
    // Mark as printed
    await markOrdersAsPrinted(Array.from(selectedOrders));
    
    // Reload data
    loadData();
    setSelectedOrders(new Set());
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900">EtiquetaFácil</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">{user?.name}</span>
              <button 
                onClick={handleLogout}
                className="text-slate-400 hover:text-slate-600"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Pedidos', value: stats.totalOrders, icon: Package, color: 'blue' },
            { label: 'Pendentes', value: stats.pending, icon: Truck, color: 'yellow' },
            { label: 'Impressos', value: stats.printed, icon: Printer, color: 'green' },
            { label: 'Enviados', value: stats.shipped, icon: CheckCircle, color: 'purple' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integrations Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Conectar Lojas</h3>
                <p className="text-sm text-slate-600">Integre Mercado Livre, Shopee e TikTok Shop</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
              Conectar
            </button>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-xl border border-slate-200">
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-slate-900">Pedidos</h2>
            
            <div className="flex items-center gap-2">
              {/* Filter */}
              <div className="relative">
                <select 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos</option>
                  <option value="pending">Pendentes</option>
                  <option value="printed">Impressos</option>
                  <option value="shipped">Enviados</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* Generate Button */}
              {selectedOrders.size > 0 && (
                <button 
                  onClick={generateLabels}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  Gerar Etiquetas ({selectedOrders.size})
                </button>
              )}
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input 
                      type="checkbox"
                      checked={orders.length > 0 && selectedOrders.size === orders.length}
                      onChange={selectAll}
                      className="rounded border-slate-300"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">Pedido</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">Cliente</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">Destino</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">Transportadora</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                      <Package className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                      <p>Nenhum pedido encontrado</p>
                      <p className="text-sm">Conecte suas lojas para importar pedidos</p>
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <input 
                          type="checkbox"
                          checked={selectedOrders.has(order.id)}
                          onChange={() => toggleOrderSelection(order.id)}
                          className="rounded border-slate-300"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-900">#{order.platform_order_id}</div>
                        <div className="text-sm text-slate-500 capitalize">{order.platform}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-900">{order.customer_name}</div>
                        {order.customer_phone && (
                          <div className="text-sm text-slate-500">{order.customer_phone}</div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-slate-900">{order.address_city}, {order.address_state}</div>
                        <div className="text-sm text-slate-500">{order.address_zipcode}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                          {order.shipping_method === 'correios' ? 'bg-yellow-100 text-yellow-800' :
                           order.shipping_method === 'loggi' ? 'bg-green-100 text-green-800' :
                           order.shipping_method === 'jadlog' ? 'bg-blue-100 text-blue-800' :
                           'bg-slate-100 text-slate-800'}"
                        >
                          {order.shipping_method}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'printed' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'}`}
                        >
                          {order.status === 'pending' ? 'Pendente' :
                           order.status === 'printed' ? 'Impresso' : 'Enviado'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-500">
                        {new Date(order.created_at).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
