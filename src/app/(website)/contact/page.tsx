"use client";

import React, { useState } from "react";
import Container from "@/components/ui/Container";
import { Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate contact submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD] pb-24 pt-6">
      <Container>
        
        {/* Top Banner with Image Background */}
        <div className="relative w-full h-[280px] sm:h-[320px] rounded-3xl overflow-hidden shadow-lg mb-8">
          <Image
            src="/contact_banner.png"
            alt="Contact Us"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]" />
          
          {/* Centered Heading */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-md">
              Contact Us
            </h1>
          </div>
        </div>

        {/* Contact Content Card */}
        <div className="bg-white rounded-3xl border border-slate-100 p-4 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.015)] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* Left Column: Contact Info Sidebar */}
            <div 
              className="lg:col-span-2 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[480px] shadow-sm border border-slate-100/50"
              style={{ background: "linear-gradient(135deg, #E2EEFE 0%, #FBFCFE 35%, #FDFDFE 65%, #BCD7FF 100%)" }}
            >
              {/* Decorative shapes */}
              <div className="absolute bottom-[-60px] right-[-60px] w-64 h-64 bg-white/40 rounded-full border border-white/20 pointer-events-none select-none z-0" />
              <div className="absolute bottom-[20px] right-[-30px] w-40 h-40 bg-white/25 rounded-full border border-white/10 pointer-events-none select-none z-0" />
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-primary">
                  Contact Information
                </h2>
                <p className="text-sm text-slate-500 mt-2 font-medium">
                  Say something to start a live chat!
                </p>
                
                {/* Details List */}
                <div className="mt-14 space-y-7 text-sm font-semibold">
                  <a href="tel:+10123456789" className="flex items-center gap-4.5 text-slate-600 hover:text-primary transition-colors w-fit relative z-10">
                    <Phone className="w-5 h-5 shrink-0 text-slate-700" />
                    <span>+1012 3456 789</span>
                  </a>
                  <a href="mailto:demo@gmail.com" className="flex items-center gap-4.5 text-slate-600 hover:text-primary transition-colors w-fit relative z-10">
                    <Mail className="w-5 h-5 shrink-0 text-slate-700" />
                    <span>demo@gmail.com</span>
                  </a>
                  <div className="flex items-start gap-4.5 text-slate-600 leading-relaxed relative z-10">
                    <MapPin className="w-5 h-5 shrink-0 text-slate-700 mt-0.5" />
                    <span>
                      132 Dartmouth Street Boston,<br />
                      Massachusetts 02156 United States
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Socials */}
              <div className="relative z-10 flex items-center gap-4.5 mt-10">
                <a href="#" className="w-9 h-9 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center transition-colors">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center transition-colors">
                  <svg className="w-4.5 h-4.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center transition-colors">
                  {/* Custom Discord icon */}
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 127.14 96.36">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.18,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.95,54.65,1,77.53A105.79,105.79,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.88-.65,1.72-1.34,2.51-2a75.58,75.58,0,0,0,72.93,0c.79.71,1.63,1.4,2.51,2a68.21,68.21,0,0,1-10.5,5A77.7,77.7,0,0,0,112,85.51a105.79,105.79,0,0,0,31.06-18.83C148.49,54.65,142.17,31.58,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-3 p-4 sm:p-6 flex flex-col justify-between">
              <div className="space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  
                  {/* First Name */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="John"
                      required
                      className="border-b border-slate-200 focus:border-primary focus:outline-none py-2 bg-transparent text-sm w-full text-slate-800 placeholder-slate-300 font-semibold"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Doe"
                      required
                      className="border-b border-slate-200 focus:border-primary focus:outline-none py-2 bg-transparent text-sm w-full text-slate-800 placeholder-slate-300 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  
                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="johndoe@gmail.com"
                      required
                      className="border-b border-slate-200 focus:border-primary focus:outline-none py-2 bg-transparent text-sm w-full text-slate-800 placeholder-slate-300 font-semibold"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 012 3456 789"
                      required
                      className="border-b border-slate-200 focus:border-primary focus:outline-none py-2 bg-transparent text-sm w-full text-slate-800 placeholder-slate-300 font-semibold"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message..."
                    required
                    className="border-b border-slate-200 focus:border-primary focus:outline-none py-2 bg-transparent text-sm w-full text-slate-800 placeholder-slate-300 font-semibold resize-none"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-10 flex items-center justify-between">
                {/* Success Alert */}
                <div className="h-10 flex items-center">
                  {showSuccess && (
                    <div className="text-emerald-600 font-semibold text-sm flex items-center gap-1.5 animate-fadeIn">
                      <CheckCircle2 className="w-5 h-5" />
                      Message sent successfully!
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-[#003CB5] text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all shadow-md active:scale-97 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
