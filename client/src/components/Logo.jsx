import React from 'react'
import { Typography } from '@mui/material';
import { useTheme } from '@emotion/react';

const Logo = () => {
  const theme = useTheme();
  return (
    <Typography fontWeight="700" fontSize="1.7rem">
        Movie<span style={{ color: theme.palette.main }}>App</span>
    </Typography>
  )
};

export default Logo