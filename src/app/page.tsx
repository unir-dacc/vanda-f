"use client";
import Footer from "@/components/footer";
import { BASE_PATH } from "@/constants";
import { Search, Dna, FlaskConical, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";

export default function Home() {
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
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <section className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 text-white">
        {/* Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                <Image
                  src={`${BASE_PATH}/logo/vandaLogo.svg`}
                  width={28}
                  height={28}
                  alt="VANDA Logo"
                />
              </div>
              <span className="font-bold text-xl tracking-wide">VANDA</span>
            </div>
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
        </div>

        {/* Hero content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                <Image
                  src={`${BASE_PATH}/logo/vandaLogo.svg`}
                  width={64}
                  height={64}
                  alt="VANDA Logo"
                />
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-3">
              VANDA
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-10 font-light">
              Visualization and Analysis of Nutrigenetic Data
            </p>

            {/* Search bar */}
            <div className="flex max-w-xl mx-auto shadow-2xl rounded-xl overflow-hidden">
              <input
                type="text"
                placeholder="Search by SNP ID (e.g. rs1234567)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 h-14 px-5 text-gray-800 text-base placeholder-gray-400 bg-white outline-none"
              />
              <button
                onClick={handleSearch}
                className="h-14 px-6 bg-green-900 hover:bg-green-800 text-white flex items-center gap-2 text-sm font-semibold transition-colors"
              >
                <Search size={18} />
                Search
              </button>
            </div>

            <p className="mt-4 text-white/60 text-sm">
              Or explore food-related SNP analysis in{" "}
              <Link
                href="/dataAnalysis"
                className="text-white/90 underline hover:text-white transition-colors"
              >
                Data Analysis
              </Link>
            </p>
          </div>
        </div>

        {/* Wave divider */}
        <div className="relative h-12 overflow-hidden">
          <svg
            viewBox="0 0 1440 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 w-full"
          >
            <path
              d="M0 48L60 42.7C120 37.3 240 26.7 360 21.3C480 16 600 16 720 21.3C840 26.7 960 37.3 1080 40C1200 42.7 1320 37.3 1380 34.7L1440 32V48H1380C1320 48 1200 48 1080 48C960 48 840 48 720 48C600 48 480 48 360 48C240 48 120 48 60 48H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Feature cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Dna className="text-green-600" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">SNP Analysis</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Search any SNP identifier to retrieve curated scientific
              publications and nutrigenetic relationships.
            </p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <FlaskConical className="text-blue-600" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Food Analysis</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Discover how specific foods interact with genetic variants,
              classified as beneficial, harmful, or neutral.
            </p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="text-purple-600" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Research Hub</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Integrated with PubMed, dbSNP, and GeneCards for comprehensive,
              up-to-date genomic knowledge.
            </p>
          </div>
        </div>

        {/* About section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
              About the Platform
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-5 leading-snug">
              Linking genes, food, and health through data
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              VANDA is a web platform designed for the analysis and exploration
              of nutrigenetic data. By linking genetic variations (SNPs) to
              pathologies, it assists researchers and healthcare professionals
              in creating personalized dietary plans.
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              The platform integrates data from public repositories like dbSNP
              and uses advanced categorization and summarization techniques to
              offer a seamless, user-friendly experience.
            </p>
            <div className="mt-6">
              <Link
                href="/dataAnalysis"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
              >
                Start Analyzing
                <Search size={15} />
              </Link>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-8 flex items-center justify-center min-h-48">
            <Image
              src={`${BASE_PATH}/logo/vandaLogo.svg`}
              width={120}
              height={120}
              alt="VANDA"
              className="opacity-40"
            />
          </div>
        </div>

        {/* Databases section */}
        <div>
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
            Data Sources
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Powered by trusted databases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NCBI */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-bold text-gray-900">NCBI</h3>
                <a
                  href="https://www.ncbi.nlm.nih.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={`${BASE_PATH}/logo/NIH_Logo.png`}
                    alt="NIH"
                    width={57}
                    height={36}
                    className="h-8 w-auto object-contain"
                  />
                </a>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                The NCBI (National Center for Biotechnology Information) is part
                of the U.S. National Institutes of Health, focused on
                biotechnology and bioinformatics. It hosts GenBank, PubMed,
                BLAST, and Gene databases — widely used by scientists, doctors,
                and students to access genetic data and academic publications.
              </p>
            </div>

            {/* GeneCards */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-bold text-gray-900">GeneCards</h3>
                <a
                  href="https://www.genecards.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={`${BASE_PATH}/logo/GeneCards-logo.png`}
                    alt="GeneCards"
                    width={30}
                    height={31}
                    className="h-8 w-auto object-contain"
                  />
                </a>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                GeneCards is a searchable, integrative database providing
                comprehensive, user-friendly information on all annotated and
                predicted human genes. It automatically integrates gene-centric
                data from ~150 web sources, including genomic, transcriptomic,
                proteomic, genetic, clinical and functional information.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
