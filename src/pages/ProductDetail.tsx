import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronLeft, ShoppingBag, Truck } from "lucide-react";
import { formatARS } from "@/lib/currency";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data } = await supabase.from("products").select("*, category:categories(*)").eq("slug", slug!).single();
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="aspect-[3/4] rounded-lg bg-muted animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-6 bg-muted rounded animate-pulse w-1/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground font-body text-lg">Producto no encontrado</p>
        <Link to="/catalog" className="text-accent mt-4 inline-block hover:underline">Volver al catálogo</Link>
      </div>
    );
  }

  const hasDiscount = product.original_price && product.original_price > product.price;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addItem(product.id, selectedSize, selectedColor);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Link to="/catalog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground font-body mb-6">
        <ChevronLeft className="h-4 w-4" /> Volver al catálogo
      </Link>

      <div className="grid md:grid-cols-2 gap-10 animate-fade-in">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-[3/4] rounded-lg overflow-hidden bg-secondary/30">
            <img
              src={product.images?.[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? 'border-accent' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          {(product as any).category && (
            <p className="text-sm text-muted-foreground font-body tracking-wider uppercase">{(product as any).category.name}</p>
          )}
          <h1 className="font-heading text-3xl md:text-4xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-3">
            <span className="font-heading text-2xl font-bold">{formatARS(product.price)}</span>
            {hasDiscount && (
              <>
                <span className="text-lg text-muted-foreground line-through">{formatARS(product.original_price!)}</span>
                <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-lg">
                  -{Math.round(((product.original_price! - product.price) / product.original_price!) * 100)}%
                </span>
              </>
            )}
          </div>

          <p className="font-body text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Size */}
          <div>
            <h3 className="font-heading font-semibold mb-3">Talla</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-sm rounded-lg border font-body transition-colors ${
                    selectedSize === size ? 'bg-accent text-accent-foreground border-accent' : 'hover:border-accent'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <h3 className="font-heading font-semibold mb-3">Color</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors?.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 text-sm rounded-lg border font-body transition-colors ${
                    selectedColor === color ? 'bg-accent text-accent-foreground border-accent' : 'hover:border-accent'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={!selectedSize || !selectedColor}
            className="w-full rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 py-6 text-base font-body font-semibold disabled:opacity-50"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Agregar al Carrito
          </Button>

          {(!selectedSize || !selectedColor) && (
            <p className="text-sm text-muted-foreground font-body text-center">Seleccioná talla y color</p>
          )}

          {/* Shipping Calculator */}
          <div className="border rounded-lg p-5 space-y-3 mt-2">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-accent" />
              <h3 className="font-heading font-semibold">Calculá tu envío</h3>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Tu Código Postal" className="rounded-lg" maxLength={4} />
              <Button variant="outline" className="rounded-lg font-body shrink-0">Calcular</Button>
            </div>
            <p className="text-xs text-muted-foreground font-body">
              Envíos a todo el país por Correo Argentino y Andreani.
            </p>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="description">
              <AccordionTrigger className="font-heading font-semibold">Descripción</AccordionTrigger>
              <AccordionContent className="font-body text-muted-foreground leading-relaxed">
                {product.description}
              </AccordionContent>
            </AccordionItem>
            {product.care_instructions && (
              <AccordionItem value="care">
                <AccordionTrigger className="font-heading font-semibold">Cuidados de la Prenda</AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground leading-relaxed">
                  {product.care_instructions}
                </AccordionContent>
              </AccordionItem>
            )}
            <AccordionItem value="shipping">
              <AccordionTrigger className="font-heading font-semibold">Envío y Devoluciones</AccordionTrigger>
              <AccordionContent className="font-body text-muted-foreground leading-relaxed">
                Envío a todo el país. Devoluciones gratuitas en 30 días.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
