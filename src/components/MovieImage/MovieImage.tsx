import Image from "next/image";
import type { ImageLoader } from "next/image";

type MovieImageProps = {
  /**
   * @description The movie's poster image source.
   *              If the horizontal prop is set to `true`,
   *              the image will be displayed in a horizontal layout with `backdrop_path`.
   *              Otherwise, the image will be displayed in a vertical layout with `poster_path`.
   */
  source: string | null;
  /**
   * @description The movie's poster image alt text.
   */
  alt: string;
  /**
   * @description The movie's poster dimension. Default is `false`.
   */
  horizontal?: boolean;
};

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const posterLoader: ImageLoader = ({ src }) => {
  return `/api/images?path=${src}`;
};

export const MovieImage: React.FC<MovieImageProps> = ({ source, alt }) => {
  if (!source) return null;
  return (
    <Image
      loader={posterLoader}
      src={source as string}
      alt={alt}
      layout="fill"
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
      className="group-hover:scale-110 transition-transform duration-300"
    />
  );
};
