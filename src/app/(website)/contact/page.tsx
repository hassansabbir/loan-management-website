"use client";

import React from "react";
import Container from "@/components/ui/Container";
import ContactHero from "@/components/ui/website/contact/ContactHero";
import ContactFormSection from "@/components/ui/website/contact/ContactFormSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FAFBFD] pb-24 pt-6">
      <Container>
        {/* Header Banner */}
        <ContactHero />

        {/* Contact Form Section */}
        <ContactFormSection />
      </Container>
    </div>
  );
}
