import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <Navbar />
      </header>
      <main className="flex-grow overflow-auto">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
