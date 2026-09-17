import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Logos from '../components/Logos';
import Features from '../components/Features';
import Services from '../components/Services';
import Reviews from '../components/Reviews';
import Experts from '../components/Experts';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Logos />
      <Features />
      <Services />
      <Reviews />
      <Experts />
      <Newsletter />
      <Footer />
    </main>
  );
}
