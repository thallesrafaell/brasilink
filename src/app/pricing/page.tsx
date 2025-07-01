import { Metadata } from "next";
import Link from "next/link";

import { HeroImage } from "@/components/ui/optimized-image";
import { generatePageMetadata } from "@/lib/metadata";
import { generateWebPageSchema } from "@/lib/schema";

// Meta tags específicas para esta página
export async function generateMetadata(): Promise<Metadata> {
  return await generatePageMetadata("/pricing", "pt");
}

// Schema markup para a página de preços
const pricingPageSchema = generateWebPageSchema({
  name: "Preços - Brasilink",
  description:
    "Conheça nossos planos e preços para profissionais brasileiros no exterior.",
  url: "https://brasilink.com/pricing",
  breadcrumb: [
    { name: "Home", url: "https://brasilink.com" },
    { name: "Preços", url: "https://brasilink.com/pricing" },
  ],
});

export default function PricingPage() {
  return (
    <>
      {/* Schema markup específico para esta página */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricingPageSchema),
        }}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb navigation para SEO */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="text-muted-foreground flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground">Preços</li>
          </ol>
        </nav>

        {/* Header com H1 otimizado para SEO */}
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">
            Planos e Preços - Brasilink
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Escolha o plano ideal para seu negócio. Comece grátis e escale
            conforme sua necessidade.
          </p>
        </header>

        {/* Imagem otimizada com alt text descritivo */}
        <div className="mb-12 text-center">
          <HeroImage
            src="/pricing-hero.jpg"
            alt="Planos de preços da Brasilink - Escolha o melhor plano para profissionais brasileiros no exterior"
            width={800}
            height={400}
            className="mx-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Cards de preços com estrutura semântica */}
        <section className="mb-16 grid gap-8 md:grid-cols-3">
          <article className="rounded-lg border p-6 text-center">
            <header>
              <h2 className="mb-2 text-2xl font-semibold">Plano Gratuito</h2>
              <p className="mb-4 text-3xl font-bold">
                €0<span className="text-sm font-normal">/mês</span>
              </p>
            </header>
            <ul className="mb-6 space-y-2 text-left">
              <li>✓ Até 10 agendamentos por mês</li>
              <li>✓ 1 tipo de serviço</li>
              <li>✓ Suporte por email</li>
            </ul>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md py-2">
              Começar Grátis
            </button>
          </article>

          <article className="bg-primary/5 rounded-lg border p-6 text-center">
            <header>
              <h2 className="mb-2 text-2xl font-semibold">
                Plano Professional
              </h2>
              <p className="mb-4 text-3xl font-bold">
                €29<span className="text-sm font-normal">/mês</span>
              </p>
            </header>
            <ul className="mb-6 space-y-2 text-left">
              <li>✓ Agendamentos ilimitados</li>
              <li>✓ Tipos de serviços ilimitados</li>
              <li>✓ Pagamentos online</li>
              <li>✓ Suporte prioritário</li>
            </ul>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md py-2">
              Assinar Professional
            </button>
          </article>

          <article className="rounded-lg border p-6 text-center">
            <header>
              <h2 className="mb-2 text-2xl font-semibold">Plano Enterprise</h2>
              <p className="mb-4 text-3xl font-bold">
                €99<span className="text-sm font-normal">/mês</span>
              </p>
            </header>
            <ul className="mb-6 space-y-2 text-left">
              <li>✓ Tudo do Professional</li>
              <li>✓ API personalizada</li>
              <li>✓ White-label</li>
              <li>✓ Suporte dedicado</li>
            </ul>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md py-2">
              Entrar em Contato
            </button>
          </article>
        </section>

        {/* FAQ section com Schema markup */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Perguntas Frequentes
          </h2>
          <div className="mx-auto max-w-2xl space-y-4">
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-semibold">
                Posso cancelar minha assinatura a qualquer momento?
              </summary>
              <p className="text-muted-foreground mt-2">
                Sim, você pode cancelar sua assinatura a qualquer momento
                através do painel de controle. Não há multas ou taxas de
                cancelamento.
              </p>
            </details>

            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-semibold">
                Vocês oferecem desconto para pagamento anual?
              </summary>
              <p className="text-muted-foreground mt-2">
                Sim, oferecemos 20% de desconto para pagamentos anuais em todos
                os planos pagos.
              </p>
            </details>

            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-semibold">
                Posso fazer upgrade ou downgrade do meu plano?
              </summary>
              <p className="text-muted-foreground mt-2">
                Sim, você pode alterar seu plano a qualquer momento. As mudanças
                são aplicadas imediatamente e o valor é ajustado
                proporcionalmente.
              </p>
            </details>
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-muted rounded-lg p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Pronto para começar?</h2>
          <p className="text-muted-foreground mb-6">
            Junte-se a milhares de profissionais brasileiros que já usam a
            Brasilink
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-3">
              Começar Grátis
            </button>
            <button className="border-primary text-primary hover:bg-primary/10 rounded-md border px-6 py-3">
              Agendar Demo
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
