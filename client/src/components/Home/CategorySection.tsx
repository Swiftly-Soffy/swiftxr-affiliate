import { useEffect, useState, useRef } from "react";
import { Box, Typography, Stack, IconButton } from "@mui/material";
import { getCategories } from "../../api";
import { useResponsiveViewContext } from "../providers";

import Iconify from "../Iconify/iconify";


interface Icon {
    url: string;
    name: string;
}

interface Product {
    id: number;
}

interface Category {
    id: number;
    name: string;
    Icon?: Icon;
    products: Product[];
}

type Props = {
    selectedCategory: number | null;
    onSelectCategory: (category: number | null) => void;
    categories: Category[];
};


export default function CategorySection({ selectedCategory, onSelectCategory, }: Props) {
    const { isMobile } = useResponsiveViewContext();

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories().then((data) => {
            // only categories with products is visible
            const filtered = data.filter((cat: Category) => cat.products?.length > 0);
            setCategories(filtered);
        });
    }, []);

    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === "left" ? -200 : 200,
                behavior: "smooth",
            });
        }
    };

    return (
        <Stack direction="column" component="section" spacing={0.4} textAlign="center">
            <Stack
                ref={scrollRef}
                direction="row"
                spacing={2}
                p={1}
                sx={{
                    overflowX: "auto",
                    scrollBehavior: "smooth",
                    "&::-webkit-scrollbar": { display: "none" },
                }}
            >
                {/* "All" category */}
                <Stack
                    alignItems="center"
                    spacing={1}
                    justifyContent="center"
                    onClick={() => onSelectCategory(null)}
                    sx={{
                        cursor: "pointer",
                        borderRadius: 1,
                        p: 2,
                        border: "1px solid",
                        borderColor: "grey.200",
                        background:
                            selectedCategory === null
                                ? "linear-gradient(136.86deg, #BA21F8 -25.67%, #FF9B37 121.68%)"
                                : "transparent",
                        transition: "0.3s",
                        minWidth: isMobile ? 100 : 140,
                        color: selectedCategory === null ? 'text.neutral' : 'text.primary', 
                    }}
                >
                    <Iconify icon="teenyicons:menu-outline" sx={{ height: 40 }} />
                    <Typography fontWeight={400} color={selectedCategory === null ? "text.neutral" : "text.primary"}>
                        All
                    </Typography>
                </Stack>

                {/* Other categories */}
                {categories.map((cat) => (
                    <Stack
                        key={cat.id}
                        alignItems="center"
                        justifyContent="center"
                        spacing={1}
                        onClick={() => onSelectCategory(cat.id)}
                        sx={{
                            cursor: "pointer",
                            borderRadius: 1,
                            p: 1,
                            border: "1px solid",
                            borderColor: "grey.200",
                            background:
                                selectedCategory === cat.id
                                    ? "linear-gradient(136.86deg, #BA21F8 -25.67%, #FF9B37 121.68%)"
                                    : "transparent",
                            transition: "0.3s",
                            minWidth: isMobile ? 100 : 140,
                        }}
                    >
                        {cat.Icon?.url ? (
                            <img
                                src={`${import.meta.env.VITE_API_URL}${cat.Icon.url}`}
                                alt={cat.Icon.name}
                                style={{ width: 40, height: 40, objectFit: "contain"}}
                            />
                        ) : (
                            <Box sx={{ width: 40, height: 40, bgcolor: "grey.300", borderRadius: "50%" }} />
                        )}
                        <Typography fontWeight={600}>{cat.name}</Typography>
                    </Stack>
                ))}
            </Stack>

            {/* Arrows */}
            <Stack direction="row" justifyContent="center">
                <IconButton onClick={() => scroll("left")}>
                    <Iconify icon="akar-icons:arrow-left" sx={{ width: 28, height: 24 }}  />
                </IconButton>
                <IconButton onClick={() => scroll("right")}>
                    <Iconify icon="akar-icons:arrow-right" sx={{ width: 28, height: 24 }} />
                </IconButton>
            </Stack>
        </Stack>
    );
}
