
-- Add CHECK constraint to enforce reasonable cart quantities
ALTER TABLE public.cart_items ADD CONSTRAINT quantity_reasonable CHECK (quantity > 0 AND quantity <= 999);

-- Drop existing INSERT and UPDATE policies to recreate with quantity checks
DROP POLICY IF EXISTS "Users can add to their own cart" ON public.cart_items;
DROP POLICY IF EXISTS "Users can update their own cart" ON public.cart_items;

-- Recreate INSERT policy with quantity validation
CREATE POLICY "Users can add to their own cart"
  ON public.cart_items FOR INSERT
  WITH CHECK (auth.uid() = user_id AND quantity > 0 AND quantity <= 999);

-- Recreate UPDATE policy with quantity validation
CREATE POLICY "Users can update their own cart"
  ON public.cart_items FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (quantity > 0 AND quantity <= 999);
