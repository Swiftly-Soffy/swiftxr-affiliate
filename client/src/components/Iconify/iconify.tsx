import React, { forwardRef } from 'react';
import { Icon } from '@iconify/react';
import type { HTMLAttributes } from 'react';

interface IconifyProps extends HTMLAttributes<HTMLDivElement> {
  icon: string;
  width?: number;
  fontSize?: string;
  color?: string;
  sx?: React.CSSProperties;
}

const Iconify = forwardRef<HTMLDivElement, IconifyProps>(
  ({ icon, width = 20, color = '', sx, ...other }, ref) => (
    <div ref={ref} style={{ width, height: width, color, ...sx }} {...other}>
      <Icon icon={icon} width={width} height={width} />
    </div>
  )
);

Iconify.displayName = 'Iconify';

export default Iconify;
