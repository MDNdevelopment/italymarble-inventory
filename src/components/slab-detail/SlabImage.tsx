import Image from "next/image";

interface SlabImageProps {
  src: string;
  alt: string;
}

export default function SlabImage({ src, alt }: SlabImageProps) {
  return (
    <div className="group relative w-full aspect-[4/3] overflow-hidden bg-surface-variant">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 66vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
    </div>
  );
}
