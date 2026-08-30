import Nav from "@/components/Nav";
import Stage from "@/components/Stage";
import Relief from "@/components/Relief";
import Services from "@/components/Services";
import Calculator from "@/components/Calculator";
import Pricing from "@/components/Pricing";
import Expert from "@/components/Expert";
import Process from "@/components/Process";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main id="top">
        <Stage />
        <Relief />
        <Services />
        <Calculator />
        <Pricing />
        <Expert />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
