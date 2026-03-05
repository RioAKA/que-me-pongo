import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useShopifyProductByHandle } from "@/hooks/useShopifyProducts";
import { useShopifyCartStore } from "@/stores/shopifyCartStore";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronLeft, ShoppingBag, Truck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatARS } from "@/lib/currency";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading } = useShopifyProductByHandle(slug);
  const { addItem, openCart } = useShopifyCartStore();

  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState(0);

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

  const images = product.images?.edges || [];
  const variants = product.variants?.edges || [];
  const options = product.options || [];
  const price = parseFloat(product.priceRange.minVariantPrice.amount);

  const handleOptionChange = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newOptions);

    // Find matching variant
    const match = variants.find((v: any) =>
      v.node.selectedOptions.every((so: any) => newOptions[so.name] === so.value)
    );
    if (match) setSelectedVariantId(match.node.id);
  };

  const selectedVariant = variants.find((v: any) => v.node.id === selectedVariantId)?.node;
  const displayPrice = selectedVariant ? parseFloat(selectedVariant.price.amount) : price;

  const handleAddToCart = async () => {
    if (!selectedVariantId || !selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariantId,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions,
    });
    openCart();
  };

  const allOptionsSelected = options.every((opt: any) => selectedOptions[opt.name]);

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
              src={images[selectedImage]?.node.url || "/placeholder.svg"}
              alt={images[selectedImage]?.node.altText || product.title}
              className="w-full h-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? 'border-accent' : 'border-transparent'
                  }`}
                >
                  <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <h1 className="font-heading text-3xl md:text-4xl font-bold">{product.title}</h1>
          <span className="font-heading text-2xl font-bold">{formatARS(displayPrice)}</span>

          <p className="font-body text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Options */}
          {options.map((option: any) => (
            <div key={option.name}>
              <h3 className="font-heading font-semibold mb-3">{option.name}</h3>
              <div className="flex flex-wrap gap-2">
                {option.values.map((value: string) => (
                  <button
                    key={value}
                    onClick={() => handleOptionChange(option.name, value)}
                    className={`px-4 py-2 text-sm rounded-lg border font-body transition-colors ${
                      selectedOptions[option.name] === value ? 'bg-accent text-accent-foreground border-accent' : 'hover:border-accent'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <Button
            onClick={handleAddToCart}
            disabled={!allOptionsSelected}
            className="w-full rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 py-6 text-base font-body font-semibold disabled:opacity-50"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Agregar al Carrito
          </Button>

          {!allOptionsSelected && (
            <p className="text-sm text-muted-foreground font-body text-center">Seleccioná todas las opciones</p>
          )}

          {/* Shipping */}
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

          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="description">
              <AccordionTrigger className="font-heading font-semibold">Descripción</AccordionTrigger>
              <AccordionContent className="font-body text-muted-foreground leading-relaxed">
                {product.description}
              </AccordionContent>
            </AccordionItem>
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
