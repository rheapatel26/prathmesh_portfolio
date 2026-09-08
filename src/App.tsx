import './index.css';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import CaseStudies from './sections/CaseStudies';
import ColorBridge from './sections/ColorBridge';
import Labs from './sections/Labs';
import LifeLately from './sections/LifeLately';
import ClassifiedContact from './sections/ClassifiedContact';
import Footer from './sections/Footer';

export default function App() {
  return (
    <>
      {/* Subtle film grain noise overlay */}
      <div className="noise" aria-hidden="true" />

      {/* Custom cursor */}
      <Cursor />

      {/* Navigation */}
      <Navbar />

      {/* Page sections */}
      <main>
        <Hero />
        <About />
        <LifeLately />
        <CaseStudies />
        <ColorBridge />
        <Labs />
        <ClassifiedContact />
      </main>

      <Footer />
    </>
  );
}

