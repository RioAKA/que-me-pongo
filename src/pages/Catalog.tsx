import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SlidersHorizontal, X } from "lucide-react";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const PRICE_RANGES = [
  { label: "Todos", min: 0, max: Infinity },
  { label: "< $5.000", min: 0, max: 5000 },
  { label: "$5.000 - $15.000", min: 5000, max: 15000 },
  { label: "$15.000 - $30.000", min: 15000, max: 30000 },
  { label: "> $30.000", min: 30000, max: Infinity },
];

const CATEGORY_DISPLAY: Record<string, string> = {
  remeras: "Remeras",
  abrigos: "Abrigos & Sweaters",
  pantalones: "Pantalones & Jeans",
  vestidos: "Vestidos",
  conjuntos: "Conjuntos",
};

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySlug = searchParams.get("category");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await supabase.from("products").select("*, category:categories(*)");
      return data || [];
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await supabase.from("categories").select("*").order("name");
      return data || [];
    },
  });

  const allColors = useMemo(() => {
    if (!products) return [];
    const colors = new Set<string>();
    products.forEach(p => p.colors?.forEach((c: string) => colors.add(c)));
    return Array.from(colors);
  }, [products]);

  const filtered = useMemo(() => {
    if (!products) return [];
    return products.filter((p: any) => {
      if (categorySlug && p.category?.slug !== categorySlug) return false;
      if (selectedSize && !p.sizes?.includes(selectedSize)) return false;
      if (selectedColor && !p.colors?.includes(selectedColor)) return false;
      const range = PRICE_RANGES[priceRange];
      if (p.price < range.min || p.price > range.max) return false;
      return true;
    });
  }, [products, categorySlug, selectedSize, selectedColor, priceRange]);

  const pageTitle = categorySlug
    ? CATEGORY_DISPLAY[categorySlug] || categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)
    : "Catálogo";

  const clearFilters = () => {
    setSelectedSize(null);
    setSelectedColor(null);
    setPriceRange(0);
    setSearchParams({});
  };

  const handleCategoryToggle = (slug: string) => {
    if (categorySlug === slug) {
      setSearchParams({});
    } else {
      setSearchParams({ category: slug });
    }
  };

  const hasActiveFilters = selectedSize || selectedColor || priceRange > 0 || categorySlug;

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
        {/* Filters sidebar */}
        <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-56 shrink-0 space-y-6`}>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-sm text-accent flex items-center gap-1 font-body">
              <X className="h-3 w-3" /> Limpiar filtros
            </button>
          )}

          {/* Category filter */}
          <div>
            <h3 className="font-heading font-semibold mb-3">Categoría</h3>
            <div className="flex flex-col gap-2">
              {(categories || []).map((cat: any) => (
                <label
                  key={cat.slug}
                  className="flex items-center gap-2 cursor-pointer font-body text-sm"
                >
                  <Checkbox
                    checked={categorySlug === cat.slug}
                    onCheckedChange={() => handleCategoryToggle(cat.slug)}
                  />
                  <span className={categorySlug === cat.slug ? "text-primary font-medium" : ""}>
                    {CATEGORY_DISPLAY[cat.slug] || cat.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

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

          <div>
            <h3 className="font-heading font-semibold mb-3">Precio</h3>
            <div className="flex flex-col gap-2">
              {PRICE_RANGES.map((range, i) => (
                <button
                  key={i}
                  onClick={() => setPriceRange(priceRange === i ? 0 : i)}
                  className={`text-left px-3 py-1.5 text-sm rounded-lg border font-body transition-colors ${
                    priceRange === i && i !== 0 ? 'bg-accent text-accent-foreground border-accent' : 'hover:border-accent'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product grid */}
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

export default Catalog;
