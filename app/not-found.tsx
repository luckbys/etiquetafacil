import Link from 'next/link';
import { Package, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4">
      <div className="text-center max-w-md">
        <div className="bg-blue-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <Package className="w-12 h-12 text-blue-600" />
        </div>
        
        <h1 className="text-6xl font-bold text-slate-900 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">
          Página não encontrada
        </h2>
        <p className="text-slate-600 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            <Home className="w-4 h-4" />
            Ir para Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-300 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
