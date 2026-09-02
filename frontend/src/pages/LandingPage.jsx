import {
  ArrowRight,
  Building2,
  GraduationCap,
  Handshake,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFF5F5] text-[#4A4A4A]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-24">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#F7D6D0] px-4 py-2 text-xs font-semibold text-[#4A4A4A]">
              <MapPin size={14} />
              Dhule District
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-[#4A4A4A] sm:text-5xl lg:text-6xl">
              Turning local problems into{" "}
              <span className="text-[#E2B4BD]">
                collaborative solutions.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#4A4A4A]/65 sm:text-lg">
              Samanvay connects citizens, government, universities and
              industry to identify societal problems, find the right
              collaborators and turn ideas into measurable impact.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4A4A4A] px-6 py-3.5 font-semibold text-white transition hover:bg-[#4A4A4A]/90"
              >
                <span className="text-white">Join Samanvay</span>
                <ArrowRight size={18} className="text-white" />
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-xl border border-[#E2B4BD] bg-[#FFF5F5] px-6 py-3.5 font-semibold text-[#4A4A4A] transition hover:bg-[#F7D6D0]"
              >
                <span className="text-[#4A4A4A]">Explore Portal</span>
              </Link>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md rounded-[2rem] bg-[#E2B4BD] p-6 sm:p-8">
              <div className="rounded-3xl bg-[#FFF5F5] p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-[#4A4A4A]/50">
                      Samanvay Network
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      Dhule District
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E2B4BD]">
                    <MapPin size={21} />
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  {[
                    {
                      icon: Users,
                      title: "Citizens",
                      text: "Report local problems",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Government",
                      text: "Validate & route",
                    },
                    {
                      icon: GraduationCap,
                      title: "Universities",
                      text: "Build solutions",
                    },
                    {
                      icon: Building2,
                      title: "Industry",
                      text: "Collaborate & support",
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="flex items-center gap-4 rounded-2xl bg-white p-4"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7D6D0]">
                          <Icon size={19} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold">
                            {item.title}
                          </p>

                          <p className="text-xs text-[#4A4A4A]/55">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="border-y border-[#E2B4BD]/40 bg-white"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#4A4A4A]/45">
              How it works
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              From problem to impact.
            </h2>

            <p className="mt-4 leading-7 text-[#4A4A4A]/60">
              Samanvay creates a structured bridge between the people
              who experience problems and the people and institutions
              capable of solving them.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {[
              ["01", "Identify", "A local societal problem is reported."],
              ["02", "Analyze", "The problem is classified and prioritized."],
              ["03", "Collaborate", "Suitable institutions and partners are matched."],
              ["04", "Impact", "A project is executed and its progress is tracked."],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-2xl border border-[#E2B4BD]/40 bg-[#FFF5F5] p-6"
              >
                <p className="text-sm font-bold text-[#E2B4BD]">
                  {number}
                </p>

                <h3 className="mt-6 text-xl font-bold">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#4A4A4A]/60">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="rounded-3xl bg-[#E2B4BD] p-8 sm:p-12 lg:p-16">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#4A4A4A]/55">
                  Our mission
                </p>

                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                  One platform. Many stakeholders. Shared impact.
                </h2>
              </div>

              <div>
                <p className="leading-8 text-[#4A4A4A]/70">
                  Samanvay creates a common digital space where local
                  problems can move beyond reporting and become
                  structured projects involving government,
                  universities, students, faculty, industry and
                  citizens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E2B4BD]/40 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <p className="font-bold">Samanvay Portal</p>
            <p className="mt-1 text-xs text-[#4A4A4A]/50">
              Connecting problems with solutions.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#4A4A4A]/50">
            <Handshake size={15} />
            Team Samanvay
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;