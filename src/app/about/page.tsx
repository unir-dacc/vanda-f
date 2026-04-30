import Footer from "@/components/footer";
import Header from "@/components/header";
import { Users, Target, BookOpen } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  info: string;
  initials: string;
  color: string;
}

const team: TeamMember[] = [
  {
    name: "Team Member",
    role: "Researcher",
    info: "Nutrigenomics and bioinformatics research",
    initials: "TM",
    color: "from-green-400 to-emerald-500",
  },
  {
    name: "Team Member",
    role: "Developer",
    info: "Full-stack development and API design",
    initials: "TM",
    color: "from-blue-400 to-cyan-500",
  },
  {
    name: "Team Member",
    role: "Data Scientist",
    info: "Data modeling and visualization",
    initials: "TM",
    color: "from-purple-400 to-violet-500",
  },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page header */}
        <div className="bg-gradient-to-br from-gray-50 to-green-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
              About
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900">
              About VANDA
            </h1>
            <p className="text-gray-500 mt-2 text-lg max-w-xl">
              A platform developed at UNIR for nutrigenetic data visualization
              and analysis.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Mission cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Target className="text-green-600" size={22} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Our Mission</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                To bridge the gap between nutritional science and genomics,
                enabling personalized dietary recommendations based on genetic
                data.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="text-blue-600" size={22} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Research Focus</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Integrating data from public repositories like dbSNP and PubMed
                to provide curated nutrigenetic insights for researchers and
                clinicians.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="text-purple-600" size={22} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Our Team</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                A multidisciplinary team of researchers and developers from the
                Fundação Universidade Federal de Rondônia (UNIR).
              </p>
            </div>
          </div>

          {/* About text */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About the Platform
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed mb-4">
                VANDA (Visualization and Analysis of Nutrigenetic Data) is a web
                platform developed at UNIR — Fundação Universidade Federal de
                Rondônia. It was created to facilitate the study and exploration
                of nutrigenetic data, connecting genetic variants (SNPs) to
                disease pathologies and nutritional interactions.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                The platform leverages data from leading biomedical databases,
                including NCBI&apos;s dbSNP and PubMed, as well as GeneCards, to
                provide a comprehensive and user-friendly interface for both
                researchers and healthcare professionals. By categorizing
                food-gene interactions as beneficial, harmful, or neutral, VANDA
                helps support the development of personalized dietary plans based
                on individual genetic profiles.
              </p>
              <p className="text-gray-600 leading-relaxed">
                This system was developed as part of academic research at DACC
                (Departamento Acadêmico de Ciências da Computação) with the goal
                of advancing the field of precision nutrition through
                bioinformatics.
              </p>
            </div>
          </div>

          {/* Team section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">The Team</h2>
            <p className="text-gray-500 mb-8">
              Meet the people behind VANDA.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center flex-shrink-0 shadow-sm`}
                  >
                    <span className="text-white font-bold text-lg">
                      {member.initials}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{member.name}</h3>
                    <p className="text-green-600 text-sm font-medium mb-1">
                      {member.role}
                    </p>
                    <p className="text-gray-500 text-sm">{member.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
