import type { ReactElement } from "react";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { Layout, MovieCard, MovieImage } from "@components";

const Movie = ({
  movie,
  similars,
}: {
  movie: MovieDetailType;
  similars: ResponsePaginationType & { results: MovieSummaryType[] };
}) => {
  return (
    <div className="container mx-auto my-5">
      <Head>
        <title>{movie.title}</title>
      </Head>
      <div className="grid grid-cols-5 gap-3">
        <div className="relative hidden md:block md:col-span-2 order-2 aspect-auto rounded-lg overflow-hidden">
          <MovieImage source={movie.poster_path} alt={movie.title} />
        </div>
        <div className="shadolg rounded-lg overflow-hidden col-span-5 md:col-span-3 bg-black">
          <div className="relative aspect-video z-10">
            <MovieImage
              source={
                movie.backdrop_path ? movie.backdrop_path : movie.poster_path
              }
              alt={movie.title}
              horizontal
            />
            <div className="h-20 absolute bottom-0 inset-x-0 z-10 bg-gradient-to-t from-black/80"></div>
          </div>
          <div className="relative z-50 bg-black p-5">
            <h1 className="font-bold text-4xl mb-5">{movie.title}</h1>
            <p className="text-slate-400 mb-5">{movie.overview}</p>
            <div>
              <ul>
                <span className="text-slate-500 mr-2">Spoken Language(s):</span>
                {movie.spoken_languages.map((language) => (
                  <li
                    key={language.name}
                    className="inline text-slate-400 mr-1 after:content-[','] last:after:content-['']"
                  >
                    {language.name}
                  </li>
                ))}
              </ul>
              <ul>
                <span className="text-slate-500 mr-2">Genre(s):</span>
                {movie.genres.map((genre) => (
                  <li
                    key={genre.name}
                    className="inline text-slate-400 mr-1 after:content-[','] last:after:content-['']"
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
              <ul>
                <span className="text-slate-500 mr-2">
                  Production Company(s):
                </span>
                {movie.production_companies.map((company) => (
                  <li
                    key={company.name}
                    className="inline text-slate-400 mr-1 after:content-[','] last:after:content-['']"
                  >
                    {company.name}
                  </li>
                ))}
              </ul>
              <ul>
                <span className="text-slate-500 mr-2">
                  Production Country(s):
                </span>
                {movie.production_countries.map((country) => (
                  <li
                    key={country.name}
                    className="inline text-slate-400 mr-1 after:content-[','] last:after:content-['']"
                  >
                    {country.name}
                  </li>
                ))}
              </ul>
              <div>
                <span className="text-slate-500 mr-2">Release Date:</span>{" "}
                <span className="text-slate-400">{movie.release_date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="mt-10">
        <h2 className="font-bold text-2xl tracking-widest uppercase mb-3">
          Similar Movies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {similars.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { id } = ctx.query;
  const movie = await fetch(`${process.env.BASE_URL}/api/movie?id=${id}`).then(
    (res) => res.json()
  );

  const similars = await fetch(
    `${process.env.BASE_URL}/api/similar?id=${id}`
  ).then((res) => res.json());

  return {
    props: {
      id,
      movie,
      similars,
    },
  };
};

Movie.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Movie;
