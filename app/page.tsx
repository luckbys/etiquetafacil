import Link from 'next/link';
import { Package, Zap, Shield, Printer, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navbar */}
      <nav className="border-b bg-white/80 backdrop-blur-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">EtiquetaFácil</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/login" className="text-slate-600 hover:text-slate-900">
                Entrar
              </Link>
              <Link 
                href="/auth/register" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Começar Grátis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            🎉 Lançamento: 50% OFF no primeiro mês!
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Gere etiquetas de envio
            <br />
            <span className="text-blue-600">em segundos</span>
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Importe pedidos do Mercado Livre e Shopee automaticamente. 
            Gere etiquetas em lote para Correios, Loggi, Jadlog e mais.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/auth/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              Começar Grátis
              <CheckCircle className="w-5 h-5" />
            </Link>
            <Link 
              href="#como-funciona"
              className="bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-300 transition"
            >
              Ver Como Funciona
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              10 etiquetas grátis
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Sem cartão de crédito
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Cancele quando quiser
            </span>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-16">
            Como funciona
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Conecte suas lojas',
                description: 'Integre Mercado Livre, Shopee e TikTok Shop em poucos cliques.',
                icon: Package,
              },
              {
                step: '2',
                title: 'Importe pedidos',
                description: 'Seus pedidos aparecem automaticamente, organizados por transportadora.',
                icon: Zap,
              },
              {
                step: '3',
                title: 'Gere etiquetas',
                description: 'Selecione os pedidos e gere etiquetas em PDF em segundos.',
                icon: Printer,
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-blue-600 font-bold text-lg mb-2">Passo {item.step}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preços */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
            Planos simples
          </h2>
          <p className="text-center text-slate-600 mb-12">Escolha o plano ideal para o seu negócio</p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Gratuito</h3>
              <div className="text-4xl font-bold text-slate-900 mb-6">R$ 0<span className="text-lg text-slate-500 font-normal">/mês</span></div>
              <ul className="space-y-3 mb-8">
                {['10 etiquetas/mês', '1 integração', 'Formato 10x15cm', 'Correios'].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link 
                href="/auth/register"
                className="block w-full text-center border-2 border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:border-blue-300 transition"
              >
                Começar Grátis
              </Link>
            </div>

            {/* Starter */}
            <div className="bg-white rounded-2xl p-8 border-2 border-blue-600 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Mais Popular
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Starter</h3>
              <div className="text-4xl font-bold text-slate-900 mb-6">R$ 19,90<span className="text-lg text-slate-500 font-normal">/mês</span></div>
              <ul className="space-y-3 mb-8">
                {['100 etiquetas/mês', 'Integrações ilimitadas', 'Todas transportadoras', 'Lote: 50 pedidos', 'Formatos A4 e 10x15cm'].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link 
                href="/auth/register"
                className="block w-full text-center bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Assinar Starter
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Pro</h3>
              <div className="text-4xl font-bold text-slate-900 mb-6">R$ 49,90<span className="text-lg text-slate-500 font-normal">/mês</span></div>
              <ul className="space-y-3 mb-8">
                {['Etiquetas ilimitadas', 'TUDO do Starter', 'Lote ilimitado', 'API/Webhook', 'Múltiplos usuários', 'Suporte prioritário'].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link 
                href="/auth/register"
                className="block w-full text-center border-2 border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:border-blue-300 transition"
              >
                Assinar Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para agilizar seus envios?
          </h2>
          <p className="text-blue-100 text-xl mb-8">
            Junte-se a milhares de vendedores que economizam horas todos os dias.
          </p>
          <Link 
            href="/auth/register"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition"
          >
            Criar Conta Grátis →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-slate-400 text-center">
        <p>© 2026 EtiquetaFácil. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
