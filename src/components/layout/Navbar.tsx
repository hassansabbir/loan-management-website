"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
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
  LogIn,
} from "lucide-react";
import { mainNavigation } from "@/constants/navigation";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { storage } from "@/lib";
import { useAuth } from "@/contexts/AuthContext";
import logoImg from "@/assets/loan-logo.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);
  const isClickNavigatingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { user, logout, isAuthenticated } = useAuth();
  const [activeHref, setActiveHref] = useState<string>(pathname);

  const handleLogout = () => {
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    logout();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Update active state and close menus on pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);

    const cleanPath = pathname.replace(/\/$/, "") || "/";

    if (cleanPath !== "/") {
      setActiveHref(cleanPath);
      return;
    }

    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        const matching = mainNavigation.find(
          (item) => item.href === `/${hash}` || item.href === hash
        );
        if (matching) {
          setActiveHref(matching.href);
          isClickNavigatingRef.current = true;
          setTimeout(() => {
            const el = document.querySelector(hash);
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
            setTimeout(() => {
              isClickNavigatingRef.current = false;
            }, 800);
          }, 100);
          return;
        }
      }
      if (window.scrollY < 200) {
        setActiveHref("/");
      }
    }
  }, [pathname]);

  // Listen to browser hashchange (back/forward or anchor jumps)
  useEffect(() => {
    const handleHashChange = () => {
      if (pathname === "/") {
        const hash = window.location.hash;
        if (hash) {
          const matching = mainNavigation.find(
            (item) => item.href === `/${hash}` || item.href === hash
          );
          if (matching) {
            setActiveHref(matching.href);
          }
        } else {
          setActiveHref("/");
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [pathname]);

  // Scroll spy on homepage using getBoundingClientRect relative to viewport
  useEffect(() => {
    if (pathname !== "/") return;

    const handleScrollSpy = () => {
      // While programmatic smooth scrolling from a click is in progress, don't overwrite the target
      if (isClickNavigatingRef.current) {
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          isClickNavigatingRef.current = false;
        }, 200);
        return;
      }

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 1. Top of page -> Home
      if (scrollY < 200) {
        setActiveHref("/");
        return;
      }

      // 2. Bottom of page -> Support
      if (windowHeight + scrollY >= documentHeight - 60) {
        setActiveHref("/#support");
        return;
      }

      // 3. Check section positions relative to viewport
      const sections = [
        { id: "support", href: "/#support" },
        { id: "faq", href: "/#faq" },
        { id: "how-it-works", href: "/#how-it-works" },
      ];

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active when the section top has scrolled near the header and its bottom is still visible
          if (rect.top <= 200 && rect.bottom > 80) {
            setActiveHref(section.href);
            return;
          }
        }
      }

      // 4. If scrolled past how-it-works but not yet reached FAQ (features, stats, repayment, eligibility)
      const howItWorksEl = document.getElementById("how-it-works");
      const faqEl = document.getElementById("faq");
      if (howItWorksEl && faqEl) {
        const howItWorksRect = howItWorksEl.getBoundingClientRect();
        const faqRect = faqEl.getBoundingClientRect();
        if (howItWorksRect.top <= 200 && faqRect.top > 200) {
          setActiveHref("/#how-it-works");
          return;
        }
      }

      setActiveHref("/");
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();

    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: { label: string; href: string }
  ) => {
    setIsMenuOpen(false);

    // Smooth scroll to section if clicking on a homepage section anchor while on homepage
    if (pathname === "/" && item.href.startsWith("/#")) {
      e.preventDefault();
      const targetId = item.href.replace("/#", "");
      const targetEl = document.getElementById(targetId);

      setActiveHref(item.href);
      isClickNavigatingRef.current = true;

      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", item.href);
      }

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isClickNavigatingRef.current = false;
      }, 1200);
      return;
    }

    // Scroll to top if clicking Home while already on homepage
    if (pathname === "/" && item.href === "/") {
      e.preventDefault();
      setActiveHref("/");
      isClickNavigatingRef.current = true;
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isClickNavigatingRef.current = false;
      }, 1200);
      return;
    }

    // Normal page transition
    setActiveHref(item.href);
  };

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
    { label: "Profile", icon: User, href: "/dashboard/settings" },
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Funding", icon: Wallet, href: "/dashboard/funding" },
    { label: "Transactions", icon: ArrowRightLeft, href: "/dashboard/transactions" },
    { label: "Payouts", icon: Landmark, href: "/dashboard/payouts" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
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
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                setActiveHref("/");
                isClickNavigatingRef.current = true;
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.history.pushState(null, "", "/");
                setTimeout(() => {
                  isClickNavigatingRef.current = false;
                }, 800);
              } else {
                setActiveHref("/");
              }
            }}
            className="flex items-center group shrink-0 cursor-pointer"
          >
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
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {mainNavigation.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={cn(
                    "relative py-1.5 text-sm font-semibold transition-colors duration-200 cursor-pointer",
                    isActive ? "text-white" : "text-white/80 hover:text-white"
                  )}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Side: Login Button if logged out, or Profile Dropdown if logged in */}
          <div className="hidden md:flex items-center gap-6" ref={profileRef}>
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 focus:outline-none cursor-pointer p-1 rounded-full hover:bg-white/5 transition-colors"
                >
                  <div className="text-right hidden lg:block">
                    <p className="text-sm font-bold text-white leading-tight">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-white/70">{user?.role || "USER"}</p>
                  </div>
                  {/* Avatar with initial or image */}
                  <div className="w-10 h-10 rounded-full bg-blue-900 border-2 border-white/20 overflow-hidden flex items-center justify-center font-bold text-white text-sm">
                    {user?.image ? (
                      <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                    ) : user?.name ? (
                      <span>{user.name.charAt(0).toUpperCase()}</span>
                    ) : (
                      <User className="text-white/70 w-5 h-5" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/70">
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {user?.email || "user@gmail.com"}
                        </p>
                        <span className="inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-primary border border-blue-100 uppercase tracking-wider">
                          {user?.role || "USER"}
                        </span>
                      </div>

                      <div className="py-2">
                        {dropdownMenu.map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={index}
                              href={item.href}
                              onClick={() => setIsProfileOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary transition-colors"
                            >
                              <Icon className="w-4 h-4" />
                              <span className="font-medium">{item.label}</span>
                            </Link>
                          );
                        })}
                        <div className="border-t border-gray-100 my-1" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="font-medium">Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/sign-in"
                className="bg-white hover:bg-blue-50 text-primary font-bold text-sm px-6 py-2.5 rounded-xl transition-all shadow-sm active:scale-97 cursor-pointer flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
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
              {/* Mobile Profile Info or Login Button */}
              {isAuthenticated ? (
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 mb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-900 border border-white/20 overflow-hidden flex items-center justify-center font-bold text-white text-sm">
                    {user?.image ? (
                      <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                    ) : user?.name ? (
                      <span>{user.name.charAt(0).toUpperCase()}</span>
                    ) : (
                      <User className="text-white/70 w-5 h-5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-bold text-white leading-tight truncate">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-white/70">{user?.role || "USER"}</p>
                    {user?.email && (
                      <p className="text-[11px] text-white/50 truncate max-w-[180px]">{user.email}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mb-2">
                  <Link
                    href="/sign-in"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full bg-white text-primary hover:bg-blue-50 font-bold text-base py-3 px-4 rounded-xl transition-all text-center flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                </div>
              )}

              {mainNavigation.map((item) => {
                const isActive = activeHref === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className={cn(
                      "text-base font-semibold transition-all p-3 rounded-lg cursor-pointer",
                      isActive
                        ? "text-white bg-white/10"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Show dashboard links only when authenticated */}
              {isAuthenticated && (
                <div className="pt-5 mt-2 border-t border-white/10 flex flex-col gap-2">
                  {dropdownMenu.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 p-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors font-semibold"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 text-red-300 hover:text-red-200 hover:bg-white/5 rounded-lg transition-colors font-semibold text-left w-full cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
