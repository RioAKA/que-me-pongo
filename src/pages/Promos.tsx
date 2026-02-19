import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X, Tag } from "lucide-react";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const Promos = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products-promos"],
    queryFn: async () => {
      const { data } = await supabase
        .from("products")
        .select("*, category:categories(*)")
        .not("original_price", "is", null);
      return (data || []).filter((p: any) => p.original_price && p.original_price > p.price);
    },
  });

  const allColors = useMemo(() => {
    if (!products) return [];
    const colors = new Set<string>();
    products.forEach((p: any) => p.colors?.forEach((c: string) => colors.add(c)));
    return Array.from(colors);
  }, [products]);

  const filtered = useMemo(() => {
    if (!products) return [];
    return products.filter((p: any) => {
      if (selectedSize && !p.sizes?.includes(selectedSize)) return false;
      if (selectedColor && !p.colors?.includes(selectedColor)) return false;
      return true;
    });
  }, [products, selectedSize, selectedColor]);

  const clearFilters = () => {
    setSelectedSize(null);
    setSelectedColor(null);
  };

  const hasActiveFilters = selectedSize || selectedColor;

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2">
            <Tag className="h-6 w-6 text-destructive" />
            <h1 className="font-heading text-3xl md:text-4xl font-bold">Promos</h1>
          </div>
          <p className="text-muted-foreground font-body mt-1">{filtered.length} productos en oferta</p>
        </div>
        <Button variant="outline" className="rounded-lg md:hidden" onClick={() => setShowFilters(!showFilters)}>
          <SlidersHorizontal className="h-4 w-4 mr-2" /> Filtros
        </Button>
      </div>

      <div className="flex gap-8">
        <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-56 shrink-0 space-y-6`}>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-sm text-accent flex items-center gap-1 font-body">
              <X className="h-3 w-3" /> Limpiar filtros
            </button>
          )}

          <div>
            <h3 className="font-heading font-semibold mb-3">Talla</h3>
            <div className="flex flex-wrap gap-2">
              {SIZES.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                  className={`px-3 py-1.5 text-sm rounded-lg border font-body transition-colors ${
                    selectedSize === size ? 'bg-accent text-accent-foreground border-accent' : 'hover:border-accent'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-3">Color</h3>
            <div className="flex flex-wrap gap-2">
              {allColors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(selectedColor === color ? null : color)}
                  className={`px-3 py-1.5 text-sm rounded-lg border font-body transition-colors ${
                    selectedColor === color ? 'bg-accent text-accent-foreground border-accent' : 'hover:border-accent'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] rounded-lg bg-muted animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground font-body">
              <p className="text-lg">No hay productos en oferta en este momento</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filtered.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Promos;
