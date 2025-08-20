export interface Image {
  url: string;
  name: string;
}

export interface Product {
  id: number;
  Name: string;
  slug: string;
  StoreName: string;
  Image?: { url: string; name: string };
  Likes: number | null;
  Views: number | null;
  Description?: string;
  ExternalUrl?: string;
  SwiftXREmbed?: string;
}

export interface Icon {
  url: string;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string | null;
  Icon?: Icon;
  products: Product[];
}
