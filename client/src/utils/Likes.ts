export const getLikedProducts = (): string[] => {
  return JSON.parse(localStorage.getItem("likedProducts") || "[]");
};

export const toggleLikedProduct = (id: string) => {
  const liked = getLikedProducts();
  let updated;

  if (liked.includes(id)) {
    updated = liked.filter((pid) => pid !== id);
  } else {
    updated = [...liked, id];
  }

  localStorage.setItem("likedProducts", JSON.stringify(updated));
  return updated;
};
