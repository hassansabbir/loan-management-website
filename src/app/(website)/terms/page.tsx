"use client";

import React, { useState, useEffect } from "react";
import Container from "@/components/ui/Container";
import Image from "next/image";
import settingsService from "@/lib/settingsService";
import { Loader2 } from "lucide-react";

export default function TermsPage() {
  const [apiContent, setApiContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const fetchTerms = async () => {
      setIsLoading(true);
      try {
        const text = await settingsService.getTermsOfService();
        if (isMounted) {
          setApiContent(text);
        }
      } catch (err) {
        console.warn("Could not fetch terms of service from API:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchTerms();

    return () => {
      isMounted = false;
    };
  }, []);

  const hasHtml = (str: string) => /<[a-z][\s\S]*>/i.test(str);

  return (
    <div className="min-h-screen bg-[#FAFBFD] pb-24 pt-6">
      <Container>
        {/* Top Banner with Image Background */}
        <div className="relative w-full h-[280px] sm:h-[320px] rounded-3xl overflow-hidden shadow-lg mb-10">
          <Image
            src="/terms_banner.png"
            alt="Terms of Services"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]" />

          {/* Centered Heading */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-md">
              Terms of Services
            </h1>
          </div>
        </div>

        {/* Dynamic API Content Only */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-[0_10px_35px_rgba(0,0,0,0.015)] text-slate-700 text-base sm:text-lg leading-relaxed">
          {isLoading ? (
            <div className="flex items-center justify-center gap-3 py-16 text-primary">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-sm font-semibold text-slate-500">
                Loading Terms of Services...
              </span>
            </div>
          ) : apiContent && hasHtml(apiContent) ? (
            <div
              className="prose prose-slate max-w-none text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: apiContent }}
            />
          ) : apiContent ? (
            <div className="whitespace-pre-line font-medium text-slate-700 leading-loose">
              {apiContent}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 text-sm font-medium">
              No terms of service content available at this time.
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
