import Link from "next/link";
import { MovieImage } from "@components";

type MovieCardProps = {
  /**
   * @description The movie data.
   */
  movie: MovieSummaryType;
  /**
   * @description The movie's poster dimension. Default is `false`.
   */
  horizontal?: boolean;
};

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  horizontal = false,
}) => {
  return (
    <Link href="/movie/[id]" as={`/movie/${movie.id}`}>
      <a className="group relative shadow cursor-pointer">
        <figure className="flex flex-col rounded-lg bg-black overflow-hidden h-full">
          <div
            className={`${
              horizontal ? "aspect-[16/9]" : "aspect-[3/4]"
            } flex-none relative overflow-hidden`}
          >
            {(movie.poster_path || movie.backdrop_path) && (
              <MovieImage
                source={
                  horizontal
                    ? movie.backdrop_path
                      ? movie.backdrop_path
                      : movie.poster_path
                    : movie.poster_path
                    ? movie.poster_path
                    : movie.backdrop_path
                }
                alt={movie.title}
                horizontal={horizontal}
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-500/50 transition-opacity duration-300">
              <span className="text-white text-xs font-medium bg-slate-900/70 border border-slate-100/50 rounded-full px-3 py-2">
                VIEW DETAILS
              </span>
            </div>
            <div className="h-5 absolute bottom-0 inset-x-0 z-10 bg-gradient-to-t from-black"></div>
          </div>
          <figcaption className="flex flex-col grow  items-stretch justify-between bg-black p-3">
            <div className="title">
              <h3 className="inline font-bold uppercase">{movie.title}</h3>
              {movie.title !== movie.original_title && (
                <span className="block font-regular opacity-60 leading-none uppercase">
                  {movie.original_title}
                </span>
              )}
            </div>
            <p className="text-xs mt-2">
              Release date: {new Date(movie.release_date).toLocaleDateString()}
            </p>
          </figcaption>
        </figure>
      </a>
    </Link>
  );
};
