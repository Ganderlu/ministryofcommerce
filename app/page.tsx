import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import News from "@/components/home/News";

export default function Home() {
  return (
    <>
      <TopBar />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <News />
      <Footer />
    </>
  );
}
