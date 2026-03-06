import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InfoSection from './components/InfoSection';
import ScheduleSection from './components/ScheduleSection';
import GallerySection from './components/GallerySection';
import SponsorSection from './components/SponsorSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <InfoSection />
      <ScheduleSection />
      <GallerySection />
      <SponsorSection />
      <Footer />
    </main>
  );
}
