"use client";

import React from "react";
import Container from "@/components/ui/Container";
import AboutHero from "@/components/ui/website/about/AboutHero";
import WhoWeAre from "@/components/ui/website/about/WhoWeAre";
import WhyChooseUs from "@/components/ui/website/about/WhyChooseUs";
import CoreValues from "@/components/ui/website/about/CoreValues";
import Leadership from "@/components/ui/website/about/Leadership";
import CTA from "@/components/ui/website/home/cta/CTA";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#FAFBFD] pb-24 pt-6">
      <Container>
        {/* Top Banner Section */}
        <AboutHero />

        {/* Story Section */}
        <WhoWeAre />

        {/* Why Choose Us Advantages Grid */}
        <WhyChooseUs />

        {/* Our Core Values Grid */}
        <CoreValues />

        {/* Meet the Leadership profiles */}
        {/* <Leadership /> */}
      </Container>

      {/* Footer CTA Section */}
      <CTA />
    </div>
  );
}
