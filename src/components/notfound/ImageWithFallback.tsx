import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackSrc: string;
  className?: string;
  width?: number;
  height?: number;
  
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, fallbackSrc, className, width, height }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={handleError}
      loading="lazy"
      decoding="async"
    />
  );
};

export default ImageWithFallback;