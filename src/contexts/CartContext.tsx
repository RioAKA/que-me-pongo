import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { Tables } from "@/integrations/supabase/types";
import { toast } from "sonner";

type CartItem = Tables<"cart_items"> & {
  product?: Tables<"products">;
};

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  loading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (productId: string, size: string, color: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!user) { setItems([]); return; }
    setLoading(true);
    const { data } = await supabase
      .from("cart_items")
      .select("*, product:products(*)")
      .eq("user_id", user.id);
    setItems((data as CartItem[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchCart(); }, [user]);

  const addItem = async (productId: string, size: string, color: string) => {
    if (!user) { toast.error("Inicia sesión para añadir al carrito"); return; }
    const existing = items.find(i => i.product_id === productId && i.size === size && i.color === color);
    if (existing) {
      await updateQuantity(existing.id, existing.quantity + 1);
    } else {
      await supabase.from("cart_items").insert({ user_id: user.id, product_id: productId, size, color, quantity: 1 });
      await fetchCart();
    }
    setIsOpen(true);
    toast.success("Añadido al carrito");
  };

  const removeItem = async (id: string) => {
    await supabase.from("cart_items").delete().eq("id", id);
    await fetchCart();
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) { await removeItem(id); return; }
    await supabase.from("cart_items").update({ quantity }).eq("id", id);
    await fetchCart();
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + (i.product?.price || 0) * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, isOpen, loading, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false), addItem, removeItem, updateQuantity, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
