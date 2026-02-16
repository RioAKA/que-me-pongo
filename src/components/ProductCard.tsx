import { Link } from "react-router-dom";
import { Tables } from "@/integrations/supabase/types";

interface ProductCardProps {
  product: Tables<"products">;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const hasDiscount = product.original_price && product.original_price > product.price;

  return (
    <Link to={`/product/${product.slug}`} className="group block animate-fade-in">
      <div className="relative overflow-hidden rounded-lg bg-secondary/30 aspect-[3/4]">
        <img
          src={product.images?.[0] || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-lg">
            -{Math.round(((product.original_price! - product.price) / product.original_price!) * 100)}%
          </span>
        )}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300 rounded-lg shadow-sm group-hover:shadow-lg" />
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="font-body font-medium text-sm truncate">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="font-heading font-semibold">{product.price.toFixed(2)}€</span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">{product.original_price!.toFixed(2)}€</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
