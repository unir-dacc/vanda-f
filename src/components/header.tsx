"use client";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";

export default function Header() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/snp/${encodeURIComponent(query.trim())}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <header className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 group-hover:bg-white/30 transition-colors">
              <Image
                src={`${router.basePath}/logo/vandaLogo.svg`}
                width={28}
                height={28}
                alt="VANDA Logo"
              />
            </div>
            <span className="font-bold text-xl text-white tracking-wide">
              VANDA
            </span>
          </Link>

          <nav>
            <ul className="flex items-center gap-1">
              <li>
                <Link
                  href="/dataAnalysis"
                  className="text-white/90 hover:text-white hover:bg-white/15 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  Data Analysis
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/90 hover:text-white hover:bg-white/15 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/riccardoalv/vanda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white hover:bg-white/15 px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5"
                >
                  <FaGithub size={16} />
                  GitHub
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Search bar */}
        <div className="pb-4">
          <div className="flex max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search articles by SNP ID (e.g. rs1234567)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 h-11 px-4 rounded-l-xl text-sm bg-white/95 text-gray-800 placeholder-gray-400 outline-none focus:bg-white transition-colors"
            />
            <button
              onClick={handleSearch}
              className="h-11 px-5 bg-green-900 hover:bg-green-800 rounded-r-xl text-white flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <Search size={16} />
              Search
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
