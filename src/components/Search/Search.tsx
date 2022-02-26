import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Search: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string | string[]>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${query}`);
  };

  useEffect(() => {
    if (router.isReady) {
      if (router.asPath.startsWith("/search")) {
        const query = router.query.q;
        query ? setQuery(query) : router.push("/");
      }
    }
  }, [router.isReady]);

  return (
    <form
      onSubmit={handleSearch}
      className="w-full flex items-center rounded-full shadow-sm py-2 pl-2 pr-3 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 stroke-sky-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        className="flex-1 bg-transparent focus:outline-none border-0 mx-2 text-sm leading-6 text-slate-400"
        placeholder="Search movies with keywords..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="font-bold text-xs pr-2">
        SEARCH
      </button>
    </form>
  );
};

export default Search;
