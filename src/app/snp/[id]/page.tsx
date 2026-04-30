"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import { getFastAPI } from "@/api/fastAPI";
import { useParams } from "next/navigation";
import { LiaSpinnerSolid } from "react-icons/lia";
import { AlertTriangle, BookOpen, ExternalLink, Tag } from "lucide-react";

interface Article {
  pmid: string;
  title: string;
  abstract: string;
}

interface Topics {
  [key: string]: Article[];
}

export default function SNPDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const fetchSNP = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setNotFound(false);

    try {
      const api = getFastAPI();
      const response: any = await api.snpPageSnpSnpIdGet(id, {
        baseURL: process.env.NEXT_PUBLIC_API_URL,
      });

      if (
        !response.data ||
        (response.data.topics && Object.keys(response.data.topics).length === 0)
      ) {
        setNotFound(true);
      } else {
        setResult(response.data);
      }
    } catch (err: any) {
      console.error("Error loading SNP:", err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchSNP();
  }, [id]);

  const totalArticles = result?.topics
    ? Object.values(result.topics as Topics).reduce(
        (acc, arr) => acc + arr.length,
        0
      )
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4 animate-fade-in">
            <LiaSpinnerSolid className="animate-spin text-green-600 text-5xl" />
            <p className="text-gray-600 font-medium">
              Loading articles for{" "}
              <span className="text-green-600 font-mono">{id}</span>...
            </p>
          </div>
        )}

        {/* Not found state */}
        {notFound && (
          <div className="max-w-2xl mx-auto px-4 py-24 flex flex-col items-center text-center gap-5 animate-fade-in">
            <div className="w-20 h-20 bg-yellow-100 rounded-3xl flex items-center justify-center">
              <AlertTriangle className="text-yellow-500" size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                SNP Not Found
              </h2>
              <p className="text-gray-500 text-base">
                The SNP{" "}
                <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                  {id}
                </span>{" "}
                could not be found in our database.
              </p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 w-full text-left">
              <p className="text-yellow-800 font-semibold mb-3 text-sm">
                Possible reasons:
              </p>
              <ul className="space-y-2 text-yellow-700 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0" />
                  The SNP ID may be incorrect or mistyped
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0" />
                  This SNP is not yet in our current database
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0" />
                  SNP identifiers should follow the format rs followed by digits
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Results */}
        {result?.topics && (
          <div className="animate-slide-up">
            {/* SNP header */}
            <div className="bg-gradient-to-br from-gray-50 to-green-50 border-b border-gray-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                      SNP Detail
                    </span>
                    <h1 className="text-3xl font-extrabold text-gray-900 font-mono">
                      {id}
                    </h1>
                    <p className="text-gray-500 mt-1">
                      {Object.keys(result.topics as Topics).length} topics •{" "}
                      {totalArticles} articles found
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={`https://www.ncbi.nlm.nih.gov/snp/${id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:border-green-400 hover:text-green-600 px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm"
                    >
                      <ExternalLink size={14} />
                      View on dbSNP
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Topics */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
              {Object.entries(result.topics as Topics).map(
                ([topic, articles]: [string, Article[]]) => (
                  <div key={topic}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Tag size={14} className="text-blue-600" />
                      </div>
                      <h2 className="text-lg font-bold text-gray-900">
                        {topic}
                      </h2>
                      <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-0.5 rounded-full">
                        {articles.length}
                      </span>
                    </div>

                    {articles.length > 0 ? (
                      <div className="space-y-4 pl-11">
                        {articles.map((article, index) => (
                          <div
                            key={`${article.pmid}-${index}`}
                            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-green-500"
                          >
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h3 className="font-semibold text-gray-900 text-base leading-snug">
                                {article.title}
                              </h3>
                              <a
                                href={`https://pubmed.ncbi.nlm.nih.gov/${article.pmid}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex-shrink-0"
                              >
                                <BookOpen size={12} />
                                PMID {article.pmid}
                              </a>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {article.abstract}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="pl-11">
                        <p className="text-gray-400 text-sm italic">
                          No publications found for this topic.
                        </p>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
