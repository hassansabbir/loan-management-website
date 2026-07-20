"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  LayoutDashboard,
  Wallet,
  ArrowRightLeft,
  Landmark,
  Settings,
  LogOut,
} from "lucide-react";
import { mainNavigation } from "@/constants/navigation";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/loan-logo.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownMenu = [
    { label: "Profile", icon: User, href: "/dashboard" },
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Funding", icon: Wallet, href: "/dashboard" },
    { label: "Transactions", icon: ArrowRightLeft, href: "/dashboard" },
    { label: "Payouts", icon: Landmark, href: "/dashboard" },
    { label: "Settings", icon: Settings, href: "/dashboard" },
  ];

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
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Profile Dropdown */}
          <div className="hidden md:flex items-center gap-6" ref={profileRef}>
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 focus:outline-none cursor-pointer p-1 rounded-full hover:bg-white/5 transition-colors"
              >
                <div className="text-right hidden lg:block">
                  <p className="text-sm font-bold text-white leading-tight">
                    Fintech Ltd
                  </p>
                  <p className="text-xs text-white/70">Admin</p>
                </div>
                {/* Simulated Avatar */}
                <div className="w-10 h-10 rounded-full bg-blue-900 border-2 border-white/20 overflow-hidden flex items-center justify-center">
                  <User className="text-white/70 w-5 h-5" />
                </div>
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                  >
                    <div className="py-2">
                      {dropdownMenu.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={index}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary transition-colors"
                          >
                            <Icon className="w-4 h-4" />
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        );
                      })}
                      <div className="border-t border-gray-100 my-1" />
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
              {/* Mobile Profile Info */}
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-900 border border-white/20 overflow-hidden flex items-center justify-center">
                  <User className="text-white/70 w-5 h-5" />
                </div>
                <div>
                  <p className="text-base font-bold text-white leading-tight">
                    Fintech Ltd
                  </p>
                  <p className="text-sm text-white/70">Admin</p>
                </div>
              </div>

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
              <div className="pt-5 mt-2 border-t border-white/10 flex flex-col gap-2">
                {dropdownMenu.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center gap-3 p-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors font-semibold"
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
