import HeroSection from "../components/Home/HeroSection";
import PartnerLogos from "../components/Home/PartnerLogos";
import ServicesSection from "../components/Home/Services";
import Ser from "../components/Home/ser";
import Inhouse from "../components/Home/Inhouse";
import Inhousedet from "../components/Home/inhousedet";
import Inhousecontact from "../components/Home/inhousecontact";
import Inhousedetone from "../components/Home/inhousedetone";
import Zero from "../components/Home/Zero";
import Aicomponent from "../components/Home/Aicomponents";
import OurServices from "../components/Home/OurServices";
import PartnerLogo from "../components/Home/partner";
import Testimonials from "../components/Home/Testinomials";
import Flow from "../components/Home/Flowchat";
import Package from "../components/Home/package";
import ContactForm from "../components/Home/Contact";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PartnerLogo />
      <ServicesSection />
      <Inhouse />
      <Inhousedet />
      <Inhousecontact />
      <Inhousedetone />
      <Zero />
      <Aicomponent />
      <OurServices />
      <PartnerLogos />
      <Testimonials />
      <Flow />
      <Package />
      <ContactForm />
    </>
  );
}