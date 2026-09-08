/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import * as React from 'react';
import './flip-card.css';

interface FlipCardProps {
  frontImage: string;
  backImage: string;
}

export function FlipCard({ frontImage, backImage }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const isTouchDevice =
    typeof window !== 'undefined' && 'ontouchstart' in window;

  const handleClick = () => {
    if (isTouchDevice) setIsFlipped(!isFlipped);
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) setIsFlipped(false);
  };

  const cardVariants = {
    front: { rotateY: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
    back: { rotateY: 180, transition: { duration: 0.5, ease: 'easeOut' as const } },
  };

  return (
    <div
      className="flip-card-container"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* FRONT: Profile Image */}
      <motion.div
        className="flip-card-front"
        animate={isFlipped ? 'back' : 'front'}
        variants={cardVariants}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img
          src={frontImage}
          alt="Card Front"
          className="flip-card-image-full"
        />
      </motion.div>

      {/* BACK: Bio/Details Image */}
      <motion.div
        className="flip-card-back"
        initial={{ rotateY: 180 }}
        animate={isFlipped ? 'front' : 'back'}
        variants={cardVariants}
        style={{ transformStyle: 'preserve-3d', rotateY: 180 }}
      >
        <img
          src={backImage}
          alt="Card Back"
          className="flip-card-image-full"
        />
      </motion.div>
    </div>
  );
}
