import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const AnimatedSection = ({ 
  children, 
  className = '',
  animationType = 'fade-up',
  delay = 0,
  duration = 0.6,
  staggerChildren = false,
  repeatOnScroll = false,
  ...props 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: !repeatOnScroll, 
    margin: "-100px 0px" 
  });

  // Animation variants
  const animations = {
    'fade-up': {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 }
    },
    'fade-down': {
      hidden: { opacity: 0, y: -30 },
      visible: { opacity: 1, y: 0 }
    },
    'fade-left': {
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0 }
    },
    'fade-right': {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 }
    },
    'scale-up': {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    },
    'scale-down': {
      hidden: { opacity: 0, scale: 1.2 },
      visible: { opacity: 1, scale: 1 }
    },
    'slide-in-left': {
      hidden: { opacity: 0, x: -100 },
      visible: { opacity: 1, x: 0 }
    },
    'slide-in-right': {
      hidden: { opacity: 0, x: 100 },
      visible: { opacity: 1, x: 0 }
    },
    'rotate-in': {
      hidden: { opacity: 0, rotate: -180 },
      visible: { opacity: 1, rotate: 0 }
    },
    'bounce-in': {
      hidden: { opacity: 0, scale: 0.3 },
      visible: { opacity: 1, scale: 1 },
      transition: { type: "spring", damping: 10, stiffness: 100 }
    },
    'flip-in': {
      hidden: { opacity: 0, rotateY: -180 },
      visible: { opacity: 1, rotateY: 0 }
    }
  };

  const selectedAnimation = animations[animationType] || animations['fade-up'];

  // For staggered animations on children
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  // Check if children is an array (multiple elements) for staggered animations
  const isStaggered = staggerChildren && Array.isArray(children);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={isStaggered ? containerVariants : selectedAnimation}
      transition={isStaggered ? undefined : { 
        duration: duration,
        delay: delay
      }}
      {...props}
    >
      {isStaggered ? (
        React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={childVariants}
            transition={{ delay: delay + index * 0.1 }}
          >
            {child}
          </motion.div>
        ))
      ) : (
        children
      )}
    </motion.div>
  );
};

export default AnimatedSection;
