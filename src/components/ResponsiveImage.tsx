import type { ResponsiveImageSource } from "@/lib/images";

type ResponsiveImageProps = {
  image: ResponsiveImageSource;
  sizes: string;
  className?: string;
  priority?: boolean;
};

export function ResponsiveImage({
  image,
  sizes,
  className,
  priority = false,
}: ResponsiveImageProps) {
  return (
    <picture>
      <source type="image/avif" srcSet={image.avif} sizes={sizes} />
      <source type="image/webp" srcSet={image.webp} sizes={sizes} />
      <img
        src={image.fallback}
        srcSet={image.jpg}
        sizes={sizes}
        alt={image.alt}
        title={image.caption}
        width={image.width}
        height={image.height}
        {...(className ? { className } : {})}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
        decoding={priority ? "sync" : "async"}
      />
    </picture>
  );
}
