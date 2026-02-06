# 📦 EtiquetaFácil

Micro SaaS para geração automatizada de etiquetas de envio para vendedores de marketplace (Mercado Livre, Shopee, TikTok Shop).

## ✨ Funcionalidades

- 🔗 Integração com Mercado Livre e Shopee
- 📄 Geração de etiquetas em PDF (formatos 10x15cm e A4)
- 📊 Dashboard com estatísticas de pedidos
- 🚚 Suporte a múltiplas transportadoras (Correios, Loggi, Jadlog)
- 🔄 Geração em lote (até 100 pedidos)
- 📱 Interface responsiva

## 🛠️ Stack Tecnológico

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (Supabase)
- **Auth:** Supabase Auth
- **PDF Generation:** Puppeteer
- **Deploy:** Vercel

## 🚀 Getting Started

### Pré-requisitos

- Node.js 18+
- Conta no Supabase
- Conta no Vercel (para deploy)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/luckbys/etiquetafacil.git
cd etiquetafacil/my-app
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Configure o Supabase:
- Crie um projeto no [Supabase](https://supabase.com)
- Execute as migrations em `supabase/migrations/`
- Copie as credenciais para `.env.local`

5. Rode o projeto:
```bash
npm run dev
```

6. Acesse: http://localhost:3000

## 📊 Modelo de Negócio

| Plano | Preço | Funcionalidades |
|-------|-------|-----------------|
| Gratuito | R$ 0 | 10 etiquetas/mês |
| Starter | R$ 19,90/mês | 100 etiquetas/mês |
| Pro | R$ 49,90/mês | Etiquetas ilimitadas |
| Enterprise | R$ 149,90/mês | Multi-usuário, API |

## 📁 Estrutura do Projeto

```
my-app/
├── app/                    # Next.js App Router
│   ├── dashboard/          # Dashboard do usuário
│   ├── auth/              # Páginas de autenticação
│   ├── api/               # API Routes
│   ├── page.tsx           # Landing page
│   └── layout.tsx         # Layout raiz
├── components/            # Componentes React
├── lib/                   # Utilitários e configurações
│   └── supabase.ts       # Cliente Supabase
├── types/                 # Types TypeScript
└── public/               # Arquivos estáticos
```

## 🎯 Roadmap

- [x] Setup inicial do projeto
- [x] Autenticação com Supabase
- [x] Dashboard básico
- [ ] Integração Mercado Livre API
- [ ] Integração Shopee API
- [ ] Geração de PDF de etiquetas
- [ ] Sistema de pagamentos (Stripe)
- [ ] App mobile (PWA)

## 🤝 Contribuição

Contribuições são bem-vindas! Abra uma issue ou pull request.

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

---

Feito com ❤️ no Brasil 🇧🇷
