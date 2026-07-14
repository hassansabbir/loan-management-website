"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { mainNavigation } from "@/constants/navigation";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/loan-logo.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-primary border-b border-white/10",
        isScrolled ? "py-2 shadow-lg" : "py-3"
      )}
    >
      <Container>
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group shrink-0">
            <Image
              src={logoImg}
              alt="Loan Logo"
              width={90}
              height={90}
              className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {mainNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative py-1.5 text-sm font-semibold transition-colors duration-250",
                    isActive ? "text-white" : "text-white/80 hover:text-white"
                  )}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavbarTab"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/login"
              className="text-sm font-semibold text-white/85 hover:text-white transition-colors duration-200"
            >
              Login
            </Link>
            <Link href="/apply">
              <button
                className="border border-white/70 hover:border-white text-white hover:bg-white hover:text-primary transition-all duration-300 text-sm font-semibold px-5 py-2.5 rounded-lg active:scale-97 cursor-pointer"
              >
                Apply Now
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden bg-primary border-b border-white/10 overflow-hidden"
          >
            <Container className="py-6 flex flex-col gap-4">
              {mainNavigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-base font-semibold transition-all p-3 rounded-lg",
                      isActive
                        ? "text-white bg-white/10"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-5 mt-2 border-t border-white/10 flex flex-col gap-4">
                <Link
                  href="/login"
                  className="text-center text-white/70 hover:text-white py-2 text-base font-semibold transition-colors"
                >
                  Login
                </Link>
                <Link href="/apply" className="w-full">
                  <button className="w-full border border-white/70 text-white hover:bg-white hover:text-primary py-3 rounded-lg text-center font-bold transition-all active:scale-97 cursor-pointer">
                    Apply Now
                  </button>
                </Link>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

