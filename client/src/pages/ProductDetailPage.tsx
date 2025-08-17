import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductSlug } from "../api";
import { Box, Typography, Stack, Button } from "@mui/material";
import Iconify from "../components/Iconify/iconify";

interface Product {
    id: number;
    Name: string;
    slug: string;
    Description?: string;
    ExternalUrl?: string;
    SwiftXREmbed?: string;
}

export default function ProductDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (slug) {
            getProductSlug(slug).then((data) => {
                setProduct(data as Product);
            });
        }
    }, [slug]);
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

            <Box flex={1} bgcolor="background.paper" width="100%" py={5} mt={-8} borderRadius={2}>
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
                            p: 1,
                            cursor: "pointer",
                        }}
                    >
                        <Iconify icon="ion:heart-outline" sx={{ width: 30, height: 30, color: "text.primary" }} />
                    </Box>
                </Box>
            </Box>

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
