"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Section from "@/components/ui/Section";
import { ArrowRight } from "lucide-react";

import topImg from "@/assets/banner/topImage.png";
import middleImg from "@/assets/banner/middleImage.png";
import bottomImg from "@/assets/banner/bottomImage.png";

// Partner Logos represented as clean, precise SVG paths
const HuaweiLogo = () => (
  <svg className="h-6 w-auto text-[#EA0A2A]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.5 6 6 9.5 6 12s2.5 4.5 6 4.5 6-2 6-4.5-2.5-6-6-10z" opacity="0.8" />
    <path d="M12 4C9.5 7.5 7.5 10.5 7.5 12.5s2 3.5 4.5 3.5 4.5-1.5 4.5-3.5-2-5-4.5-8.5z" opacity="0.9" />
    <path d="M12 6c-1.5 2.5-3 5-3 6.5s1.5 2.5 3 2.5 3-1 3-2.5S13.5 8.5 12 6z" />
    <path d="M5.5 12.5c0-1.8 1.4-4 3.5-6C7 8.5 6 10.5 6 12.5c0 2 1 4 3 6-2.1-2-3.5-4.2-3.5-6z" opacity="0.7" />
    <path d="M18.5 12.5c0-1.8-1.4-4-3.5-6 2 2.1 3 4.1 3 6.1 0 2-1 4-3 6 2.1-2 3.5-4.2 3.5-6.1z" opacity="0.7" />
  </svg>
);

const DellLogo = () => (
  <svg className="h-6 w-auto text-black" viewBox="0 0 100 100" fill="currentColor">
    <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 92C26.8 92 8 73.2 8 50S26.8 8 50 8s42 18.8 42 42-18.8 42-42 42z" />
    <path d="M28 35h8c5 0 8 3 8 7v16c0 4-3 7-8 7h-8V35zm4 26h4c2.5 0 4-1.5 4-4V42c0-2.5-1.5-4-4-4h-4v23z" />
    <path d="M48 35h12v4h-8v5h7v4h-7v6h8v4H48V35z" />
    <path d="M64 35h4v26h8v4h-12V35z" />
    <path d="M80 35h4v26h8v4H80V35z" />
  </svg>
);

const RedCircleLogo = () => (
  <svg className="h-6 w-auto text-[#EA0A2A]" viewBox="0 0 100 100" fill="currentColor">
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" />
    <circle cx="50" cy="50" r="18" fill="currentColor" />
  </svg>
);

