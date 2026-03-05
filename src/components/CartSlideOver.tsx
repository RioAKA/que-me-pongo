import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useShopifyCartStore } from "@/stores/shopifyCartStore";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { formatARS } from "@/lib/currency";
import PaymentIcons from "@/components/PaymentIcons";

const CartSlideOver = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getCheckoutUrl, isLoading } = useShopifyCartStore();

  const totalPrice = items.reduce((sum, i) => sum + parseFloat(i.price.amount) * i.quantity, 0);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, '_blank');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm" onClick={closeCart} />
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-card shadow-2xl animate-slide-in-right flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="font-heading text-xl font-semibold">Tu Carrito</h2>
          <button onClick={closeCart}><X className="h-5 w-5" /></button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <ShoppingBag className="h-16 w-16 opacity-30" />
            <p className="font-body">Tu carrito está vacío</p>
            <Button onClick={closeCart} variant="outline" className="rounded-lg" asChild>
              <Link to="/catalog">Explorar catálogo</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.map((item) => {
                const imageUrl = item.product.node.images.edges[0]?.node.url;
                return (
                  <div key={item.variantId} className="flex gap-4 p-3 rounded-lg bg-secondary/50">
                    {imageUrl && (
                      <img src={imageUrl} alt={item.product.node.title} className="w-20 h-20 object-cover rounded-lg" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-body font-medium text-sm truncate">{item.product.node.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {item.selectedOptions.map(o => o.value).join(' · ')}
                      </p>
                      <p className="font-heading font-semibold text-sm mt-1">{formatARS(parseFloat(item.price.amount))}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="p-1 rounded-md hover:bg-muted" disabled={isLoading}><Minus className="h-3 w-3" /></button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="p-1 rounded-md hover:bg-muted" disabled={isLoading}><Plus className="h-3 w-3" /></button>
                        <button onClick={() => removeItem(item.variantId)} className="ml-auto p-1 text-destructive hover:bg-destructive/10 rounded-md" disabled={isLoading}><Trash2 className="h-3 w-3" /></button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t p-6 space-y-4">
              <div className="flex justify-between font-heading text-lg font-semibold">
                <span>Total</span>
                <span>{formatARS(totalPrice)}</span>
              </div>
              <Button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold"
              >
                Finalizar Compra
              </Button>
              <div className="flex justify-center pt-2">
                <PaymentIcons />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartSlideOver;
