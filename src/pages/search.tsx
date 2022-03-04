import type { ReactElement } from "react";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Layout, MovieCard } from "@components";
import Link from "next/link";

const Search = ({
  results,
}: {
  results: ResponsePaginationType & { results: MovieSummaryType[] };
}) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{router.query.q} - Search Results</title>
      </Head>
      <div className="container mx-auto">
        <h1 className="mb-4">
          {results.total_results} results for:{" "}
          <span className="font-bold">{router.query.q}</span>
        </h1>
        <section className="grid grid-cols-5 gap-4 my-5">
          {results?.results?.map((result) => (
            <MovieCard key={result.id} movie={result} horizontal />
          ))}
        </section>
        <nav
          className="flex items-center justify-center mb-5"
          role="navigation"
        >
          {results.page - 1 > 0 && (
            <Link href={`/search?q=${router.query.q}&page=${results.page - 1}`}>
              <a className="block bg-slate-800 px-3 py-2 rounded-full mx-1">
                Previous Page ({results.page - 1})
              </a>
            </Link>
          )}
          <Link href={`/search?q=${router.query.q}&page=${results.page + 1}`}>
            <a className="block bg-slate-800 px-3 py-2 rounded-full mx-1">
              Next Page ({results.page + 1})
            </a>
          </Link>
        </nav>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const query = ctx.query.q;
  const page = ctx.query.page || 1;
  const results = await fetch(
    `${process.env.BASE_URL}/api/search?query=${query}&page=${page}`
  ).then((res) => res.json());

  return {
    props: {
      results,
    },
  };
};

Search.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Search;
