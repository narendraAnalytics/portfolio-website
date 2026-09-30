import BgLayers from '@/components/BgLayers';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Services from '@/components/Services';
import HowIWork from '@/components/HowIWork';
import Contact from '@/components/Contact';
import BusinessCard from '@/components/BusinessCard';
import Footer from '@/components/Footer';
import Intro from '@/components/Intro';
import ScrollEffects from '@/components/ScrollEffects';
import SmoothScroll from '@/components/SmoothScroll';
import Motion from '@/components/Motion';
import Cursor from '@/components/Cursor';
import Marquee from '@/components/Marquee';
import BigStatement from '@/components/BigStatement';

export default function Home() {
  return (
    <>
      <Intro />
      <BgLayers />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <HowIWork />
        <BigStatement />
        <Contact />
      </main>
      <BusinessCard />
      <Footer />
      <ScrollEffects />
      <SmoothScroll />
      <Motion />
      <Cursor />
    </>
  );
}
