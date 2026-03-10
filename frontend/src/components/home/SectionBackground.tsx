import React from 'react';
import Image from 'next/image';

interface SectionBackgroundProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string; // Additional classes (like opacity tweaks)
}

/**
 * A reusable component to render the high-fidelity textured backgrounds
 * from the Shopify Editions reference site perfectly behind section content.
 */
export const SectionBackground: React.FC<SectionBackgroundProps> = ({ 
  src, 
  alt, 
  priority = false, 
  className = "" 
}) => {
  return (
    <div className={`absolute inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        priority={priority}
        className="object-cover"
        quality={100} // Maximize fidelity for textured backgrounds
      />
    </div>
  );
};
