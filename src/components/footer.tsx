"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Department */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
              Department
            </p>
            <div className="flex items-center gap-2">
              <Image
                src="/logo/dacc-logo.png"
                alt="DACC"
                width={32}
                height={32}
                className="rounded"
              />
              <span className="text-sm font-semibold text-gray-700">DACC</span>
            </div>
          </div>

          {/* University */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
              University
            </p>
            <a
              href="https://www.unir.br/homepage"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group"
            >
              <Image
                src="/logo/unir-logo.ico"
                width={24}
                height={24}
                alt="UNIR"
                className="rounded"
              />
              <span className="text-sm font-semibold text-gray-700 group-hover:text-green-600 transition-colors">
                UNIR
              </span>
            </a>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
              Contact
            </p>
            <a
              href="mailto:dacc@unir.br"
              className="text-sm text-gray-700 hover:text-green-600 transition-colors"
            >
              dacc@unir.br
            </a>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} VANDA — All rights reserved
          </p>
          <a
            href="https://www.unir.br/homepage"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-green-600 transition-colors"
          >
            Fundação Universidade Federal de Rondônia
          </a>
        </div>
      </div>
    </footer>
  );
}