const Banner = () => {
  return (
    <Section className="relative overflow-hidden pt-32 md:pt-40 pb-20 bg-white">
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-[10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-[10%] w-96 h-96 bg-blue-300/5 rounded-full blur-3xl -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column - Heading & Content */}
        <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold tracking-tight text-[#111827] leading-[1.12]">
              Scale your business on <br />
              your own terms.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-3 flex flex-col items-start leading-[0.92] tracking-wide"
          >
            <span 
              className="font-serif font-normal text-6xl sm:text-7xl lg:text-[5.5rem] text-primary uppercase tracking-[0.15em] drop-shadow-[0_4px_12px_rgba(0,71,207,0.15)]"
            >
              REPAY
            </span>
            <span 
              className="font-serif font-normal text-4xl sm:text-5xl lg:text-[4.5rem] text-primary italic lowercase pl-2 -my-2.5 drop-shadow-[0_4px_12px_rgba(0,71,207,0.12)]"
            >
              as
            </span>
            <span 
              className="font-serif font-normal text-6xl sm:text-7xl lg:text-[5.5rem] text-primary uppercase tracking-[0.05em] drop-shadow-[0_4px_12px_rgba(0,71,207,0.15)]"
            >
              YOU GROW
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="mt-5 text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed">
              Access up to £1M in revenue-based funding. No equity
              dilution, no personal guarantees. Repayments fluctuate
              automatically with your sales.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 mt-6"
          >
            <Link href="/apply">
              <button className="bg-primary text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/95 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 inline-flex items-center gap-2 active:scale-97 cursor-pointer text-base">
                Apply for Funding <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/how-it-works">
              <button className="border border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-300 bg-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 active:scale-98 cursor-pointer text-base">
                How It Works
              </button>
            </Link>
          </motion.div>

          {/* Social Proof Partners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex items-center gap-4 border-t border-gray-100 pt-6 w-full"
          >
            {/* Overlapping circular partner badges */}
            <div className="flex items-center shrink-0">
              {/* Huawei badge */}
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.06)] border-2 border-white z-10 relative overflow-hidden">
                <svg className="w-7 h-7 text-[#EA0A2A]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.5 6 6 9.5 6 12s2.5 4.5 6 4.5 6-2 6-4.5-2.5-6-6-10z" opacity="0.8" />
                  <path d="M12 4C9.5 7.5 7.5 10.5 7.5 12.5s2 3.5 4.5 3.5 4.5-1.5 4.5-3.5-2-5-4.5-8.5z" opacity="0.9" />
                  <path d="M12 6c-1.5 2.5-3 5-3 6.5s1.5 2.5 3 2.5 3-1 3-2.5S13.5 8.5 12 6z" />
                  <path d="M5.5 12.5c0-1.8 1.4-4 3.5-6C7 8.5 6 10.5 6 12.5c0 2 1 4 3 6-2.1-2-3.5-4.2-3.5-6z" opacity="0.7" />
                  <path d="M18.5 12.5c0-1.8-1.4-4-3.5-6 2 2.1 3 4.1 3 6.1 0 2-1 4-3 6 2.1-2 3.5-4.2 3.5-6.1z" opacity="0.7" />
                </svg>
              </div>

              {/* Beats/Red circle badge */}
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.06)] border-2 border-white z-20 -ml-3.5 relative overflow-hidden">
                <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="48" fill="#E41F26" />
                  <circle cx="53" cy="55" r="20" stroke="white" strokeWidth="10" />
                  <path d="M33 22 v33" stroke="white" strokeWidth="10" strokeLinecap="round" />
                </svg>
              </div>

              {/* Dell badge */}
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.06)] border-2 border-white z-30 -ml-3.5 relative overflow-hidden">
                <svg className="w-12 h-12 text-white" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="48" fill="black" />
                  <circle cx="50" cy="50" r="38" stroke="white" strokeWidth="4.5" />
                  <g fill="white">
                    <path d="M 22.5 36 h 6.5 c 5.5 0 8.5 3 8.5 8.5 v 11 c 0 5.5 -3 8.5 -8.5 8.5 H 22.5 V 36 z m 4.5 4.5 v 23 h 2 c 2.5 0 4 -1.5 4 -4 v -15 c 0 -2.5 -1.5 -4 -4 -4 h -2 z" />
                    <g transform="translate(38, 36) rotate(-32 6 14)">
                      <path d="M 0 0 h 11.5 v 4.5 h -7 v 5 h 6 v 4.5 h -6 v 5.5 h 7 v 4.5 H 0 V 0 z" />
                    </g>
                    <path d="M 52.5 36 h 4.5 v 23.5 h 7 v 4.5 H 52.5 V 36 z" />
                    <path d="M 66 36 h 4.5 v 23.5 h 7 v 4.5 H 66 V 36 z" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Label text */}
            <div className="text-[15px] text-gray-500 font-medium tracking-tight">
              <span className="font-bold text-gray-900 mr-1">2,500+</span>
              UK businesses funded this year
            </div>
          </motion.div>
        </div>

        {/* Right Column - Overlapping Images (Larger size to fill screen) */}
        <div className="lg:col-span-6 relative w-full aspect-4/3 max-w-[620px] mx-auto mt-10 lg:mt-0">
          {/* Radial glow behind the images */}
          <div className="absolute inset-0 bg-linear-to-tr from-blue-200/20 to-primary/10 rounded-full blur-[100px] -z-10" />

          {/* Middle Image - Base Layer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute left-[15%] top-[15%] w-[70%] h-[70%] z-10"
          >
            <Image
              src={middleImg}
              alt="Person working on laptop"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>

          {/* Top Image - Overlapping Top Left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -10, y: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute left-[0%] top-[0%] w-[36%] aspect-square z-20"
          >
            <Image
              src={topImg}
              alt="Plant growing from soil"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 50vw, 25vw"
              priority
            />
          </motion.div>

          {/* Bottom Image - Overlapping Bottom Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 10, y: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute right-[0%] bottom-[0%] w-[48%] aspect-[1.35/1] z-20"
          >
            <Image
              src={bottomImg}
              alt="Person standing at stairs"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 50vw, 30vw"
              priority
            />
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default Banner;
