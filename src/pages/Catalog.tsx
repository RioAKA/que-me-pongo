import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import ShopifyProductCard from "@/components/ShopifyProductCard";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";
import PriceRangeFilter from "@/components/PriceRangeFilter";

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const collectionHandle = searchParams.get("collection");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 999999]);
  const [showFilters, setShowFilters] = useState(false);

  const searchQuery = collectionHandle ? `collection:${collectionHandle}` : undefined;
  const { data: products, isLoading } = useShopifyProducts(100, searchQuery);

  const priceBounds = useMemo(() => {
    if (!products || products.length === 0) return { min: 0, max: 100000 };
    const prices = products.map(p => parseFloat(p.node.priceRange.minVariantPrice.amount));
    return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) };
  }, [products]);

  const filtered = useMemo(() => {
    if (!products) return [];
    return products.filter(p => {
      const price = parseFloat(p.node.priceRange.minVariantPrice.amount);
      return price >= priceRange[0] && price <= priceRange[1];
    });
  }, [products, priceRange]);

  const pageTitle = collectionHandle
    ? collectionHandle.charAt(0).toUpperCase() + collectionHandle.slice(1)
    : "Catálogo";

  const clearFilters = () => {
    setPriceRange([0, 999999]);
    setSearchParams({});
  };

  const hasActiveFilters = priceRange[0] > 0 || priceRange[1] < 999999 || collectionHandle;

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold">{pageTitle}</h1>
          <p className="text-muted-foreground font-body mt-1">{filtered.length} productos</p>
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

          <PriceRangeFilter
            min={priceBounds.min}
            max={priceBounds.max}
            value={[Math.max(priceRange[0], priceBounds.min), Math.min(priceRange[1], priceBounds.max)]}
            onChange={setPriceRange}
          />
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
              <p className="text-lg">No se encontraron productos</p>
              <button onClick={clearFilters} className="text-accent mt-2 hover:underline">Limpiar filtros</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ShopifyProductCard key={product.node.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Catalog;
