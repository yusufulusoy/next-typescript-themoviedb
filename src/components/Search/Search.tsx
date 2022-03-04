import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Search: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    handleUpdateHistory(query);
    router.push(`/search?q=${query}`);
  };

  const handleUpdateHistory = (query: string) => {
    const savedHistory = [...history];

    if (query) {
      if (savedHistory.includes(query)) {
        savedHistory.splice(savedHistory.indexOf(query), 1);
      }
      savedHistory.unshift(query);
      if (savedHistory.length > 5) {
        savedHistory.pop();
      }
      console.log("savedHistory", savedHistory);
      console.log("savedHistoryLength", savedHistory.length);
      setHistory(savedHistory);
      localStorage.setItem("history", JSON.stringify(savedHistory));
    }
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem("history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (router.isReady) {
      if (router.asPath.startsWith("/search")) {
        const query = router.query.q?.toString();
        if (query !== undefined && query !== null && query.length > 0) {
          setQuery(query);
        } else {
          router.push("/");
        }
      }
    }
  }, [router.isReady]);

  return (
    <div className="relative">
      <form
        onSubmit={handleSearch}
        className={`relative w-full flex items-center rounded-full shadow-sm py-2 pl-2 pr-3 z-50 bg-slate-800 highlight-white/5 ${
          isOpen && "bg-slate-700"
        } transition duration-300 ease-in-out`}
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
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
        />
        <button type="submit" className="font-bold text-xs pr-2">
          SEARCH
        </button>
      </form>
      {history.length > 0 && (
        <div
          className={`${
            isOpen
              ? "visible z-40 opacity-100"
              : "invisible opacity-0 -z-10 translate-y-[-2rem]"
          } absolute inset-x-0 top-5 rounded-lg pt-5 pb-2 bg-slate-800 transition duration-300 ease-in-out`}
        >
          <ul>
            <span className="block font-light text-sm tracking-widest uppercase my-2 px-3">
              Recent searches
            </span>
            {history?.map((item) => (
              <li key={item}>
                <Link href={`/search?q=${item}`}>
                  <a className="block font-medium leading-none px-3 py-2 bg-slate-800 hover:bg-slate-700 transition-colors duration-300 ease-in-out">
                    {item}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
