import Banner from "./home/banner/Banner";
import Partners from "./home/partners/Partners";
import HowItWorks from "./home/how-it-works/HowItWorks";
import Features from "./home/features/Features";
import Stats from "./home/stats/Stats";
import Repayment from "./home/repayment/Repayment";
import Eligibility from "./home/eligibility/Eligibility";
import Faq from "./home/faq/Faq";
import CTA from "./home/cta/CTA";

const WebsiteMainPage = () => {
  return (
    <div className="flex flex-col">
      <Banner />
      <Partners />
      <HowItWorks />
      <Features />
      {/* <Stats /> */}
      <Repayment />
      <Eligibility />
      <Faq />
      <CTA />
    </div>
  );
};

export default WebsiteMainPage;

