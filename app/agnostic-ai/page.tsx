import { Suspense } from "react";
import HeroSection from "../../OurServices_components/AgnosticAI/Herosection";
import AgnosticAICom from "../../OurServices_components/AgnosticAI/AgnosticAi";
import Benifits from "../../OurServices_components/AgnosticAI/Benifits";
import ServiceDetails from "../../OurServices_components/AgnosticAI/CustomerAnalytics";

export default function AgnosticAI(){
    return(
        <>
        <HeroSection/>
        <AgnosticAICom/>
        <Benifits/>
        <Suspense fallback={<div className="px-6 py-20 text-center text-sm text-gray-500">Loading services...</div>}>
            <ServiceDetails/>
        </Suspense>
        </>
    )
}