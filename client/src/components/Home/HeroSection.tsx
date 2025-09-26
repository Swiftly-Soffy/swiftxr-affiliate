import { useState } from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { useResponsiveViewContext } from "../providers";
//import { motion, AnimatePresence } from "framer-motion";
import { alpha } from "@mui/material";
import { motion } from 'framer-motion';

/*import phone from "../../assets/slide1.png"
import chair from "../../assets/slide2.png"
import shoe from "../../assets/slide3.png"
import refrig from "../../assets/slide4.png"*/

import {
    bg1,
    bg2,
    bg3,
    bg4,
    frame,
    image11,
    image22,
    image33,
    image44,
    image1,
    image2,
    image3,
    image4,
} from "../../assets/"

/*type Slide = {
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
];*/

const thumbnails = [image11, image22, image33, image44]
const imagesInframes = [
    {
        image: image1,
        background: bg1,
        description: 'View in your space before you buy',
        buttonText: 'Sofa Chair'
    },
    {
        image: image2,
        background: bg2,
        description: 'Try it on your head, instantly.',
        buttonText: 'Hat'
    },
    {
        image: image3,
        background: bg3,
        description: 'Open it on your desk before you order.',
        buttonText: 'Laptop'
    },
    {
        image: image4,
        background: bg4,
        description: 'Place it in your kitchen, right now',
        buttontText: 'Fridge'
    },
];

/*interface HeroSectionProps {
    onCategoryClick: (categoryName: string) => void;
}*/

