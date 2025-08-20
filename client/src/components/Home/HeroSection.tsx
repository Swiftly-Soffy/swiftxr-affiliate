import { useState, useEffect } from "react";
import { Box, Typography, Button, keyframes, Slide } from "@mui/material";
import { useResponsiveViewContext } from "../providers";

import phone from "../../assets/slide1.png"
import chair from "../../assets/slide2.png"
import shoe from "../../assets/slide3.png"
import refrig from "../../assets/slide4.png"

type Slide = {
    title: string;
    description: string;
    image: string;
    buttonText: string;
};

const slides: Slide[] = [
    {
        title: "Tech You Can Touch",
        description: "Experience the latest gadgets like never before—spin, zoom, and see every detail before you buy.",
        image: phone,
        buttonText: "Gadgets",
    },
    {
        title: "Design That Fits Your Space",
        description: "Place our furniture in your living room with one tap. Make sure it’s perfect—before it arrives.",
        image: chair,
        buttonText: "Furniture",
    },
    {
        title: "Style You Can Try On",
        description: "See how it looks on you instantly—our virtual try-on makes shopping effortless",
        image: shoe,
        buttonText: "Fashion",
    },
    {
        title: "Smarter Living, In Your Hands",
        description: "Preview appliances in your kitchen or laundry room—make sure they fit your style and space perfectly.",
        image: refrig,
        buttonText: "Home Appliances",
    }
];

const slideInOut = keyframes`
0% {
    opacity: 0;
    transform: translateX(30%);
  }
  15% {
    opacity: 1;
    transform: translateX(0);
  }
  85% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-30%);
  }
`;

interface HeroSectionProps {
    onCategoryClick: (categoryName: string) => void;
}

function HeroSection({ onCategoryClick }: HeroSectionProps) {
    const { isMobile } = useResponsiveViewContext();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Box component={'section'}
            sx={{
                backgroundPosition: 'left',
                bgcolor: "background.neutral",
                backgroundImage: `linear-gradient(to right, rgba(255, 182, 193, 0.20) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255, 182, 193, 0.20) 1px, transparent 1px)`,
                backgroundSize: "50px 30px",
                color: "text.primary",
                overflow: "hidden",
                width: 1,
                height: isMobile ? '400px' : '500px',
                position: 'relative',
            }}>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: isMobile ? 'center' : 'auto',
                }}>
                {/* Title */}
                <Typography fontWeight={700} fontSize={isMobile ? 32 : 60} mt={isMobile ? 8 : -2} >
                    {slides[index].title}
                </Typography>

                {/* Description */}
                <Typography fontWeight={400} fontSize={isMobile ? 14 : 22} width={isMobile ? '90%' : '40%'} textAlign={'center'}>
                    {slides[index].description}
                </Typography>

                {/* Bullet */}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                    {slides.map((_, i) => (
                        <Box
                            key={i}
                            onClick={() => setIndex(i)}
                            sx={{ mx: 0.4, cursor: "pointer", flexShrink: 0 }}
                        >
                            <svg width="20" height="20">
                                <circle
                                    cx="10"
                                    cy="10"
                                    r="8"
                                    fill="transparent"
                                    stroke={i === index ? "url(#grad)" : "#FFE7EF"}
                                    strokeWidth="3"
                                />
                                {i === index && (
                                    <defs>
                                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#e47094" />
                                            <stop offset="40%" stopColor="#c257c4" />
                                            <stop offset="100%" stopColor="#0084e3" />
                                        </linearGradient>
                                    </defs>
                                )}
                            </svg>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Carousel Container */}
            <Box
                sx={{
                    position: "relative",
                    height: isMobile ? '200px' : '400px',
                    overflow: "hidden",
                    mt: isMobile ? 'auto ' : -10,
                }}>
                {/* Carousel Images */}
                {slides.map((slide, i) => (
                    <Box
                        key={i}
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: '150%',
                            display: i === index ? "flex" : "none",
                            justifyContent: "center",
                            alignItems: "center",
                            animation: `${slideInOut} 8s ease forwards`,
                        }}
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            style={{
                                width: '80%',
                                height: 'auto',
                                maxHeight: '90%',
                                objectFit: "contain",
                                display: "block",
                            }}
                        />
                    </Box>
                ))}

                <Button
                    onClick={() => onCategoryClick(slides[index].buttonText)}
                    variant="contained"
                    sx={{
                        position: "absolute",
                        top: isMobile ? '60%' : '65%',
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "rgba(128, 128, 128, 0.25)",
                        color: "text.primary",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        borderRadius: isMobile ? 3 : 5,
                        px: isMobile ? 2 : 3,
                        py: isMobile ? 1 : 2.5,
                        fontWeight: 600,
                        fontSize: isMobile ? 14 : 27,
                        "&:hover": {
                            bgcolor: "rgba(128, 128, 128, 0.55)",
                        },
                        zIndex: 2,
                    }}
                >
                    {slides[index].buttonText}
                </Button>

            </Box>

        </Box>
    );
}



export default HeroSection;