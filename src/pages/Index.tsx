import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "@/components/ProductCard";
import heroBanner from "@/assets/hero-banner.jpg";

const Index = () => {
  const { data: featured } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data } = await supabase.from("products").select("*").eq("featured", true).limit(4);
      return data || [];
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await supabase.from("categories").select("*");
      return data || [];
    },
  });

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
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white drop-shadow-lg">¿Qué me pongo?</h1>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">Categorías</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories?.map((cat) => (
            <Link
              key={cat.id}
              to={`/catalog?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-lg bg-secondary aspect-square flex items-end p-4 hover:shadow-lg transition-shadow"
            >
              <span className="font-heading font-semibold text-lg group-hover:text-accent transition-colors">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold">Destacados</h2>
          <Link to="/catalog" className="font-body text-sm text-accent hover:underline flex items-center gap-1">
            Ver todo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featured?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
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
