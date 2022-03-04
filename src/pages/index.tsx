import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Brand, MovieCard, Search } from "@components";

type Props = {
  upcomings: ResponsePaginationType & { results: MovieSummaryType[] };
};

const Home: NextPage<Props> = ({ upcomings }) => {
  return (
    <div>
      <Head>
        <title>Homepage</title>
        <meta
          name="description"
          content="themoviedb.org API example project with TypeScript, Tailwind CSS, and Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <section className="max-w-xl mx-auto my-20">
          <div className="w-52 mx-auto mb-5">
            <Brand />
          </div>
          <div>
            <Search />
          </div>
        </section>
        <section className="container mx-auto my-5">
          <h2 className="font-bold tracking-widest uppercase mb-2">
            Upcoming Movies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {upcomings.results.map(
              (movie) =>
                movie.overview && <MovieCard key={movie.id} movie={movie} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const upcomings = await fetch(
    `${process.env.BASE_URL}/api/upcoming?region=TR`
  ).then((res) => res.json());

  return {
    props: {
      upcomings,
    },
  };
};
export default Home;
