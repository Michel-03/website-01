import OverviewPage from "../../components/about/Hero";
import HeroSection from "../../components/about/Herosection";
import PartnerLogos from "../../components/about/PartnerLogos";
import AboutUs from "../../components/about/Aboutus";
import ClientsVisionSection from "../../components/about/Client";
import OurBoard from "../../components/about/OurBoard";
import AiExperts from "../../components/about/AiExperts";
import OurCommunity from "../../components/about/OurCommunity";
import ContactSection from "../../components/about/Contact";

export default function AboutPage() {
  return (
    <>
        <HeroSection />
        <PartnerLogos />
        <AboutUs />
        <ClientsVisionSection />
        <OurBoard/>
        <AiExperts/>
        <OurCommunity/>
        <ContactSection/>
    </>
  );
}
