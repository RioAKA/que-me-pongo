import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CartSlideOver = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCart();

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
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 rounded-lg bg-secondary/50">
                  {item.product?.images?.[0] && (
                    <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-body font-medium text-sm truncate">{item.product?.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.size} · {item.color}</p>
                    <p className="font-heading font-semibold text-sm mt-1">{item.product?.price?.toFixed(2)}€</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-md hover:bg-muted"><Minus className="h-3 w-3" /></button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-md hover:bg-muted"><Plus className="h-3 w-3" /></button>
                      <button onClick={() => removeItem(item.id)} className="ml-auto p-1 text-destructive hover:bg-destructive/10 rounded-md"><Trash2 className="h-3 w-3" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t p-6 space-y-4">
              <div className="flex justify-between font-heading text-lg font-semibold">
                <span>Total</span>
                <span>{totalPrice.toFixed(2)}€</span>
              </div>
              <Button className="w-full rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold" asChild>
                <Link to="/checkout" onClick={closeCart}>Finalizar Compra</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartSlideOver;
