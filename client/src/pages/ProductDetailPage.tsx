import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ProductCard } from "./CataloguePage";
import { Box, Typography, Stack, Button, Grid } from "@mui/material";

import { getProductSlug, getCategories, getProductCategories } from "../api";
import type { Product, Category } from "./related/type";
import Iconify from "../components/Iconify/iconify";
import { useResponsiveViewContext } from "../components/providers";
import { getLikedProducts, toggleLikedProduct } from "../utils/Likes";
import SectionHeader from "../components/Global/SectionHeader";

const apiUrl = import.meta.env.VITE_API_URL;

export default function ProductDetailPage() {
    const { isMobile } = useResponsiveViewContext();

    const { slug } = useParams<{ slug: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getProductCategories().then((data) => {
            const filtered = data.filter(
                (c: Category) => c.products && c.products.length > 0
            );
            setCategories(filtered);
        });
    }, []);

    const [liked, setLiked] = useState(false);

    const [related, setRelated] = useState<Product[]>([]);

    //Handle Product
    useEffect(() => {
        if (slug) {
            getProductSlug(slug).then((data) => {

                setProduct(data as Product);
            });
        }
    }, [slug]);

    //Sync Likes
    useEffect(() => {
        if (product) {
            setLiked(getLikedProducts().includes(product.documentId));
        }
    }, [product]);

    const handleLikeClick = async () => {
        if (!product) return;

        const updated = toggleLikedProduct(product.documentId);
        setLiked(updated.includes(product.documentId));

        const newLikes = liked
            ? Math.max((product.Likes ?? 0) - 1, 0)
            : (product.Likes ?? 0) + 1;

        await axios.put(`${apiUrl}/api/products/${product.documentId}`, {
            data: { Likes: newLikes },
        });

        setProduct({ ...product, Likes: newLikes });
    };

    //Get related products
    useEffect(() => {
        if (!product) return;

        getCategories()
            .then((categories: Category[]) => {
                const category = categories.find((cat: Category) =>
                    cat.products.some((p: Product) => p.id === product.id)
                );

                if (category) {
                    const relatedProducts = category.products.filter((p: Product) => p.id !== product.id);
                    setRelated(relatedProducts);
                }
            })
            .catch(console.error);

    }, [product]);

    const category =
        product &&
        categories.find((c) => c.products.some((p) => p.id === product.id));

    if (!product) return <p>Loading...</p>;

    return (
        <Stack component='section'  sx={{rowGap: "20px"}}>
            {product && category && (
                <SectionHeader
                    route={[
                        { label: "Home", path: "/" },
                        {
                            label: category.name,
                            path: `/?category=${encodeURIComponent(category.name)}`,
                        },
                        { label: product.Name, path: `/products/${product.id}` },
                    ]}
                />
            )}

            <Stack spacing={2}
                sx={{
                    width: 1,
                    height: 1,
                }}>

                {/* Product Embed */}
                {product.SwiftXREmbed && /<iframe|<embed/.test(product.SwiftXREmbed) ? (
                    <Box
                        flex={1}
                        width='100%'
                        bgcolor='background.neutral'
                        borderRadius={2}
                        height={400}
                        overflow="hidden"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        dangerouslySetInnerHTML={{ __html: product.SwiftXREmbed }}
                        sx={{
                            '& iframe, & embed': {
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                border: 0,
                            },
                        }}
                    />
                ) : product.Image ? (
                    <Box
                        flex={1}
                        width='100%'
                        minHeight={300}
                        bgcolor='background.neutral'
                        borderRadius={2}
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        overflow='hidden'
                        padding={2}
                    >
                        <img
                            src={`${apiUrl}${product.Image.url}`}
                            alt={product.Image.name}
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        />
                    </Box>
                ) : null}

                {/* Product Details */}
                <Stack bgcolor='background.neutral' width='100%' borderRadius={2} alignItems='center' py={3} px={2} textAlign='center'>
                    <Stack direction="row" spacing={1}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Typography
                            fontSize={10}
                            color='text.primary'
                            fontWeight={700}
                            sx={{
                                textDecoration: 'none',
                                bgcolor: 'background.paper',
                                color: '#FF3D8A',
                                borderRadius: 10,
                                px: 4,
                                py: 0.7,
                                width: 'fit-content'
                            }}
                        >
                            By {product.StoreName}
                        </Typography>

                        <Box display="flex" position="relative" alignItems="center" justifyContent="center">
                            <Box
                                bgcolor="background.neutral"
                                p={1}
                                borderRadius="50%"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: 1,
                                    borderColor: 'grey.300',
                                    width: 30,
                                    height: 30
                                }}
                            >
                                <Iconify icon='ion:heart'
                                    sx={{
                                        color: '#E21B1B',
                                        width: '5px',
                                        height: '5px',
                                        left: 5.5,
                                        top: 6,
                                        position: 'absolute',

                                    }} />
                            </Box>

                            <Box
                                bgcolor='background.neutral'
                                p={1}
                                borderRadius='50%'
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: 1,
                                    borderColor: 'grey.300',
                                    width: 30,
                                    height: 30,
                                    position: 'absolute',
                                    left: 25
                                }}
                            >
                                <Iconify icon='lets-icons:eye-duotone'
                                    sx={{
                                        width: '2px',
                                        height: '2px',
                                        right: 22,
                                        top: 5,
                                        position: 'absolute',
                                    }} />
                            </Box>
                        </Box>

                        <Typography pl={4} fontSize={14} fontWeight={600} color='grey.500'>
                            ({product.Likes ?? 0} || {product.Views ?? 0})
                        </Typography>
                    </Stack>

                    <Typography fontWeight={500} fontSize={isMobile ? 22 : 32} py={isMobile ? 1 : 'auto'} color='text.secondary'>
                        {product.Name}
                    </Typography>

                    <Typography fontWeight={400} fontSize={isMobile ? 12 : 14} width={isMobile ? '100%' : '70%'} color='text.primary'>
                        {product.Description}
                    </Typography>

                    <Box display='flex' flexDirection='row' alignItems='flex-end' justifyContent='center' gap={isMobile ? 1 : 2}>
                        {product.ExternalUrl && (
                            <Button
                                component="a"
                                href={product.ExternalUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                                sx={{
                                    backgroundColor: '#0084E3',
                                    color: 'text.neutral',
                                    textDecoration: 'none',
                                    mt: 2,
                                    borderRadius: 2,
                                    px: isMobile ? 2 : 15,
                                    py: 1.5,
                                    "&:hover": {
                                        bgcolor: '#006bbf',
                                        color: 'text.neutral'
                                    },
                                }}
                            >
                                Buy Now
                            </Button>
                        )}
                        <Box
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            sx={{
                                bgcolor: 'background.default',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                p: 1,
                                cursor: 'pointer',
                            }}
                        >
                            <Iconify
                                icon={liked ? 'streamline-flex:heart-solid' : 'gridicons:heart-outline'}
                                onClick={handleLikeClick}
                                width={28}
                                sx={{
                                    cursor: 'pointer',
                                    color: liked ? '#E21B1B' : 'text.neutral',
                                }}
                            />
                        </Box>

                    </Box>
                </Stack>
            </Stack>

            {/* Related Product */}
            <Box display='flex' alignItems='center' gap={isMobile ? 3 : 6} width='100%' pt={15}>
                <Box flex={1} borderTop='2px solid' borderColor='divider' position='relative'>
                    <Box
                        sx={{
                            position: 'absolute',
                            right: -5,
                            top: -4,
                            width: 6,
                            height: 6,
                            bgcolor: 'divider',
                            borderRadius: '50%',
                        }}
                    />
                </Box>

                <Typography fontSize={isMobile ? 25 : 47} fontWeight={700} color='text.primary'>
                    Related Products
                </Typography>

                <Box flex={1} borderTop='2px solid' borderColor='divider' position='relative'>
                    <Box
                        sx={{
                            position: 'absolute',
                            left: -5,
                            top: -4,
                            width: 6,
                            height: 6,
                            bgcolor: 'divider',
                            borderRadius: '50%',
                        }}
                    />
                </Box>
            </Box>

            <Grid container spacing={1} sx={{ width: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>
                {related.length > 0 ? (
                    related.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <Typography
                        fontSize={20}
                        color='text.secondary'
                        sx={{ textAlign: 'center', width: '100%', mt: 5 }}
                    >
                        No related Product
                    </Typography>
                )}
            </Grid>
        </Stack>
    );
}
