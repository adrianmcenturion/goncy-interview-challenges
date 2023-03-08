export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

export type Sort = "alphabetical" | "price";

export type PersistedData = {
  order: string;
  query: string;
};
