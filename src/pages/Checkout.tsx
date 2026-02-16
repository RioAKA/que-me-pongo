import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { items, totalPrice } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-muted-foreground font-body mb-6">Inicia sesión para continuar</p>
        <Button asChild className="rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 font-body">
          <Link to="/auth">Iniciar Sesión</Link>
        </Button>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-3xl font-bold mb-4">Tu carrito está vacío</h1>
        <Button asChild variant="outline" className="rounded-lg font-body">
          <Link to="/catalog">Explorar catálogo</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="font-heading text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="font-heading text-xl font-semibold">Datos de Envío</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-body">Nombre</Label>
                <Input className="rounded-lg mt-1" placeholder="Nombre" />
              </div>
              <div>
                <Label className="font-body">Apellidos</Label>
                <Input className="rounded-lg mt-1" placeholder="Apellidos" />
              </div>
            </div>
            <div>
              <Label className="font-body">Dirección</Label>
              <Input className="rounded-lg mt-1" placeholder="Calle, número, piso" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="font-body">C.P.</Label>
                <Input className="rounded-lg mt-1" placeholder="28001" />
              </div>
              <div>
                <Label className="font-body">Ciudad</Label>
                <Input className="rounded-lg mt-1" placeholder="Madrid" />
              </div>
              <div>
                <Label className="font-body">Teléfono</Label>
                <Input className="rounded-lg mt-1" placeholder="+34..." />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-secondary/50 rounded-lg p-6 space-y-4 h-fit">
          <h2 className="font-heading text-xl font-semibold">Resumen</h2>
          {items.map(item => (
            <div key={item.id} className="flex justify-between text-sm font-body">
              <span>{item.product?.name} × {item.quantity}</span>
              <span>{((item.product?.price || 0) * item.quantity).toFixed(2)}€</span>
            </div>
          ))}
          <div className="border-t pt-4 flex justify-between font-heading text-lg font-bold">
            <span>Total</span>
            <span>{totalPrice.toFixed(2)}€</span>
          </div>
          <Button className="w-full rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold py-5">
            Confirmar Pedido
          </Button>
          <p className="text-xs text-muted-foreground text-center font-body">Demo — no se procesará ningún pago</p>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
