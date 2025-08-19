import { useEffect, useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
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
    const [categories, setCategories] = useState<Category[]>([]);
    const { isMobile } = useResponsiveViewContext();

    useEffect(() => {
        getCategories().then((data) => {
            // only categories with products is visible
            const filtered = data.filter((cat: Category) => cat.products?.length > 0);
            setCategories(filtered);
        });
    }, []);

    return (
        <Stack direction="row" component="section" spacing={3} p={4} justifyContent="center" flexWrap="wrap">
            <Stack
                alignItems="center"
                spacing={1}
                onClick={() => onSelectCategory(null)}
                sx={{
                    cursor: "pointer",
                    borderRadius: 1,
                    p: 2,
                    border: '1px solid',
                    borderColor: 'grey.200',
                    background:
                        selectedCategory === null
                            ? "linear-gradient(136.86deg, #BA21F8 -25.67%, #FF9B37 121.68%)"
                            : "transparent",
                    transition: "0.3s",
                    minWidth: isMobile ? 80 : 120,
                }}
            >
                <Iconify icon="teenyicons:menu-outline" sx={{ width: 40, height: 40, color: 'text.neutral', paddingBottom: '10px' }} />
                <Typography fontWeight={400} color={selectedCategory === null ? "white" : "text.primary"}>All</Typography>
            </Stack>

            {/* other categories */}
            {categories.map((cat) => (
                <Stack
                    key={cat.id}
                    alignItems="center"
                    spacing={1}
                    onClick={() => onSelectCategory(cat.id)} // 
                    sx={{
                        cursor: "pointer",
                        borderRadius: 1,
                        p: 2,
                        border: '1px solid',
                        borderColor: 'grey.200',
                        background:
                            selectedCategory === cat.id
                                ? "linear-gradient(136.86deg, #BA21F8 -25.67%, #FF9B37 121.68%)"
                                : "transparent",
                        transition: "0.3s",
                        minWidth: isMobile ? 80 : 120,
                    }}
                >
                    {cat.Icon?.url ? (
                        <img
                            src={`${import.meta.env.VITE_API_URL}${cat.Icon.url}`}
                            alt={cat.Icon.name}
                            style={{ width: 40, height: 40, objectFit: "contain", paddingBottom: 10 }}
                        />
                    ) : (
                        <Box sx={{ width: 40, height: 40, bgcolor: "grey.300", borderRadius: "50%" }} />
                    )}
                    <Typography fontWeight={600}>{cat.name}</Typography>
                </Stack>
            ))}

        </Stack>
    );
}
