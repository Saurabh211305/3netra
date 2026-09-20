import { Navbar } from "@/components/Navbar";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SecurityHealthCheck } from "@/components/sections/SecurityHealthCheck";
import { SecuritySystem } from "@/components/sections/SecuritySystem";
import { Solutions } from "@/components/sections/Solutions";
import { Industries } from "@/components/sections/Industries";
import { IntelligentSurveillance } from "@/components/sections/IntelligentSurveillance";
import { Process } from "@/components/sections/Process";
import { SecurityHealthDashboard } from "@/components/sections/SecurityHealthDashboard";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pb-16 lg:pb-0">
        <Hero />
        <ProblemSection />
        <SecurityHealthCheck />
        <SecuritySystem />
        <Solutions />
        <Industries />
        <IntelligentSurveillance />
        <Process />
        <SecurityHealthDashboard />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
