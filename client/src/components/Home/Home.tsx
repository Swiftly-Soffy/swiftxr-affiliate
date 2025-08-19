import { useState, useEffect } from "react";

import CataloguePage from "../../pages/CataloguePage";
import HeroSection from "./HeroSection";
import Footer from "../Footer/Footer";
import CategorySection from "./CategorySection";

import { getProductCategories } from "../../api";
import type { Category } from "../../pages/related/type";

function Home() {
const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    getProductCategories().then((data) => {
      // only keep categories that have products
      const filtered = data.filter((c: Category) => c.products && c.products.length > 0);
      setCategories(filtered);
    });
  }, []);
  return (
    <>
      <title>MarketPlace | SwiftXR</title>
      <meta
        name="description"
        content="SwiftXR Market Place"
      />
      <HeroSection />
      <CategorySection
      selectedCategory={selectedCategory}
      onSelectCategory={setSelectedCategory}
      categories={categories}
    />
    <CataloguePage
      selectedCategory={selectedCategory}
      categories={categories}
    />
      <Footer />
    </>
  );
}

export default Home;
