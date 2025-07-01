# Guia Completo de SEO - Brasilink

## 📋 Visão Geral

Este documento descreve todas as implementações de SEO realizadas no projeto Brasilink, seguindo as melhores práticas para Next.js 13+ com App Router.

## 🎯 Implementações Realizadas

### 1. Meta Tags Globais e Dinâmicas

#### Layout Global (`src/app/layout.tsx`)
- **Meta tags básicas**: charset, viewport, title, description
- **Open Graph tags**: para redes sociais (Facebook, LinkedIn)
- **Twitter Cards**: otimização para Twitter
- **Robots meta**: controle de indexação
- **Canonical URLs**: prevenção de conteúdo duplicado
- **Alternates**: suporte multilíngue (pt-BR, en-US)
- **Verification tags**: Google Search Console, Bing

#### Meta Tags Dinâmicas (`src/lib/metadata.ts`)
- Sistema para meta tags personalizadas por página
- Configuração específica para páginas públicas vs privadas
- Suporte completo a internacionalização

### 2. Schema Markup (JSON-LD)

#### Schemas Implementados (`src/lib/schema.ts`)
- **Organization**: informações da empresa
- **WebSite**: dados do site principal
- **SoftwareApplication**: detalhes da aplicação
- **WebPage**: estrutura de páginas individuais
- **Service**: serviços oferecidos
- **FAQPage**: páginas de perguntas frequentes
- **BreadcrumbList**: navegação estruturada

#### Componentes de Schema (`src/components/seo/SchemaMarkup.tsx`)
- Componentes React para fácil implementação
- Renderização client-side com useEffect
- Suporte a múltiplos schemas por página

### 3. Sitemap Dinâmico

#### Arquivo: `src/app/sitemap.ts`
- **URLs principais**: todas as rotas públicas
- **Multilíngue**: pt-BR e en-US
- **Prioridades**: baseadas na importância das páginas
- **Change frequency**: frequência de atualização
- **Last modified**: data de última modificação

### 4. Robots.txt Inteligente

#### Arquivo: `src/app/robots.ts`
- **Allow/Disallow**: controle granular de crawling
- **User-agent específico**: regras para Googlebot
- **Bloqueio de bots indesejados**: GPTBot, ChatGPT-User, etc.
- **Sitemap reference**: link para sitemap.xml

### 5. Manifest para PWA

#### Arquivo: `src/app/manifest.ts`
- **PWA completa**: nome, ícones, theme colors
- **Shortcuts**: acesso rápido a funcionalidades
- **Categories**: classificação na app store

### 6. Otimização de Imagens

#### Componente: `src/components/ui/optimized-image.tsx`
- **Next.js Image**: otimização automática
- **Lazy loading**: carregamento sob demanda
- **Responsive images**: diferentes tamanhos por device
- **Alt text obrigatório**: acessibilidade e SEO
- **Quality control**: compressão inteligente

### 7. Hooks SEO Personalizados

#### Hook: `src/hooks/use-seo.ts`
- **useSEO**: meta tags dinâmicas client-side
- **useStructuredData**: Schema markup dinâmico
- **usePreload**: preload de recursos críticos

### 8. Páginas Privadas (No-Index)

#### Layout: `src/app/(private)/layout.tsx`
- **Robots no-index**: páginas não indexáveis
- **Meta tags específicas**: para áreas protegidas
- **No-archive/no-snippet**: controle avançado

## 🛠️ Como Usar

### 1. Meta Tags por Página

```typescript
// Em qualquer page.tsx
import { generatePageMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return await generatePageMetadata('/sua-rota', 'pt')
}
```

### 2. Schema Markup

```tsx
// Em qualquer componente
import { WebPageSchema } from '@/components/seo/SchemaMarkup'
import { generateWebPageSchema } from '@/lib/schema'

const schema = generateWebPageSchema({
  name: 'Título da Página',
  description: 'Descrição da página',
  url: 'https://brasilink.com/pagina'
})

return <WebPageSchema schema={schema} />
```

### 3. Imagens Otimizadas

```tsx
import { HeroImage } from '@/components/ui/optimized-image'

<HeroImage
  src="/sua-imagem.jpg"
  alt="Descrição detalhada da imagem"
  width={1200}
  height={630}
/>
```

### 4. SEO Client-Side

```tsx
import { useSEO } from '@/hooks/use-seo'

function MinhaPagina() {
  useSEO({
    title: 'Título Dinâmico',
    description: 'Descrição dinâmica',
    keywords: ['palavra1', 'palavra2']
  })
  
  return <div>Conteúdo</div>
}
```

## 📊 Checklist SEO

### ✅ Implementado
- [x] Meta tags básicas (title, description, keywords)
- [x] Open Graph tags completas
- [x] Twitter Cards
- [x] Canonical URLs
- [x] Robots meta tags
- [x] Schema markup (Organization, WebSite, SoftwareApplication)
- [x] Sitemap.xml dinâmico
- [x] Robots.txt inteligente
- [x] PWA Manifest
- [x] Otimização de imagens
- [x] URLs amigáveis
- [x] Breadcrumbs estruturados
- [x] No-index para páginas privadas
- [x] Suporte multilíngue (hreflang)
- [x] Preload de recursos críticos

### 🔄 Configurações Pendentes
- [ ] Google Search Console (código de verificação)
- [ ] Bing Webmaster Tools (código de verificação)
- [ ] Imagens og:image reais (substituir placeholders)
- [ ] Configuração de CDN para imagens
- [ ] Analytics e Tag Manager

## 🚀 Testes e Validação

### Ferramentas Recomendadas
1. **Google Search Console**: monitoramento de indexação
2. **Rich Results Test**: validação de Schema markup
3. **PageSpeed Insights**: performance e Core Web Vitals
4. **Lighthouse**: auditoria completa de SEO
5. **Screaming Frog**: análise técnica de SEO

### Comandos para Teste Local
```bash
# Build de produção
npm run build

# Verificar sitemap
curl http://localhost:3000/sitemap.xml

# Verificar robots
curl http://localhost:3000/robots.txt

# Verificar manifest
curl http://localhost:3000/manifest.json
```

## 📈 Métricas de Sucesso

### KPIs para Monitorar
1. **Indexação**: páginas indexadas no Google
2. **Rankings**: posições para palavras-chave alvo
3. **CTR**: taxa de clique nos resultados de busca
4. **Core Web Vitals**: LCP, FID, CLS
5. **Impressões**: visibilidade nos resultados
6. **Rich Snippets**: aparição de dados estruturados

## 🔧 Manutenção

### Tarefas Regulares
- [ ] Atualizar sitemap quando adicionar novas páginas
- [ ] Revisar meta descriptions mensalmente
- [ ] Monitorar broken links
- [ ] Atualizar Schema markup conforme mudanças
- [ ] Verificar velocidade de carregamento
- [ ] Analisar relatórios do Search Console

---

**Nota**: Todas as implementações seguem as diretrizes mais recentes do Google e estão otimizadas para o algoritmo de busca atual. O código é compatível com Next.js 13+ App Router e TypeScript.
