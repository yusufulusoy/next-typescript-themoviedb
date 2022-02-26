import type { NextPage } from "next";
import Head from "next/head";
import { Brand, Search } from "@components";

const Home: NextPage = () => {
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
      </main>
    </div>
  );
};

export default Home;
