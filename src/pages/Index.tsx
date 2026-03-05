import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShopifyProducts, useShopifyCollections } from "@/hooks/useShopifyProducts";
import ShopifyProductCard from "@/components/ShopifyProductCard";
import heroBanner from "@/assets/hero-banner.jpg";

const Index = () => {
  const { data: products } = useShopifyProducts(4);
  const { data: collections } = useShopifyCollections();

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[500px] overflow-hidden">
        <img src={heroBanner} alt="¿Qué me pongo?" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-background/20" />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-8 animate-fade-in text-center">
            <Button asChild className="rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 px-10 py-6 text-base font-body font-semibold shadow-lg">
              <Link to="/catalog">
                Explorar Colección <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Collections */}
      {collections && collections.length > 0 && (
        <section className="container mx-auto px-4 py-20">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">Categorías</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {collections.map((col) => (
              <Link
                key={col.id}
                to={`/catalog?collection=${col.handle}`}
                className="group relative overflow-hidden rounded-lg bg-secondary aspect-square flex items-end p-4 hover:shadow-lg transition-shadow"
              >
                {col.image && (
                  <img src={col.image.url} alt={col.image.altText || col.title} className="absolute inset-0 w-full h-full object-cover" />
                )}
                <span className="relative font-heading font-semibold text-lg group-hover:text-accent transition-colors">{col.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured */}
      <section className="container mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold">Destacados</h2>
          <Link to="/catalog" className="font-body text-sm text-accent hover:underline flex items-center gap-1">
            Ver todo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ShopifyProductCard key={product.node.id} product={product} />
          ))}
          {(!products || products.length === 0) && (
            <p className="col-span-full text-center text-muted-foreground font-body py-10">No se encontraron productos</p>
          )}
        </div>
      </section>

      {/* Banner */}
      <section className="bg-secondary">
        <div className="container mx-auto px-4 py-20 text-center space-y-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold">Envíos a Todo el País</h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto">
            Por Correo Argentino y Andreani. Devoluciones gratuitas en 30 días.
          </p>
          <Button asChild className="rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 px-8 font-body font-semibold">
            <Link to="/catalog">Comprar Ahora</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Index;
