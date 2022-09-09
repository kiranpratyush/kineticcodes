import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function CircularIndeterminate() {
  console.log('I am running');
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        transform: 'translate(50%,50%)',
        zIndex:9999
      }}
    >
      <CircularProgress style={{ color: 'rgb(8, 60, 174)' }} />
    </Box>
  );
}
