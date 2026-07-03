import { lazy, Suspense } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import AcademicRecord from './components/AcademicRecord';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Leadership from './components/Leadership';
import BeyondTheDesk from './components/BeyondTheDesk';
import Skills from './components/Skills';
import Education from './components/Education';
import Footer from './components/Footer';
import CustomCursor from './components/ui/CustomCursor';

// Recharts pulls in a sizeable chunk, only needed once the reader scrolls
// this far, so it's split out of the main bundle.
const FlagshipProject = lazy(() => import('./components/FlagshipProject'));

function App() {
  return (
    <>
      <CustomCursor />
      <Nav />
      <main className="bg-ink-950">
        <Hero />
        <About />
        <AcademicRecord />
        <Suspense fallback={<div className="min-h-screen bg-ink-950" />}>
          <FlagshipProject />
        </Suspense>
        <Projects />
        <Experience />
        <Leadership />
        <BeyondTheDesk />
        <Skills />
        <Education />
      </main>
      <Footer />
    </>
  );
}

export default App;
