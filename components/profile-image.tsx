import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProfileImageProps {
  src?: string | null;
  alt?: string;
  className?: string;
  size?: number;
}

export function ProfileImage({
  src,
  alt = "Profile",
  className,
  size = 40,
}: ProfileImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full bg-muted",
        className
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={`${size}px`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
          {alt.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}