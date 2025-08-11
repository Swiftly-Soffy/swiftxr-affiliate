import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductSlug } from "../api";
import { Box, Typography } from "@mui/material";

interface Product {
    id: number;
    Name: string;
    slug: string;
    Description?: string;
    ExternalUrl?: string;
    SwiftXREmbed?: string;
}

export default function ProductPage() {
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
        <Box component="section" sx={{ 
            padding: 10, 
            display: 'flex', 
            alignItems: 'center',
            gap: '40px',
            justifyContent: 'flex-start'
            }}>
            {product.SwiftXREmbed && (
                <Box flex={1} minWidth="300px" 
                dangerouslySetInnerHTML={{ __html: product.SwiftXREmbed }} />
            )}

            <Box flex={1}>
                <Typography variant="h3">
                    {product.Name}
                </Typography>
                <Typography component="p">
                    {product.Description}
                </Typography>

                {product.ExternalUrl && (
                    <a
                        href={product.ExternalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-block",
                            padding: "10px 20px",
                            background: 'linear-gradient(136.86deg, #BA21F8 -25.67%, #FF9B37 121.68%)',
                            color: "white",
                            textDecoration: "none",
                            marginTop: "20px",
                            borderRadius: 20
                        }}
                    >
                        View in Store
                    </a>
                )}
            </Box>
        </Box>
  );
}
