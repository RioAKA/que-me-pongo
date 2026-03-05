import { Link } from "react-router-dom";
import { ShopifyProduct } from "@/lib/shopify";
import { formatARS } from "@/lib/currency";

interface ShopifyProductCardProps {
  product: ShopifyProduct;
}

const ShopifyProductCard = ({ product }: ShopifyProductCardProps) => {
  const { node } = product;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const imageUrl = node.images.edges[0]?.node.url || "/placeholder.svg";
  const altText = node.images.edges[0]?.node.altText || node.title;

  return (
    <Link to={`/product/${node.handle}`} className="group block animate-fade-in">
      <div className="relative overflow-hidden rounded-lg bg-secondary/30 aspect-[3/4]">
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300 rounded-lg shadow-sm group-hover:shadow-lg" />
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="font-body font-medium text-sm truncate">{node.title}</h3>
        <span className="font-heading font-semibold">{formatARS(price)}</span>
      </div>
    </Link>
  );
};

export default ShopifyProductCard;
