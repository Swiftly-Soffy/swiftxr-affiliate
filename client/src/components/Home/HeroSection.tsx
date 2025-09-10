import { useState, useEffect } from "react";
import { Box, Typography, Button, Slide } from "@mui/material";
import { useResponsiveViewContext } from "../providers";
import { motion, AnimatePresence } from "framer-motion";
import { alpha } from "@mui/material";

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
        title: 'Tech You Can Touch',
        description: 'Experience the latest gadgets like never before—spin, zoom, and see every detail before you buy.',
        image: phone,
        buttonText: 'Gadgets',
    },
    {
        title: 'Design That Fits Your Space',
        description: 'Place our furniture in your living room with one tap. Make sure it’s perfect—before it arrives.',
        image: chair,
        buttonText: 'Furniture',
    },
    {
        title: 'Style You Can Try On',
        description: 'See how it looks on you instantly—our virtual try-on makes shopping effortless',
        image: shoe,
        buttonText: 'Fashion',
    },
    {
        title: 'Smarter Living, In Your Hands',
        description: 'Preview appliances in your kitchen or laundry room—make sure they fit your style and space perfectly.',
        image: refrig,
        buttonText: 'Home Appliances',
    }
];


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
                bgcolor: 'background.neutral',
                backgroundImage: `linear-gradient(to right, rgba(255, 182, 193, 0.20) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255, 182, 193, 0.20) 1px, transparent 1px)`,
                backgroundSize: '50px 30px',
                color: 'text.primary',
                overflow: 'hidden',
                width: 1,
                position: 'relative',
                height: '85vh',
                borderBottom: isMobile ? 0 : '6px solid',
                borderColor: (theme) => alpha(theme.palette.background.paper, 0.7)
            }}>

            {/*  Heading Texts */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: isMobile ? 'center' : 'auto',
                }}>
                <motion.div
                    key={index + '-text'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {/* Title */}
                    <Typography fontWeight={700} fontSize={isMobile ? 28 : 60} mt={isMobile ? 8 : -2}>
                        {slides[index].title}
                    </Typography>

                    {/* Description */}
                    <Typography fontWeight={400} fontSize={isMobile ? 14 : 22} width={isMobile ? '90%' : '55%'} textAlign='center'>
                        {slides[index].description}
                    </Typography>
                </motion.div>

                {/* Bullets */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: isMobile ? 1 : 3 }}>
                    {slides.map((_, i) => (
                        <Box key={i} onClick={() => setIndex(i)} sx={{ mx: 0.4, cursor: 'pointer', flexShrink: 0 }}>
                            <svg width='20' height='20'>
                                <circle
                                    cx='10'
                                    cy='10'
                                    r='8'
                                    fill='transparent'
                                    stroke={i === index ? 'url(#grad)' : '#FFE7EF'}
                                    strokeWidth='3'
                                />
                                {i === index && (
                                    <defs>
                                        <linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'>
                                            <stop offset='0%' stopColor='#e47094' />
                                            <stop offset='40%' stopColor='#c257c4' />
                                            <stop offset='100%' stopColor='#0084e3' />
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
                    position: 'relative',
                    height: '100%',
                    width: '100%',
                    overflow: 'hidden',
                    mt: isMobile ? 'auto ' : -5,
                    maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                }}>

                <AnimatePresence mode='wait'>
                    <motion.img
                        key={index}
                        src={slides[index].image}
                        alt={slides[index].title}
                        initial={{ opacity: 0, transform: 'translateX(100%) translateX(-50%)' }}
                        animate={{ opacity: 1, transform: 'translateX(-50%)' }}
                        exit={{ opacity: 0, transform: 'translateX(-100%) translateX(-50%)' }}
                        transition={{ duration: 0.8 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            transform: 'translate(-50%)',
                            width: 'auto',
                            maxWidth: 'none',
                            height: isMobile ? '130%' : 'auto',
                            maxHeight: '98vh',
                            objectFit: 'cover',
                            objectPosition: 'top center',
                        }}
                    />
                </AnimatePresence>

                {/* Button */}
                <Button
                    onClick={() => onCategoryClick(slides[index].buttonText)}
                    variant='contained'
                    sx={{
                        position: 'absolute',
                        top: '60%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(255, 255, 255, 0.60)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: isMobile ? 3 : 5,
                        px: isMobile ? 2 : 3,
                        py: isMobile ? 1 : 2.5,
                        fontWeight: 700,
                        color: 'text.primary',
                        fontSize: isMobile ? 14 : 26,
                        '&:hover': {
                            background: 'rgba(255, 255, 255, 0.12)'
                        },
                        zIndex: 2,
                    }}
                >
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={index}
                            initial={{ x: 40, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -40, opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut", }}
                        >
                            {slides[index].buttonText}
                        </motion.span>
                    </AnimatePresence>
                </Button>
            </Box>

            <Box
                sx={{
                    display: isMobile ? 'block' : 'none',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '10%',
                    bgcolor: 'background.default',
                    zIndex: 1,
                    borderTop: '6px solid',
                    borderColor: (theme) => alpha(theme.palette.background.paper, 0.7),
                }}
            />

        </Box >
    );
}



export default HeroSection;