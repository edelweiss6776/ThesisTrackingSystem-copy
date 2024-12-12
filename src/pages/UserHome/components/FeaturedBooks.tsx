import React from 'react';
import { Box, Typography } from '@mui/material';
import DefaultCover from '../../../images/DefaultCover.jpg';


const FeaturedBooks: React.FC = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#9B86BD',
                display: 'flex',
                flexWrap: 'wrap',
                padding: '16px',
                justifyContent: 'space-between',
                borderRadius: '6px',
                width: '70%',
                margin: '50px',
            }}
        >
            {Array.from({ length: 15 }).map((_, index) => (
                <Box
                    key={index}
                    sx={{
                        width: '22%',
                        margin: '10px',
                        borderRadius: '6px',
                        textAlign: 'center',
                        boxSizing: 'border-box',
                        position: 'relative',
                    }}
                >
                    {/* Display the image as the book cover */}
                    <img
                        src={DefaultCover}
                        alt="Book Cover"
                        style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'cover',
                            borderRadius: '6px',
                        }}
                    />
                </Box>
            ))}
        </Box>
    );
};


export default FeaturedBooks;





