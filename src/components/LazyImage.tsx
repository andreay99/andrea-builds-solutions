import React from "react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, width, height, ...rest }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      fetchPriority={"low"}
      width={width as any}
      height={height as any}
      {...rest}
    />
  );
};

export default LazyImage;
