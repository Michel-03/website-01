import HeroSection from "../../OurServices_components/AiStrategy/Herosection";
import PartnerLogos from "../../OurServices_components/AiStrategy/Partnerlogos";
import ClientsVisionSection from "../../OurServices_components/AiStrategy/AI-client";
import AIStrategyDevelopment from "../../OurServices_components/AiStrategy/Ai-strategy";
import Deliverables from "../../OurServices_components/AiStrategy/Scoping";
import Flow from "../../OurServices_components/AiStrategy/Flowchart";
import Testimonials from "../../OurServices_components/AiStrategy/Testinomails";
import PartnerLogo from "../../OurServices_components/AiStrategy/partner";

export default function AiStrategy(){
    return(
        <>
        <HeroSection/>
        <PartnerLogos/>
        <ClientsVisionSection/>
        <AIStrategyDevelopment/>
        <Deliverables/>
        <Flow/>
        <Testimonials/>
        <PartnerLogo/>
        </>
    )
}