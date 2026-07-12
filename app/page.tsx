import { MotionShell } from "@/components/motion-shell";
import { Nav } from "@/components/nav";
import { Hero } from "@/sections/hero";
import { Features } from "@/sections/features";
import { About } from "@/sections/about";
import { Services } from "@/sections/services";
import { Testimonials } from "@/sections/testimonials";
import { Pricing } from "@/sections/pricing";
import { FAQ } from "@/sections/faq";
import { Footer } from "@/sections/footer";

export default function Home() {
  return (
    <>
      <MotionShell />
      <Nav />
      <main>
        <Hero />
        <Features />
        <About />
        <Services />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
