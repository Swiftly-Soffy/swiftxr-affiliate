import { useState, useEffect, useRef } from "react";

import CataloguePage from "../../pages/CataloguePage";
import HeroSection from "./HeroSection";
import Footer from "../Footer/Footer";
import CategorySection from "./CategorySection";

import { getProductCategories } from "../../api";
import type { Category } from "../../pages/related/type";
import { Box } from "@mui/material";


function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const catalogueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getProductCategories().then((data) => {
      // only keep categories that have products
      const filtered = data.filter((c: Category) => c.products && c.products.length > 0);
      setCategories(filtered);
    });
  }, []);

  useEffect(() => {
    if (selectedCategory !== null && catalogueRef.current) {
      catalogueRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedCategory]);

  // Map category names to IDs for HeroSection
  const categoryMap: Record<string, number> = {};
  categories.forEach((c) => {
    categoryMap[c.name] = c.id;
  });

  return (
    <>
      <title>MarketPlace | SwiftXR</title>
      <meta
        name="description"
        content="SwiftXR Market Place"
      />
      <HeroSection onCategoryClick={(name: string) => {
        const id = categoryMap[name];
        if (id) setSelectedCategory(id);
      }} />
      <CategorySection
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={categories}
      />
      <Box ref={catalogueRef} id="catalogue">
        <CataloguePage
          selectedCategory={selectedCategory}
          categories={categories}
        />
      </Box>
      <Footer />
    </>
  );
}

export default Home;
