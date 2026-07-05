import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { VibeJams } from "@/components/site/vibe-jams";
import { Feedback } from "@/components/site/feedback";
import { About } from "@/components/site/about";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <VibeJams />
        <Feedback />
        <About />
      </main>
      <Footer />
    </>
  );
}
