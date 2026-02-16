
-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Categories
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
  ON public.categories FOR SELECT
  USING (true);

-- Products
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  original_price NUMERIC(10,2),
  category_id UUID REFERENCES public.categories(id),
  images TEXT[] NOT NULL DEFAULT '{}',
  sizes TEXT[] NOT NULL DEFAULT '{}',
  colors TEXT[] NOT NULL DEFAULT '{}',
  care_instructions TEXT,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone"
  ON public.products FOR SELECT
  USING (true);

-- Cart items
CREATE TABLE public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  size TEXT,
  color TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own cart"
  ON public.cart_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to their own cart"
  ON public.cart_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart"
  ON public.cart_items FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete from their own cart"
  ON public.cart_items FOR DELETE
  USING (auth.uid() = user_id);

-- Updated at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed categories
INSERT INTO public.categories (name, slug) VALUES
  ('Camisetas', 'camisetas'),
  ('Pantalones', 'pantalones'),
  ('Chaquetas', 'chaquetas'),
  ('Accesorios', 'accesorios'),
  ('Vestidos', 'vestidos');

-- Seed products
INSERT INTO public.products (name, slug, description, price, original_price, category_id, images, sizes, colors, care_instructions, featured) VALUES
  ('Camiseta Urban Esencial', 'camiseta-urban-esencial', 'Camiseta de algodón orgánico con corte oversize. Perfecta para un look urbano y relajado.', 39.99, 49.99, (SELECT id FROM public.categories WHERE slug = 'camisetas'), ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600'], ARRAY['XS','S','M','L','XL'], ARRAY['Negro','Blanco','Gris'], 'Lavar a máquina a 30°C. No usar secadora. Planchar a temperatura baja.', true),
  ('Pantalón Cargo Street', 'pantalon-cargo-street', 'Pantalón cargo con bolsillos laterales y cintura ajustable. Tejido resistente y cómodo.', 69.99, NULL, (SELECT id FROM public.categories WHERE slug = 'pantalones'), ARRAY['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600'], ARRAY['S','M','L','XL'], ARRAY['Verde Oliva','Negro','Beige'], 'Lavar a máquina a 40°C. Se puede usar secadora a baja temperatura.', true),
  ('Chaqueta Bomber Vintage', 'chaqueta-bomber-vintage', 'Bomber jacket con acabado satinado y forro interior. Estilo retro con un toque moderno.', 129.99, 159.99, (SELECT id FROM public.categories WHERE slug = 'chaquetas'), ARRAY['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600'], ARRAY['S','M','L','XL'], ARRAY['Negro','Verde Militar','Burdeos'], 'Lavar en seco. No planchar directamente sobre el tejido.', true),
  ('Vestido Slip Elegante', 'vestido-slip-elegante', 'Vestido slip de satén con tirantes ajustables. Elegancia minimalista para cualquier ocasión.', 89.99, NULL, (SELECT id FROM public.categories WHERE slug = 'vestidos'), ARRAY['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600'], ARRAY['XS','S','M','L'], ARRAY['Negro','Champán','Rosa Empolvado'], 'Lavar a mano con agua fría. Colgar para secar.', true),
  ('Gorra Dad Hat Classic', 'gorra-dad-hat-classic', 'Gorra de algodón lavado con cierre ajustable. Un clásico que nunca pasa de moda.', 24.99, NULL, (SELECT id FROM public.categories WHERE slug = 'accesorios'), ARRAY['https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=600'], ARRAY['Única'], ARRAY['Negro','Beige','Azul Marino'], 'Lavar a mano. No retorcer. Secar al aire.', false),
  ('Hoodie Oversize Premium', 'hoodie-oversize-premium', 'Sudadera con capucha de algodón premium 400gsm. Corte oversize y acabado brushed interior.', 79.99, 99.99, (SELECT id FROM public.categories WHERE slug = 'camisetas'), ARRAY['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600'], ARRAY['S','M','L','XL','XXL'], ARRAY['Negro','Gris Melange','Crema'], 'Lavar del revés a 30°C. No usar lejía. Secar al aire.', true),
  ('Pantalón Wide Leg', 'pantalon-wide-leg', 'Pantalón de pierna ancha con cintura alta elástica. Silueta fluida y moderna.', 59.99, NULL, (SELECT id FROM public.categories WHERE slug = 'pantalones'), ARRAY['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600'], ARRAY['XS','S','M','L','XL'], ARRAY['Negro','Camel','Blanco Roto'], 'Lavar a máquina a 30°C. Planchar a temperatura media.', false),
  ('Collar Chain Dorado', 'collar-chain-dorado', 'Cadena de eslabones gruesos bañada en oro de 18k. El accesorio perfecto para elevar cualquier outfit.', 34.99, NULL, (SELECT id FROM public.categories WHERE slug = 'accesorios'), ARRAY['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600'], ARRAY['Única'], ARRAY['Dorado','Plateado'], 'Evitar contacto con agua y perfumes. Guardar en bolsa de tela.', false);
