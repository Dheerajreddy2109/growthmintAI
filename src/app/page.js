import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BuildPlanner from '../components/BuildPlanner';
import Services from '../components/Services';
import Comparison from '../components/Comparison';
import Pricing from '../components/Pricing';
import Industries from '../components/Industries';
import Process from '../components/Process';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BuildPlanner />
        <Services />
        <Comparison />
        <Pricing />
        <Industries />
        <Process />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
