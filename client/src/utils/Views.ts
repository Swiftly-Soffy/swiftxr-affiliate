const VIEWED_KEY = "viewed_products";

export function getViewedProducts(): string[] {
  const stored = localStorage.getItem(VIEWED_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function markProductAsViewed(productId: string): string[] {
  const viewed = getViewedProducts();
  if (!viewed.includes(productId)) {
    viewed.push(productId);
    localStorage.setItem(VIEWED_KEY, JSON.stringify(viewed));
  }
  return viewed;
}
