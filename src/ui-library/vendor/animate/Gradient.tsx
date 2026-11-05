// Animate UI v1: application colour-theme adaptation; see LICENSE.md and SOURCES.md.
'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

const cn = (...v: (string | undefined)[]) => v.filter(Boolean).join(' ');

type GradientBackgroundProps = HTMLMotionProps<'div'>;

function GradientBackground({
  className,
  transition = { duration: 15, ease: 'easeInOut', repeat: Infinity },
  ...props
}: GradientBackgroundProps) {
  return (
    <motion.div
      data-slot="gradient-background"
      className={cn(
        'ul-gradient',
        className,
      )}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={transition}
      {...props}
    />
  );
}

export { GradientBackground, type GradientBackgroundProps };