function HeroSection(/*{ onCategoryClick }: HeroSectionProps*/) {
    const { isMobile } = useResponsiveViewContext();
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <Stack component={'section'} direction="column" rowGap={0}
            sx={{
                //bgcolor: 'background.neutral',
                /*backgroundImage: `linear-gradient(to right, rgba(255, 182, 193, 0.20) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255, 182, 193, 0.20) 1px, transparent 1px)`,*/
                //backgroundSize: '50px 30px',
                background: 'linear-gradient(136.86deg, #BA21F8 -25.67%, #FF9B37 118.68%)',
                color: 'text.primary',
                overflow: 'hidden',
                width: 1,
            }}>

            {/*  Heading Texts */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: isMobile ? 'center' : 'auto',
                    color: 'text.neutral'
                }}>
                <Typography fontWeight={700} fontSize={isMobile ? 28 : 42} mt={isMobile ? 8 : -2}>
                    Redefining Online Shopping
                </Typography>
                <Typography fontWeight={400} fontSize={isMobile ? 12 : 14} width={isMobile ? '90%' : '55%'} textAlign='center'>
                    Transform the way you browse and buy. Discover products in a realistic, interactive 3D environment built for modern shoppers.
                </Typography>

                {/* Thumbnails */}

                {/*<motion.div
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
                    {/* Title 
                    <Typography fontWeight={700} fontSize={isMobile ? 28 : 60} mt={isMobile ? 8 : -2}>
                        {slides[index].title}
                    </Typography>

                    {/* Description
            <Typography fontWeight={400} fontSize={isMobile ? 14 : 22} width={isMobile ? '90%' : '55%'} textAlign='center'>
                {slides[index].description}
            </Typography>
        </motion.div>
        */}
                {/* Bullets */}
                {/*<Box sx={{ display: 'flex', justifyContent: 'center', mt: isMobile ? 1 : 3 }}>
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
                </Box>*/}
            </Box >

            {/* Thumbnails */}
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    overflow: "hidden",
                    py: 4,
                    justifyContent: 'center',
                    textAlign: 'center'
                }}
            >

                {/* Blurred Box */}
                <Box
                    sx={{
                        width: 30,
                        height: 70,
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.08)',
                        maskImage:
                            'linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                        WebkitMaskImage:
                            'linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                        maskComposite: 'intersect',
                        WebkitMaskComposite: 'destination-in',
                        cursor: 'pointer'
                    }}
                />

                {thumbnails.map((thumb, i) => (
                    <Box
                        key={i}
                        sx={{
                            width: 70,
                            height: 70,
                            borderRadius: 4,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            background: 'rgba(255, 255, 255, 0.30)',
                            backdropFilter: 'blur(6px)',
                            border: i === selectedIndex ? '2px solid #FF9B37' : '2px solid transparent',
                            WebkitBackdropFilter: 'blur(6px)',
                            maskImage: 'linear-gradient(to top left, transparent 0%, black 50%, black 100%)',
                            WebkitMaskImage: 'linear-gradient(to top left, transparent 0%, black 50%, black 100%)',
                            transition: 'border 0.2s',
                            '& img': {
                                width: '80%',
                                height: '80%',
                                objectFit: 'contain',
                            },
                        }}
                        onClick={() => setSelectedIndex(i)}
                    >
                        <img src={thumb} alt={`thumbnail-${i}`} />
                    </Box>
                ))}

                {/* Blurred Box */}
                <Box
                    sx={{
                        width: 40,
                        height: 70,
                        borderRadius: 3,
                        background: 'rgba(255, 255, 255, 0.20)',
                        maskImage:
                            'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)',
                        WebkitMaskImage:
                            'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskSize: 'cover',
                        WebkitMaskSize: 'cover',
                        cursor: 'pointer'
                    }}
                />
            </Box>

            {/* Image Display */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                {/* Frame */}
                <Box component='img' src={frame} sx={{ display: 'block', zIndex: 0, width: isMobile ? 400 : 600 }} />

                {/* Background image */}
                <Box
                    component='img'
                    src={imagesInframes[selectedIndex].background}
                    sx={{
                        position: 'absolute',
                        top: '8%',
                        left: isMobile ? '4%' : '25.5%',
                        width: isMobile ? 338 : 513,
                        height: 'fit-content',
                        objectFit: 'contain',
                        borderRadius: 4,
                        zIndex: 2,
                    }}
                />

                {/* image */}
                <motion.img
                    src={imagesInframes[selectedIndex].image}
                    style={{
                        position: 'absolute',
                        width: '50%',
                        height: '50%',
                        left: '25%',
                        top: '50%',
                        objectFit: 'contain',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 3,
                        transformOrigin: 'center',
                    }}
                    animate={{
                        scale: isMobile ? [1, 1.8, 1.8, 1, 1] : [1, 2.8, 2.8, 1, 1],
                    }}
                    transition={{
                        duration: 8,
                        times: [0, 0.1, 0.5, 0.55, 1],
                        repeat: Infinity,
                        ease: ['easeOut', 'linear', 'linear', 'linear', 'linear'],
                    }}
                />

                {/* Text and button appear while zoomed */}
                <motion.div
                    style={{
                        position: 'absolute',
                        top: '67%',
                        left: '32%',
                        zIndex: 4,
                        color: '#fff',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '8px',
                        alignItems: 'center',
                        background: 'rgba(255, 255, 255, 0.30)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.8)',
                        padding: 10,
                        borderRadius: 50
                    }}
                    animate={{
                        opacity: [0, 1, 1, 0, 0],
                        scale: isMobile ? [0.8, 0.8, 0.8, 0.8, 0.8] : [1, 1, 1, 1, 1],
                    }}
                    transition={{
                        duration: 8,
                        times: isMobile ? [0, 0.05, 0.5, 0.55, 1]:[0, 0.1, 0.5, 0.55, 1],
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <Button variant='contained' sx={{
                        background: 'linear-gradient(136.86deg, #BA21F8 -25.67%, #FF9B37 118.68%)',
                        borderRadius: 50
                    }}>{imagesInframes[selectedIndex].buttonText}</Button>
                    <Typography fontSize={16} fontWeight={400}>{imagesInframes[selectedIndex].description}</Typography>
                </motion.div>



            </Box>
            <Box
                sx={{
                    display: isMobile ? 'block' : 'none',
                    position: 'absolute',
                    bottom: 80,
                    left: 0,
                    width: '100%',
                    height: '10%',
                    bgcolor: 'background.default',
                    zIndex: 1,
                }}
            />
            {/* Carousel Container */}
            {/*< Box
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

                {/* Button 
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
            </Box >
            */}

            {/**/}

        </Stack >
    );
}



export default HeroSection;