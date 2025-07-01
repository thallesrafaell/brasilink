import Image from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
  quality = 85,
  placeholder = "empty",
  blurDataURL,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("select-none", className)}
      priority={priority}
      fill={fill}
      sizes={sizes}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      {...props}
    />
  );
}

// Componente específico para imagens de hero/landing page
export function HeroImage({
  src,
  alt,
  className,
  ...props
}: Omit<OptimizedImageProps, "priority" | "sizes">) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      priority={true}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      quality={90}
      {...props}
    />
  );
}

// Componente para avatars e imagens pequenas
export function AvatarImage({
  src,
  alt,
  size = 40,
  className,
  ...props
}: Omit<OptimizedImageProps, "width" | "height"> & { size?: number }) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("rounded-full", className)}
      sizes={`${size}px`}
      {...props}
    />
  );
}

// Componente para imagens responsivas
export function ResponsiveImage({
  src,
  alt,
  aspectRatio = "16/9",
  className,
  ...props
}: Omit<OptimizedImageProps, "width" | "height" | "fill"> & {
  aspectRatio?: string;
}) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      data-aspect-ratio={aspectRatio}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        fill={true}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...props}
      />
    </div>
  );
}
