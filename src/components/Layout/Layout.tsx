import Link from "next/link";
import { Brand, Search } from "@components";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="layout">
      <header className="mb-3">
        <div className="container mx-auto flex items-center justify-between py-5 px-3 border-b border-slate-800">
          <div className="hidden md:block flex-initial w-auto">
            <Link href="/">
              <a>
                <Brand className="w-40" />
              </a>
            </Link>
          </div>
          <div className="flex-initial max-w-xl w-full px-3">
            <Search />
          </div>
          <nav className="flex-initial md:min-w-[10rem]">
            <ul className="flex items-center justify-end">
              <li>
                <Link href="/">
                  <a className="block hover:bg-slate-800 p-1.5 ml-1 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="px-3">{children}</div>
    </div>
  );
};

export default Layout;
