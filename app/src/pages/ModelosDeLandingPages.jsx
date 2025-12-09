import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import Section from "../components/Section";

import LandingPageCard from "../components/LandingPageCard";

export default function ModelosDeLandingPages() {
  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-6xl mx-auto bg-white p-6 md:p-10 mt-6 md:mt-10 rounded-xl shadow">

        <PageHeader
          title="Landing Pages"
          subtitle="Compartilhe com seus clientes uma página exclusiva, personalizada com seus dados."
        />

        <Section>
          <LandingPageCard />
        </Section>

      </div>
    </div>
  );
}


