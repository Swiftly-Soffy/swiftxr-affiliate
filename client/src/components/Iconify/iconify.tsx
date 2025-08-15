import React, { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { Icon } from '@iconify/react';

interface IconifyProps {
  icon: string;
  width?: number;
  fontSize?: string;
  color?: string;
  sx?: React.CSSProperties;
}

const Iconify = forwardRef<HTMLDivElement, IconifyProps>(
  ({ icon, width = 20, color = '', sx, ...other }, ref) => (
    <Box
      ref={ref}
      color={color}
      component={Icon}
      className="component-iconify"
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  )
);

Iconify.displayName = 'Iconify';

export default Iconify;
