import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductSlug } from "../api";
import { Box, Typography, Stack, Button } from "@mui/material";
import Iconify from "../components/Iconify/iconify";
import type { Product } from "./related/type";

export default function ProductDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [viewsCount, setViewsCount] = useState(0);

    useEffect(() => {
        if (slug) {
            getProductSlug(slug).then((data) => {
                if (!data) return;
                setProduct(data as Product);
                setLikesCount(data.Likes ?? 0);
                setViewsCount(data.Views ?? 0);
                setLiked((data.UserHasLiked ?? false)); // optional if you track per-user like
            });
        }
    }, [slug]);


    useEffect(() => {
        if (product) {
            const incrementViews = async () => {
                try {
                    const newViews = (viewsCount ?? 0) + 1;
                    setViewsCount(newViews);
                } catch (err) {
                    console.error("Failed to increment views:", err);
                }
            };
            incrementViews();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product]);

    const handleLikes = async () => {
        if (!product) return;
        const newLikes = liked ? Math.max(likesCount - 1, 0) : likesCount + 1;
        setLikesCount(newLikes);
        setLiked(!liked);

    };

    if (!product) return <p>Loading...</p>;

    return (
        <Stack component="section" direction="column"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'background.default',
                textAlign: 'center',
                pb: 0,
                py: 8
            }}>
            {product.SwiftXREmbed && (
                <Box flex={1} width="100%" bgcolor={'background.default'} borderRadius={2}
                    dangerouslySetInnerHTML={{ __html: product.SwiftXREmbed }} />
            )}

            <Stack bgcolor="background.neutral" width="100%" py={5} mt={-8} borderRadius={2} spacing={1}>

                <Stack direction="row" spacing={1}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <Typography
                        fontSize={10}
                        color="text.primary"
                        fontWeight={700}
                        sx={{
                            textDecoration: "none",
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
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: 1,
                                borderColor: "grey.300",
                                width: 30, 
                                height: 30
                            }}
                        >
                            <Iconify icon="ion:heart"
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
                            bgcolor="background.neutral"
                            p={1}
                            borderRadius="50%"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: 1,
                                borderColor: "grey.300",
                                width: 30,
                                height: 30,
                                position: 'absolute',
                                left: 25
                            }}
                        >
                            <Iconify icon="lets-icons:eye-duotone"
                                sx={{
                                    width: '2px',
                                    height: '2px',
                                    right: 22,
                                    top: 5,
                                    position: 'absolute',
                                }} />
                        </Box>
                    </Box>
                    <Typography pl={4} fontSize={14} fontWeight={600} color="grey.500">(88 || 44k)</Typography>
                </Stack>

                <Typography fontWeight={500} fontSize={32} color="text.secondary">
                    {product.Name}
                </Typography>

                <Typography fontWeight={400} fontSize={14} px={10} color="text.primary">
                    {product.Description}
                </Typography>

                <Box display="flex" flexDirection="row" alignItems="flex-end" justifyContent="center" gap={2}>
                    {product.ExternalUrl && (
                        <Button
                            component="a"
                            href={product.ExternalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                backgroundColor: "#0084E3",
                                color: "text.neutral",
                                textDecoration: "none",
                                mt: 2,
                                borderRadius: 2,
                                px: 15,
                                py: 1.5,
                                "&:hover": {
                                    bgcolor: 'text.secondary',
                                    color: 'text.neutral'
                                },
                            }}
                        >
                            Buy Now
                        </Button>
                    )}
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            bgcolor: "background.default",
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                            p: 1.5,
                            cursor: "pointer",
                        }}
                    >
                        <Iconify
                            icon={liked ? "ion:heart" : "famicons:heart-outline"}
                            onClick={handleLikes}
                            sx={{
                                cursor: "pointer",
                                color: liked ? "#E21B1B" : "text.neutral",
                            }}
                        />
                    </Box>

                </Box>
            </Stack>

            {/* Related Product */}
            <Box display="flex" alignItems="center" gap={6} width="100%" pt={15}>
                <Box flex={1} borderTop="2px solid" borderColor="divider" position="relative">
                    <Box
                        sx={{
                            position: "absolute",
                            right: -5,
                            top: -4,
                            width: 6,
                            height: 6,
                            bgcolor: "divider",
                            borderRadius: "50%",
                        }}
                    />
                </Box>

                <Typography fontSize={47} fontWeight={700} color="text.primary">
                    Related Products
                </Typography>

                <Box flex={1} borderTop="2px solid" borderColor="divider" position="relative">
                    <Box
                        sx={{
                            position: "absolute",
                            left: -5,
                            top: -4,
                            width: 6,
                            height: 6,
                            bgcolor: "divider",
                            borderRadius: "50%",
                        }}
                    />
                </Box>
            </Box>
        </Stack>
    );
}
