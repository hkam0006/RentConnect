import React, {useState} from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function ImageCarousel({ images, style_props }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }

    const handleBack = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }

    return <>
        <Box sx={{
            position: 'relative', // Needed for absolute positioning of arrows
            height: '100%',       // Fixed height
            width: '100%',        // Fixed width
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '16px', // Rounded corners
            backgroundColor: 'black',
        }}>
            {/* Back Arrow */}
            <IconButton 
                onClick={handleBack} 
                disabled={images.length <= 1}
                sx={{
                    position: 'absolute',
                    left: 16,
                    color: 'white', // Ensure visibility over images
                    zIndex: 2, // Ensure it's above the image
                }}
            >
                <ArrowBackIosIcon />
            </IconButton>

            {/* Image */}
            <img
                src={images[currentImageIndex]}
                alt={`Slide ${currentImageIndex}`}
                style={{
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain', // Adjust to cover if you want the image to fill the area
                    ...style_props
                }}
            />

            {/* Forward Arrow */}
            <IconButton 
                onClick={handleNext} 
                disabled={images.length <= 1}
                sx={{
                    position: 'absolute',
                    right: 16,
                    color: 'white', // Ensure visibility over images
                    zIndex: 2, // Ensure it's above the image
                }}
            >
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
    </>
}