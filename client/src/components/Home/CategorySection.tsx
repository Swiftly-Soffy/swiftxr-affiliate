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

    {/* Carousel Arrow */ }
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -200 : 200,
                behavior: 'smooth',
            });
        }
    };

    return (
        <Stack direction='column' component='section' spacing={0.4} textAlign='center' mt={isMobile ? -1: 'auto'}>
            <Stack
                ref={scrollRef}
                direction='row'
                spacing={3}
                p={1}
                sx={{
                    overflowX: 'auto',
                    scrollBehavior: 'smooth',
                    '&::-webkit-scrollbar': { display: 'none'},
                }}
            >
                {/* "All" category */}
                <Stack
                    alignItems='center'
                    spacing={1}
                    justifyContent='center'
                    onClick={() => onSelectCategory(null)}
                    sx={{
                        flex: isMobile ? '0 0 18%' : '0 0 17%',
                        cursor: 'pointer',
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'grey.200',
                        background:
                            selectedCategory === null
                                ? 'linear-gradient(136.86deg, #BA21F8 -25.67%, #FF9B37 121.68%)'
                                : 'transparent',
                        transition: '0.3s',
                        minWidth: isMobile ? 90 : 70,
                        color: selectedCategory === null ? 'text.neutral' : 'text.primary',
                        height: isMobile ? 80 : 150,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: isMobile ? 0 : 1,
                        p: isMobile ? 5 : 0
                    }}
                >
                    <Iconify icon='teenyicons:menu-outline' width={isMobile ? 20 : 40} />
                    <Typography fontWeight={400} color={selectedCategory === null ? 'text.neutral' : 'text.primary'}>
                        All
                    </Typography>
                </Stack>

                {categories.map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    return (
                        <Stack
                            key={cat.id}
                            alignItems='center'
                            justifyContent='center'
                            spacing={1}
                            onClick={() => onSelectCategory(cat.id)}
                            sx={{
                                cursor: 'pointer',
                                borderRadius: 1,
                                border: '1px solid',
                                borderColor: isActive ? 'transparent' : 'grey.300',
                                background: isActive
                                    ? 'linear-gradient(136.86deg, #BA21F8 -25.67%, #FF9B37 121.68%)'
                                    : 'transparent',
                                transition: '0.3s',
                                flex: isMobile ? '0 0 18%' : '0 0 17%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: isMobile ? 80 : 150,
                                minWidth: isMobile ? 90 : 70,
                                p: isMobile ? 5 : 0
                            }}
                        >
                            {cat.Icon?.url ? (
                                <img
                                    src={`${import.meta.env.VITE_API_URL}${cat.Icon.url}`}
                                    alt={cat.Icon.name}
                                    style={{
                                        width: isMobile ? 30 : 60,
                                        height: isMobile ? 30 : 60,
                                        objectFit: 'contain',
                                        filter: isActive ? 'brightness(0) invert(1)' : 'none',
                                    }}
                                />
                            ) : (
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: '50%',
                                    }}
                                />
                            )}
                            <Typography
                                fontWeight={isMobile ? 400 : 600}
                                sx={{ color: isActive ? 'text.neutral' : 'text.primary' }}
                            >
                                {cat.name}
                            </Typography>
                        </Stack>
                    );
                })}

            </Stack>

            {/* Arrows */}
            <Stack direction='row' justifyContent='center' gap={2} color='text.primary'>
                <IconButton
                    onClick={() => scroll('left')}
                    sx={{
                        bgcolor: 'background.neutral',
                        '&:hover': { bgcolor: 'background.paper' },
                        borderRadius: '50%'
                    }}
                >
                    <Iconify
                        icon='akar-icons:arrow-left'
                        sx={{ width: 28, height: 24 }}
                    />
                </IconButton>

                <IconButton
                    onClick={() => scroll('right')}
                    sx={{
                        bgcolor: 'background.neutral',
                        '&:hover': { bgcolor: 'background.paper' },
                        borderRadius: '50%',
                    }}
                >
                    <Iconify
                        icon='akar-icons:arrow-right'
                        sx={{ width: 28, height: 24 }}
                    />
                </IconButton>
            </Stack>

        </Stack>
    );
}
