import { Box, Stack, Typography } from '@mui/material';
import React from 'react'

const Container = ({ header, children }) => {
    
    return (
    <Box sx={{
        marginTop: "5rem",
        marginX: "auto",
        color: ""
    }}>
    <Stack spacing={4}>
        {header && (
            <Box sx={{
                position: "relative",
                paddingX: {xs: "20px", md: "20px"},
                maxWidth: "1366px",
                marginX: "auto",
                width: "100%",
                "&::before" : {
                    content: '""',
                    position: "absolute",
                    left: { xs: "20px", md: "20px"},
                    top: "100%",
                    height: "1.5px",
                    width: "250px",
                    backgroundColor: "primary.main"
                }
            }}>
                <Typography variant="h5" fontWeight="500" textTransform="capitalize" letterSpacing="1.5px">
                    {header}
                </Typography>
            </Box>
        )}
        {children}
    </Stack>

    </Box>
  );
};

export default Container;