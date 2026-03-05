import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, STOREFRONT_PRODUCT_BY_HANDLE_QUERY, ShopifyProduct } from "@/lib/shopify";

const COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: { url: string; altText: string | null } | null;
}

export function useShopifyProducts(first = 50, searchQuery?: string) {
  return useQuery({
    queryKey: ["shopify-products", first, searchQuery],
    queryFn: async () => {
      const variables: Record<string, unknown> = { first };
      if (searchQuery) variables.query = searchQuery;
      const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, variables);
      return (data?.data?.products?.edges as ShopifyProduct[]) || [];
    },
  });
}

export function useShopifyProductByHandle(handle: string | undefined) {
  return useQuery({
    queryKey: ["shopify-product", handle],
    queryFn: async () => {
      const data = await storefrontApiRequest(STOREFRONT_PRODUCT_BY_HANDLE_QUERY, { handle });
      return data?.data?.product || null;
    },
    enabled: !!handle,
  });
}

export function useShopifyCollections(first = 20) {
  return useQuery({
    queryKey: ["shopify-collections", first],
    queryFn: async () => {
      const data = await storefrontApiRequest(COLLECTIONS_QUERY, { first });
      const edges = data?.data?.collections?.edges || [];
      return edges.map((e: { node: ShopifyCollection }) => e.node);
    },
  });
}
